#!/usr/bin/env npx tsx
/**
 * Backfill prayer text from Sefaria, by `sourceRef`.
 *
 * The original importer crawled the Siddur Ashkenaz tree; this fetches only the
 * refs already recorded in content/prayers/*.yaml, so the section taxonomy stays
 * as-is and nothing is invented.
 *
 * Usage:
 *   npx tsx scripts/fetch-sefaria-refs.ts --dry-run    # report only, write nothing
 *   npx tsx scripts/fetch-sefaria-refs.ts              # fetch and write
 *   npx tsx scripts/fetch-sefaria-refs.ts --only shacharis
 *
 * Only sections with `status: needs-text` AND a `sourceRef` are touched.
 * Sections that already have text are never overwritten.
 */

import * as fs from "fs";
import * as path from "path";
import { parseDocument, isMap, isSeq, type Document } from "yaml";
import { splitSefariaHtml } from "./lib/hebrewText";
import { fetchLeafRefs, resolveRef, type LeafNode } from "./lib/sefariaIndex";

const ROOT = path.resolve(__dirname, "..");
const PRAYERS_DIR = path.join(ROOT, "content", "prayers");
const API = "https://www.sefaria.org/api/v3/texts";

const DRY_RUN = process.argv.includes("--dry-run");
const ONLY = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 ? process.argv[i + 1] : null;
})();

/** Sefaria refs use underscores for spaces; commas keep their following underscore. */
function encodeRef(ref: string): string {
  return encodeURIComponent(ref.replace(/, /g, ",_").replace(/ /g, "_"));
}

interface FetchResult {
  ok: boolean;
  text?: string;
  instructionHe?: string;
  error?: string;
}

