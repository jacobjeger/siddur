#!/usr/bin/env npx tsx
/**
 * Repairs for sections whose CONTENT was wrong, not merely misformatted.
 *
 * Each of these ships a concluding bracha in a place it does not belong, which
 * is a berachah levatalah — the most serious defect class in the corpus. Where
 * the correct replacement text is not certain, these deliberately remove rather
 * than invent: omitting words a user might have said is recoverable, prompting
 * a bracha in vain is not.
 */
import * as fs from "fs";
import * as path from "path";
import { parseDocument, type Document } from "yaml";

interface Fix {
  file: string;
  id: string;
  why: string;
  apply: (node: any) => void;
}

const FIXES: Fix[] = [
  {
    file: "bedtime-shema-misc.yaml",
    id: "bedtime-shema-misc-hashkiveinu-bedtime",
    why:
      "byte-identical copy of maariv-hashkiveinu, including the chasima. " +
      "Hashkiveinu concludes with שׁוֹמֵר עַמּוֹ יִשְׂרָאֵל לָעַד only in Maariv, where it " +
      "is part of the geulah arichta. The give-away is the instructionHe, which " +
      "is the Tur discussing Hashkiveinu IN MAARIV.",
    apply: (node) => {
      const text: string = node.get("text");
      const chasima = text.indexOf("בָּרוּךְ אַתָּה יְהֹוָה שׁוֹמֵר עַמּוֹ יִשְׂרָאֵל לָעַד");
      if (chasima === -1) throw new Error("chasima not found — already fixed?");
      node.set("text", text.slice(0, chasima).trim());
      // The note argues why Hashkiveinu is not a hefsek between geulah and
      // tefillah — irrelevant at bedtime and actively misleading here.
      node.delete("instructionHe");
      node.set("needsReview", "Does Hashkiveinu belong at bedtime at all, and in which nusach?");
    },
  },
  {
    file: "bedtime-shema-misc.yaml",
    id: "bedtime-shema-misc-hallel-full",
    why:
      "titled 'Full Hallel (Psalms 113-118)' but contains ONLY the bracha " +
      "לִקְרֹא אֶת הַהַלֵּל — a user reciting this says a bracha and then has no " +
      "Hallel to say. An empty section renders a 'not yet available' placeholder, " +
      "which is strictly safer than a bracha with nothing after it.",
    apply: (node) => {
      const text = String(node.get("text") ?? "");
      // Refuse once the section has real Hallel in it. Without this guard a
      // second run silently deleted restored liturgy: the fix cleared `text`
      // unconditionally, so it "re-fixed" a section that was already correct.
      if (text.replace(/[^א-ת]/g, "").length > 130) {
        throw new Error("section now has substantial text — refusing to clear it");
      }
      node.set("text", "");
      node.set("status", "needs-text");
    },
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-insert-hamelech-hamishpat",
    why:
      "an INSERTION carrying the entire Hashiveinu bracha, duplicating " +
      "shacharis-amidah-11-mishpat. An insertion must hold only the words " +
      "inserted, or applying it emits the whole bracha a second time.",
    apply: (node) => {
      // Only collapse it while it still holds the whole bracha.
      if (String(node.get("text") ?? "").replace(/[^א-ת]/g, "").length < 60) {
        throw new Error("already reduced to the inserted words");
      }
      node.set("text", "הַמֶּֽלֶךְ הַמִּשְׁפָּט:");
      node.delete("instructionHe");
    },
  },
];

for (const fix of FIXES) {
  const filePath = path.join("content/prayers", fix.file);
  const doc: Document = parseDocument(fs.readFileSync(filePath, "utf-8"));
  const node = (doc.get("sections") as any)?.items?.find(
    (n: any) => n.get("id") === fix.id
  );
  if (!node) {
    console.log(`MISS  ${fix.id}`);
    continue;
  }
  try {
    fix.apply(node);
  } catch (error) {
    console.log(`FAIL  ${fix.id} — ${(error as Error).message}`);
    continue;
  }
  fs.writeFileSync(filePath, doc.toString({ lineWidth: 0 }), "utf-8");
  console.log(`FIXED ${fix.id}\n      ${fix.why}\n`);
}
