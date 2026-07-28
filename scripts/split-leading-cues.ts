#!/usr/bin/env npx tsx
/**
 * Put a line-leading cue on its own line so it renders as a rubric.
 *
 * `toBlocks` classifies a whole LINE as rubric or liturgy by whether it carries
 * nikkud. A line like "הכהנים: בָּרוּךְ אַתָּה ה׳ ..." therefore counts as liturgy,
 * and the cue is printed in the same face and size as the bracha itself. The
 * position was never lost here, only the distinction — so this is purely a
 * split, and it is gated on the Hebrew being unchanged.
 */
import * as fs from "fs";
import * as path from "path";
import { parseDocument, type Document } from "yaml";

const NIKKUD = /[ְ-ׇּֿׁׂ]/;
/** An unvocalized run of <=35 chars ending in a colon, followed by vocalized text. */
const LEADING_CUE = /^([^:]{1,35}:)\s+(\S.*)$/;

const bag = (s: string) => s.replace(/[^א-ת]/g, "").split("").sort().join("");

let changed = 0;
for (const file of fs.readdirSync("content/prayers")) {
  const filePath = path.join("content/prayers", file);
  const doc: Document = parseDocument(fs.readFileSync(filePath, "utf-8"));
  const sections = (doc.get("sections") as any)?.items ?? [];
  let touched = false;

  for (const node of sections) {
    const text = String(node.get("text") ?? "");
    if (!text.trim()) continue;

    const out: string[] = [];
    let splits = 0;

    for (const line of text.split("\n")) {
      const match = line.trim().match(LEADING_CUE);
      // Split only when the prefix is a genuine rubric (no nikkud) and what
      // follows is genuine liturgy (has nikkud) — otherwise a vocalized phrase
      // ending in sof pasuk would be torn in half.
      if (match && !NIKKUD.test(match[1]) && /[א-ת]/.test(match[1]) && NIKKUD.test(match[2])) {
        out.push(match[1], match[2]);
        splits++;
      } else {
        out.push(line.trim());
      }
    }

    if (!splits) continue;
    const next = out.join("\n");
    if (bag(next) !== bag(text)) {
      console.log(`  SKIP  ${node.get("id")} — split altered the Hebrew`);
      continue;
    }
    node.set("text", next);
    console.log(`  ${String(splits).padStart(2)} cue(s) split  ${node.get("id")}`);
    touched = true;
    changed += splits;
  }

  if (touched) fs.writeFileSync(filePath, doc.toString({ lineWidth: 0 }), "utf-8");
}
console.log(`\n${changed} cue(s) moved onto their own line`);
