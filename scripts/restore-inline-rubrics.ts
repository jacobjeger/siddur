#!/usr/bin/env npx tsx
/**
 * One-off data repair: put conditional rubrics back INLINE.
 *
 * The Sefaria/archive importer used to hoist every unvocalized line out of
 * `text` and into `instructionHe`. Where a rubric is a heading that is
 * harmless; where it is a cue label selecting between mutually exclusive
 * alternatives it is destructive. Birkas HaShanim shipped as
 *
 *     …וְתֵן בְּרָכָה טַל וּמָטָר לִבְרָכָה עַל פְּנֵי הָאֲדָמָה…
 *
 * — the summer and the winter formula run together mid-sentence, with the
 * "בימות החמה:" / "בימות הגשמים:" cues stripped into a separate field. Same
 * shape in Gevuros, Retzei, Modim, Kedusha and Shir Shel Yom.
 *
 * `splitSefariaHtml` no longer hoists (it lifts only a leading rubric run), so
 * this script re-derives the affected sections from the pre-xlsx archive, which
 * still has the original interleaving.
 */
import * as fs from "fs";
import * as path from "path";
import { parseDocument, parse, type Document } from "yaml";
import { normalizeHebrew, hasNikkud } from "./lib/hebrewText";

const DAMAGED = new Set([
  "bedtime-shema-misc-kaddish-chatzi",
  "bedtime-shema-misc-kaddish-yasom",
  "maariv-barchu-maariv",
  "shacharis-birchos-krias-shema-section",
  "shacharis-barchu",
  "shacharis-barchu-end",
  "shacharis-amidah-02-gevuros",
  "shacharis-amidah-kedusha",
  "shacharis-amidah-09-shanim",
  "shacharis-amidah-17-avoda",
  "shacharis-amidah-18-hodaa",
  "shacharis-chatzi-kaddish-2",
  "shacharis-chatzi-kaddish-3",
  "shacharis-vetigaleh-vetiraeh",
  "shacharis-shir-shel-yom",
]);

/** Consonants only — nikkud and punctuation differ between corpora. */
const skeleton = (s: string) => s.replace(/[^א-ת]/g, "");

interface ArchiveSection {
  id: string;
  text: string;
  skel: string;
}

function indexArchive(dir: string): ArchiveSection[] {
  const out: ArchiveSection[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".yaml")) {
        const doc = parse(fs.readFileSync(full, "utf-8"));
        for (const sec of doc?.sections ?? []) {
          if (typeof sec?.text === "string" && sec.text.trim()) {
            out.push({ id: sec.id, text: sec.text, skel: skeleton(sec.text) });
          }
        }
      }
    }
  };
  walk(dir);
  return out;
}

/** The vocalized lines only — what hoisting left behind in `text`. */
function liturgyOnly(text: string): string {
  return text
    .split("\n")
    .filter((line) => hasNikkud(line))
    .join("\n");
}

/** Split archive text the way the fixed importer would: lift only a leading rubric run. */
function resplit(text: string): { text: string; instructionHe: string } {
  const lines = normalizeHebrew(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  let lead = 0;
  while (lead < lines.length && !hasNikkud(lines[lead])) lead++;
  return {
    text: lines.slice(lead).join("\n"),
    instructionHe: lines.slice(0, lead).join("\n"),
  };
}

const archive = indexArchive("archive/2026-05-14-pre-xlsx/prayers");
console.log(`indexed ${archive.length} archive sections`);

let repaired = 0;
for (const file of fs.readdirSync("content/prayers")) {
  const filePath = path.join("content/prayers", file);
  const doc: Document = parseDocument(fs.readFileSync(filePath, "utf-8"));
  const sections = doc.get("sections") as any;
  if (!sections?.items) continue;

  let touched = false;
  sections.items.forEach((node: any, index: number) => {
    const id = node.get("id");
    if (!DAMAGED.has(id)) return;

    const current = skeleton(String(node.get("text") ?? ""));
    if (!current) {
      console.log(`  SKIP  ${id} — no text to match on`);
      return;
    }

    // Hoisting deleted words from the MIDDLE of the text, so our skeleton is
    // not a substring of the archive's. Anchor on the opening instead.
    const anchor = current.slice(0, 30);
    const candidates = archive.filter((a) => a.skel.includes(anchor));

    // Accept a candidate ONLY if dropping its rubric lines reproduces our text
    // exactly. Without this gate the matcher happily returns a section the
    // archive split mid-bracha — `se-retzei` is 105 consonants against our 502
    // — and "restoring" from it would silently truncate the liturgy.
    const exact = candidates
      .map((a) => ({ a, split: resplit(a.text) }))
      // Compare LITURGY only: `resplit` deliberately keeps rubrics inline, so
      // its output still carries the very words hoisting removed from ours.
      .find(({ split }) => skeleton(liturgyOnly(split.text)) === current);

    if (!exact) {
      const near = candidates
        .map((a) => `${a.id}(${a.skel.length})`)
        .join(", ");
      console.log(
        `  MISS  ${id} (${current.length}) — no exact archive counterpart${near ? `; rejected: ${near}` : ""}`
      );
      return;
    }

    const { a: source, split } = exact;
    const inline = split.text.split("\n").filter((l) => !hasNikkud(l)).length;
    if (inline === 0) {
      console.log(`  ----  ${id} — archive has no inline rubric, leaving as is`);
      return;
    }

    node.set("text", split.text);
    if (split.instructionHe) node.set("instructionHe", split.instructionHe);
    else if (node.has("instructionHe")) node.delete("instructionHe");

    console.log(`  FIXED ${id} <- ${source.id} (${inline} inline rubric line(s))`);
    touched = true;
    repaired++;
  });

  if (touched) fs.writeFileSync(filePath, doc.toString({ lineWidth: 0 }), "utf-8");
}

console.log(`\nrepaired ${repaired}/${DAMAGED.size} sections`);
