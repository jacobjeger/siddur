#!/usr/bin/env npx tsx
/**
 * Content repairs from the full audit.
 *
 * Every fix asserts its PRECONDITION first and refuses if the section is not in
 * the state it expects, so this is safe to re-run and safe to run against a
 * corpus someone has since edited. `fix-wrong-content.ts` lacked that and would
 * silently re-clear restored text on a second run.
 */
import * as fs from "fs";
import * as path from "path";
import { parseDocument, parse, type Document } from "yaml";

const CONTENT = "content/prayers";
const ARCHIVE = "archive/2026-05-14-pre-xlsx/prayers";

const letters = (s: string) => (s ?? "").replace(/[^א-ת]/g, "");

function archiveText(file: string, id: string): string {
  const doc = parse(fs.readFileSync(path.join(ARCHIVE, file), "utf-8"));
  const section = (doc?.sections ?? []).find((s: any) => s.id === id);
  if (!section?.text) throw new Error(`archive ${file}#${id} has no text`);
  return section.text;
}

interface Fix {
  file: string;
  id: string;
  why: string;
  /** Refuse unless the section is in the expected pre-repair state. */
  precondition: (node: any) => boolean;
  apply: (node: any, doc: Document) => void;
}

const FIXES: Fix[] = [
  {
    file: "shacharis.yaml",
    id: "shacharis-tachanun-vhu-rachum",
    why:
      "titled 'V Hu Rachum (long Tachanun)' but held the MAARIV V'Hu Rachum — " +
      "77 letters against 3296 — with Maariv's sourceRef and Maariv's Tur note. " +
      "~98% of the Monday/Thursday Tachanun was missing while the section read " +
      "as a finished two-pasuk prayer.",
    precondition: (node) => letters(node.get("text")).length < 200,
    apply: (node) => {
      node.set(
        "text",
        archiveText("shacharis/shacharis-post-amidah.yaml", "shacharis-for-monday-and-thursday")
      );
      node.set("sourceRef", "archive:shacharis-post-amidah.yaml#shacharis-for-monday-and-thursday");
      if (node.has("instructionHe")) node.delete("instructionHe");
    },
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-ashrei-2",
    why:
      "a whole Chatzi Kaddish was embedded in the Ashrei text, so a Kaddish " +
      "printed between Ashrei and Lamnatzeach where none belongs.",
    precondition: (node) => String(node.get("text")).includes("יִתְגַּדַּל"),
    apply: (node) => {
      node.set("text", archiveText("shacharis/shacharis-concluding-prayers.yaml", "shacharis-ashrei"));
    },
  },
  {
    file: "mincha.yaml",
    id: "mincha-ashrei-mincha",
    why:
      "same embedded Chatzi Kaddish; since mincha-chatzi-kaddish-mincha follows " +
      "immediately, Mincha printed the Chatzi Kaddish twice back to back.",
    precondition: (node) => String(node.get("text")).includes("יִתְגַּדַּל"),
    apply: (node) => {
      node.set("text", archiveText("mincha/mincha-ashrei.yaml", "mincha-ashrei"));
    },
  },
  {
    file: "bedtime-shema-misc.yaml",
    id: "bedtime-shema-misc-borei-nefashos",
    why: "doubled word in the bracha: בָּרוּךְ חֵי חַי הָעוֹלָמִים. Inherited from the archive source.",
    precondition: (node) => String(node.get("text")).includes("חֵי חַי"),
    apply: (node) => {
      node.set("text", String(node.get("text")).replace("חֵי חַי", "חֵי"));
    },
  },
  {
    file: "bedtime-shema-misc.yaml",
    id: "bedtime-shema-misc-shema-bedtime",
    why: "titled 'Shema (1st parsha)' but holds all three parshiyos (1065 letters).",
    precondition: (node) => /1st parsha/i.test(String(node.get("title"))),
    apply: (node) => node.set("title", "Shema"),
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-ein-keiloheinu",
    why:
      "carried an encyclopedic gloss inside the liturgy — " +
      "'(בחלק מהמהדורות: יְהֹוָה אֱלֹהֵינוּ)', i.e. 'in some editions' — which renders as prayer text.",
    precondition: (node) => String(node.get("text")).includes("בחלק מהמהדורות"),
    apply: (node) => {
      node.set(
        "text",
        String(node.get("text")).replace(/\s*\(בחלק מהמהדורות:[^)]*\)/g, "")
      );
    },
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-av-harachamim",
    why:
      "there are two different prayers called Av HaRachamim. The instruction " +
      "described the Shabbos memorial (אב הרחמים שוכן מרומים) while the text is " +
      "the ark-opening אב הרחמים הוא ירחם, which is what its sourceRef says too. " +
      "Retitled to match the text it actually holds; the memorial one is absent " +
      "from the corpus and is recorded in docs/remaining-text.md.",
    precondition: (node) =>
      String(node.get("text")).includes("אָב הָרַחֲמִים הוּא יְרַחֵם") &&
      /Mussaf/i.test(String(node.get("instruction") ?? "")),
    apply: (node) => {
      node.set("title", "Av HaRachamim (opening the Ark)");
      node.set("instruction", "Said when the Ark is opened before taking out the Torah");
    },
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-barchu-end",
    why:
      "Barchu is legitimately repeated at the end of Shacharis for someone who " +
      "davened without a minyan, so the section stays — but it carried the " +
      "Birchos Krias Shema rubric 'אין להפסיק כלל בין ברכו ליוצר אור', which is " +
      "meaningless at the end of davening.",
    precondition: (node) => String(node.get("text")).includes("אין להפסיק"),
    apply: (node) => {
      const kept = String(node.get("text"))
        .split("\n")
        .filter((line) => !line.includes("אין להפסיק") && !line.includes("המנהג הפשוט"))
        .join("\n");
      node.set("text", kept);
    },
  },
];