async function fetchRef(ref: string): Promise<FetchResult> {
  try {
    const res = await fetch(`${API}/${encodeRef(ref)}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };

    const data: unknown = await res.json();
    const body = data as {
      error?: string;
      versions?: { text?: unknown; language?: string }[];
    };
    if (body.error) return { ok: false, error: body.error.slice(0, 90) };

    const version = body.versions?.[0];
    if (!version) return { ok: false, error: "no versions returned" };

    const raw = flatten(version.text);
    if (!raw.trim()) return { ok: false, error: "empty text" };

    const { text, instructionHe } = splitSefariaHtml(raw);
    if (!text.trim()) return { ok: false, error: "no vocalized text found" };

    return { ok: true, text, instructionHe };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch failed" };
  }
}

/** Sefaria returns either a string or an arbitrarily nested array of strings. */
function flatten(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flatten).filter(Boolean).join("\n");
  return "";
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Books referenced by the stored refs, loaded once and reused. */
const leafCache = new Map<string, LeafNode[]>();

async function leavesForRef(ref: string): Promise<LeafNode[]> {
  const book = ref.split(",")[0].trim();
  if (!leafCache.has(book)) {
    try {
      const leaves = await fetchLeafRefs(book);
      console.log(`  [index] ${book}: ${leaves.length} leaf refs`);
      leafCache.set(book, leaves);
    } catch {
      leafCache.set(book, []);
    }
  }
  return leafCache.get(book) ?? [];
}

async function main() {
  const files = fs
    .readdirSync(PRAYERS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .filter((f) => !ONLY || f.startsWith(ONLY));

  let attempted = 0;
  let filled = 0;
  let remapped = 0;
  const failures: { id: string; ref: string; error: string }[] = [];
  const suspicious: { id: string; ref: string; reason: string }[] = [];
  const duplicates: { id: string; sameAs: string }[] = [];

  /**
   * Sefaria's node granularity is sometimes coarser than our sections. Both
   * "Shir Hama'alot" and "Birkat HaMazon" resolve to nodes that return the
   * ENTIRE 11k-character bentching, which would render the whole thing under a
   * section titled "Hazan". Anything that looks like a whole service is sent to
   * manual mapping instead of being written.
   */
  const LIKELY_WHOLE_SERVICE = 4000;
  const seenText = new Map<string, string>(); // hash → first section id

  for (const file of files) {
    const full = path.join(PRAYERS_DIR, file);
    const doc: Document = parseDocument(fs.readFileSync(full, "utf8"));
    const sections = doc.get("sections");
    if (!isSeq(sections)) continue;

    let touched = false;

    for (const item of sections.items) {
      if (!isMap(item)) continue;

      const id = String(item.get("id") ?? "");
      const status = item.get("status");
      const ref = item.get("sourceRef");
      const existing = item.get("text");

      if (status !== "needs-text") continue;
      if (typeof existing === "string" && existing.trim()) continue;
      if (typeof ref !== "string" || !ref.trim()) continue;

      attempted++;
      process.stdout.write(`  ${id} … `);

      // Most stored refs are one level too shallow for the v3 API, so resolve
      // against the real node tree before fetching.
      let effectiveRef = ref;
      let note = "";
      let result = await fetchRef(ref);

      if (!result.ok) {
        const leaves = await leavesForRef(ref);
        const resolved = leaves.length ? resolveRef(ref, leaves) : null;
        if (resolved && !resolved.exact) {
          effectiveRef = resolved.ref;
          note = ` [remapped ${resolved.confidence}%]`;
          result = await fetchRef(effectiveRef);
          if (result.ok) remapped++;
        }
      }

      if (!result.ok) {
        console.log(`FAILED (${result.error})`);
        failures.push({ id, ref, error: result.error ?? "unknown" });
        await sleep(300);
        continue;
      }

      const fetched = result.text!;
      const fingerprint = fetched.slice(0, 200);

      if (fetched.length > LIKELY_WHOLE_SERVICE) {
        console.log(`SKIPPED (${fetched.length} chars — looks like a whole service)`);
        suspicious.push({
          id,
          ref: effectiveRef,
          reason: `${fetched.length} chars; Sefaria node is coarser than this section`,
        });
        await sleep(300);
        continue;
      }

      // Duplicates are NOT blocked: Kaddish, Ashrei and Aleinu legitimately
      // recur across a service. They are only reported, so a human can confirm
      // the repeat is real rather than a mis-resolved ref.
      const duplicateOf = seenText.get(fingerprint);
      if (duplicateOf) {
        duplicates.push({ id, sameAs: duplicateOf });
      } else {
        seenText.set(fingerprint, id);
      }

      console.log(
        `ok (${fetched.length} chars)${note}${duplicateOf ? ` [same text as ${duplicateOf}]` : ""}`
      );
      filled++;

      if (!DRY_RUN) {
        item.set("text", fetched);
        if (result.instructionHe) item.set("instructionHe", result.instructionHe);
        // Record the ref that actually resolved, so re-runs are cheap and the
        // provenance is accurate.
        if (effectiveRef !== ref) item.set("sourceRef", effectiveRef);
        item.delete("status");
        touched = true;
      }
      // Be a good citizen; Sefaria publishes no documented rate limit.
      await sleep(300);
    }

    if (touched && !DRY_RUN) {
      fs.writeFileSync(full, doc.toString({ lineWidth: 0 }), "utf8");
      console.log(`  → wrote ${file}`);
    }
  }

  console.log(
    `\n${DRY_RUN ? "[dry run] " : ""}attempted ${attempted}, filled ${filled} (${remapped} via index remap), failed ${failures.length}`
  );

  if (duplicates.length) {
    console.log(
      `\nRepeated text (${duplicates.length}) — expected for Kaddish/Ashrei/Aleinu, worth a glance:`
    );
    for (const d of duplicates) console.log(`  ${d.id} = ${d.sameAs}`);
  }

  if (suspicious.length) {
    console.log(
      `\nSkipped as implausible (${suspicious.length}) — map these from the archive instead:`
    );
    for (const s of suspicious) console.log(`  ${s.id}\n    ${s.reason}`);
  }

  if (failures.length) {
    console.log(`\nUnresolvable (${failures.length}) — need manual mapping:`);
    for (const f of failures) console.log(`  ${f.id}\n    ${f.ref}\n    ${f.error}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
