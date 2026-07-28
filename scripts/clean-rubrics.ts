#!/usr/bin/env npx tsx
/**
 * Move rubrics out of `text` and into `instructionHe`.
 *
 * The xlsx import left halachic instructions, a Sefaria breadcrumb and two
 * orphaned Yigdal glosses inside prayer bodies. The UI renders `text` as one
 * undifferentiated Hebrew block, so all of it displayed as if it were liturgy.
 *
 * The rule: a line of Hebrew with no nikkud at all is a rubric. That single
 * test catches every case the audit found.
 *
 * Usage:
 *   npx tsx scripts/clean-rubrics.ts --dry-run
 *   npx tsx scripts/clean-rubrics.ts
 */

import * as fs from "fs";
import * as path from "path";
import { parseDocument, isMap, isSeq, type Document } from "yaml";
import { hasNikkud, normalizeHebrew } from "./lib/hebrewText";

const ROOT = path.resolve(__dirname, "..");
const PRAYERS_DIR = path.join(ROOT, "content", "prayers");
const DRY_RUN = process.argv.includes("--dry-run");

function main() {
  let cleaned = 0;

  for (const file of fs.readdirSync(PRAYERS_DIR).filter((f) => f.endsWith(".yaml"))) {
    const full = path.join(PRAYERS_DIR, file);
    const doc: Document = parseDocument(fs.readFileSync(full, "utf8"));
    const sections = doc.get("sections");
    if (!isSeq(sections)) continue;

    let touched = false;

    for (const item of sections.items) {
      if (!isMap(item)) continue;

      const text = item.get("text");
      if (typeof text !== "string" || !text.trim()) continue;

      const liturgy: string[] = [];
      const rubrics: string[] = [];
      for (const line of text.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        (hasNikkud(trimmed) ? liturgy : rubrics).push(trimmed);
      }

      if (!rubrics.length) continue;
      // Never strip a section down to nothing — if it is ALL unvocalized, it is
      // more likely mis-tagged content than a pile of rubrics, so leave it be.
      if (!liturgy.length) {
        console.log(`  ${item.get("id")}: SKIPPED (entirely unvocalized)`);
        continue;
      }

      const existing = item.get("instructionHe");
      const merged = normalizeHebrew(
        [typeof existing === "string" ? existing : "", ...rubrics]
          .filter(Boolean)
          .join("\n")
      );

      console.log(
        `  ${String(item.get("id")).padEnd(38)} moved ${rubrics.length} rubric line(s)`
      );
      for (const r of rubrics) console.log(`      ${r.slice(0, 66)}`);
      cleaned++;

      if (!DRY_RUN) {
        item.set("text", normalizeHebrew(liturgy.join("\n")));
        item.set("instructionHe", merged);
        touched = true;
      }
    }

    if (touched && !DRY_RUN) {
      fs.writeFileSync(full, doc.toString({ lineWidth: 0 }), "utf8");
      console.log(`  → wrote ${file}`);
    }
  }

  console.log(`\n${DRY_RUN ? "[dry run] " : ""}cleaned ${cleaned} sections`);
}

main();