/** Sections that are exact duplicates of the section next to them. */
const REMOVE: { file: string; id: string; why: string }[] = [
  {
    file: "shacharis.yaml",
    id: "shacharis-birchos-krias-shema-section",
    why:
      "byte-identical to shacharis-barchu and sits immediately before it, so " +
      "Barchu printed twice in a row.",
  },
  {
    file: "shacharis.yaml",
    id: "shacharis-tachanun-short",
    why:
      "byte-identical to shacharis-tachanun-nefilas-apayim three sections later, " +
      "so Vayomer David and Psalm 6 printed twice with the Tachanun between them.",
  },
];

let applied = 0;
for (const file of new Set([...FIXES.map((f) => f.file), ...REMOVE.map((r) => r.file)])) {
  const filePath = path.join(CONTENT, file);
  const doc: Document = parseDocument(fs.readFileSync(filePath, "utf-8"));
  const sections = doc.get("sections") as any;
  let touched = false;

  for (const fix of FIXES.filter((f) => f.file === file)) {
    const node = sections.items.find((n: any) => n.get("id") === fix.id);
    if (!node) {
      console.log(`  MISS  ${fix.id}`);
      continue;
    }
    if (!fix.precondition(node)) {
      console.log(`  SKIP  ${fix.id} — already repaired or changed since the audit`);
      continue;
    }
    const before = letters(node.get("text")).length;
    fix.apply(node, doc);
    console.log(
      `  FIXED ${fix.id}  (${before} -> ${letters(node.get("text")).length} letters)\n        ${fix.why}`
    );
    touched = true;
    applied++;
  }

  for (const removal of REMOVE.filter((r) => r.file === file)) {
    const index = sections.items.findIndex((n: any) => n.get("id") === removal.id);
    if (index === -1) {
      console.log(`  SKIP  ${removal.id} — already removed`);
      continue;
    }
    // Only remove if it really is a duplicate of some other section, so this
    // can never delete unique liturgy.
    const target = letters(sections.items[index].get("text"));
    const twin = sections.items.find(
      (n: any, i: number) => i !== index && letters(n.get("text")) === target
    );
    if (!twin) {
      console.log(`  REFUSED ${removal.id} — no duplicate twin found; not removing unique text`);
      continue;
    }
    sections.items.splice(index, 1);
    console.log(`  REMOVED ${removal.id} (twin: ${twin.get("id")})\n        ${removal.why}`);
    touched = true;
    applied++;
  }

  if (touched) fs.writeFileSync(filePath, doc.toString({ lineWidth: 0 }), "utf-8");
}
console.log(`\napplied ${applied} repair(s)`);
