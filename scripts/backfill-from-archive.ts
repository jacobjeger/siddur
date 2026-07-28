#!/usr/bin/env npx tsx
/**
 * Backfill remaining `needs-text` sections from the pre-xlsx archive.
 *
 * The archive (archive/2026-05-14-pre-xlsx) is a byte-for-byte faithful copy of
 * the original corpus — 385 sections, all with text — but it is DIRTY: Unicode
 * presentation forms, bidi controls inside words, four spellings of the Divine
 * Name, and halachic rubrics sitting inside `text`. Everything copied here is
 * normalized and rubric-split on the way in.
 *
 * The xlsx rebuilt the taxonomy, so only ~23 of 174 ids match verbatim. Sections
 * are matched on Hebrew title (the strongest signal), falling back to English
 * title, with the tefila name as context.
 *
 * Usage:
 *   npx tsx scripts/backfill-from-archive.ts --dry-run
 *   npx tsx scripts/backfill-from-archive.ts
 *   npx tsx scripts/backfill-from-archive.ts --min 80   # raise match threshold
 */

import * as fs from "fs";
import * as path from "path";
import { parse, parseDocument, isMap, isSeq, type Document } from "yaml";
import { splitSefariaHtml } from "./lib/hebrewText";

const ROOT = path.resolve(__dirname, "..");
const PRAYERS_DIR = path.join(ROOT, "content", "prayers");
const ARCHIVE_DIR = path.join(ROOT, "archive", "2026-05-14-pre-xlsx", "prayers");

const DRY_RUN = process.argv.includes("--dry-run");
const MIN_SCORE = (() => {
  const i = process.argv.indexOf("--min");
  return i >= 0 ? Number(process.argv[i + 1]) : 70;
})();

interface ArchiveSection {
  id: string;
  title: string;
  titleHe: string;
  instruction?: string;
  text: string;
  file: string;
}

/** Strip nikkud/te'amim so Hebrew titles compare on consonants alone. */
function bareHebrew(value: string): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[֑-ׇ]/g, "")
    .replace(/[^א-ת ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bareLatin(value: string): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function loadArchive(): ArchiveSection[] {
  const out: ArchiveSection[] = [];
  // Segment splits like `se-refaeinu-1` are continuations of the previous
  // section — the reason the archive breaks Refaeinu mid-bracha. Merge them
  // back into their parent rather than importing a broken blessing.
  const byId = new Map<string, ArchiveSection>();

  for (const sub of fs.readdirSync(ARCHIVE_DIR)) {
    const dir = path.join(ARCHIVE_DIR, sub);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".yaml"))) {
      const doc = parse(fs.readFileSync(path.join(dir, file), "utf8")) as {
        sections?: ArchiveSection[];
      };
      for (const section of doc.sections ?? []) {
        if (!section?.id) continue;

        const continuation = /^(.*)-(\d+)$/.exec(section.id);
        if (continuation) {
          const parent = byId.get(continuation[1]);
          if (parent) {
            parent.text = `${parent.text}\n${section.text ?? ""}`.trim();
            if (section.instruction) {
              parent.instruction = [parent.instruction, section.instruction]
                .filter(Boolean)
                .join("\n");
            }
            continue;
          }
        }

        const entry: ArchiveSection = { ...section, file };
        byId.set(section.id, entry);
        out.push(entry);
      }
    }
  }
  return out;
}

function score(
  target: { title?: string; titleHe?: string },
  candidate: ArchiveSection
): number {
  const he = bareHebrew(target.titleHe ?? "");
  const candHe = bareHebrew(candidate.titleHe);
  const en = bareLatin(target.title ?? "");
  const candEn = bareLatin(candidate.title);

  let best = 0;

  if (he && candHe) {
    if (he === candHe) best = Math.max(best, 100);
    else if (candHe.includes(he) || he.includes(candHe)) best = Math.max(best, 82);
    else {
      const a = new Set(he.split(" "));
      const b = new Set(candHe.split(" "));
      const shared = [...a].filter((w) => b.has(w)).length;
      if (shared) best = Math.max(best, (shared / Math.max(a.size, b.size)) * 78);
    }
  }

  if (en && candEn) {
    if (en === candEn) best = Math.max(best, 96);
    else if (candEn.includes(en) || en.includes(candEn)) best = Math.max(best, 76);
    else {
      const a = new Set(en.split(" "));
      const b = new Set(candEn.split(" "));
      const shared = [...a].filter((w) => b.has(w)).length;
      if (shared) best = Math.max(best, (shared / Math.max(a.size, b.size)) * 70);
    }
  }

  return best;
}

function main() {
  const archive = loadArchive();
  console.log(`Loaded ${archive.length} archive sections (continuations merged)\n`);

  let attempted = 0;
  let filled = 0;
  const unmatched: { id: string; title: string }[] = [];
  const crossMatches: { id: string; from: string; file: string }[] = [];

  for (const file of fs.readdirSync(PRAYERS_DIR).filter((f) => f.endsWith(".yaml"))) {
    const full = path.join(PRAYERS_DIR, file);
    const doc: Document = parseDocument(fs.readFileSync(full, "utf8"));
    const sections = doc.get("sections");
    if (!isSeq(sections)) continue;

    // Prefer archive sections from a file whose name shares a stem with this
    // tefila, so "Ashrei" in mincha.yaml doesn't grab the Shacharis copy.
    const stem = file.replace(/\.yaml$/, "").split("-")[0];
    let touched = false;

    for (const item of sections.items) {
      if (!isMap(item)) continue;
      if (item.get("status") !== "needs-text") continue;

      const id = String(item.get("id") ?? "");
      const title = String(item.get("title") ?? "");
      const titleHe = String(item.get("titleHe") ?? "");
      attempted++;

      let best: ArchiveSection | null = null;
      let bestScore = 0;
      for (const candidate of archive) {
        if (!candidate.text?.trim()) continue;
        let s = score({ title, titleHe }, candidate);
        // Same-tefila bonus, capped so it can never manufacture a
        // stronger-than-exact match.
        if (s && candidate.file.startsWith(stem)) s = Math.min(100, s + 10);
        if (s > bestScore) {
          bestScore = s;
          best = candidate;
        }
      }

      if (!best || bestScore < MIN_SCORE) {
        unmatched.push({ id, title: titleHe || title });
        continue;
      }

      // The archive keeps rubrics inside `text`; split them out on the way in.
      const merged = [best.instruction, best.text].filter(Boolean).join("\n");
      const { text, instructionHe } = splitSefariaHtml(merged);
      if (!text.trim()) {
        unmatched.push({ id, title: titleHe || title });
        continue;
      }

      // A match sourced from a different tefila is where a wrong prayer would
      // creep in — e.g. bedtime Shema pulling Maariv's Shema. Same title, and
      // often the right text, but it must be eyeballed rather than trusted.
      const crossTefila = !best.file.startsWith(stem);
      if (crossTefila) crossMatches.push({ id, from: best.id, file: best.file });

      console.log(
        `  ${id.padEnd(38)} ← ${best.id.padEnd(38)} ${Math.round(bestScore)}%  ${text.length}c${crossTefila ? "  [cross-tefila]" : ""}`
      );
      filled++;

      if (!DRY_RUN) {
        item.set("text", text);
        if (instructionHe) item.set("instructionHe", instructionHe);
        item.set("sourceRef", `archive:${best.file}#${best.id}`);
        item.delete("status");
        touched = true;
      }
    }

    if (touched && !DRY_RUN) {
      fs.writeFileSync(full, doc.toString({ lineWidth: 0 }), "utf8");
      console.log(`  → wrote ${file}\n`);
    }
  }

  console.log(
    `\n${DRY_RUN ? "[dry run] " : ""}attempted ${attempted}, matched ${filled}, unmatched ${unmatched.length} (threshold ${MIN_SCORE}%)`
  );
  if (crossMatches.length) {
    console.log(
      `\nMatched from a DIFFERENT tefila (${crossMatches.length}) — verify the text really belongs here:`
    );
    for (const c of crossMatches) console.log(`  ${c.id}  ←  ${c.file}#${c.from}`);
  }

  if (unmatched.length) {
    console.log("\nNo confident archive match — these need a human:");
    for (const u of unmatched) console.log(`  ${u.id}  (${u.title})`);
  }
}

main();
