#!/usr/bin/env npx tsx
/**
 * Add Psalm 92 — the Shabbos Shir Shel Yom — which is absent from the corpus
 * AND from the pre-xlsx archive, so it could not be restored by remapping.
 *
 * `src/utils/tefillahRules.ts` correctly reports Tehillim 92 for Shabbos, so
 * the Calendar tab has been naming a psalm the Siddur tab could not show. The
 * section carried six of seven days.
 *
 * Source: Sefaria, "Tanach with Nikkud", license Public Domain — chosen over
 * "Miqra according to the Masorah" (CC-BY-SA) and "Tanach with Ta'amei Hamikra"
 * because a siddur prints the psalm vocalized but WITHOUT ta'amei hamikra.
 *
 * The text is normalized to this section's existing conventions rather than
 * pasted raw: sof pasuq to colon, the Divine Name to the corpus spelling, and
 * the holam-haser form of אֱלֺהִים that the neighbouring psalms use. The intro
 * line is DERIVED from Friday's by substitution, so its orthography — including
 * the U+0592 shva-na markers in אוֹמְ֒רִים — is identical by construction rather
 * than retyped.
 */
import * as fs from "fs";
import { parseDocument, type Document } from "yaml";
import { normalizeHebrew } from "./lib/hebrewText";

const SECTION = "shacharis-shir-shel-yom";
const FILE = "content/prayers/shacharis.yaml";
const CACHE = "/tmp/ps92v.json";

/** Match this section's spelling conventions. */
function toCorpusOrthography(verse: string): string {
  return (
    verse
      // Sefaria writes ketiv/qere as `ketiv [qere]`. Verse 16 is
      // `וְלֹא־עלתה [עַוְלָתָה] בּוֹ`. A siddur prints only the qere; leaving the
      // apparatus in would render an unvocalized ketiv and a bracketed gloss as
      // prayer text.
      // NOTE the character class excludes maqaf (U+05BE) deliberately. Including
      // it made the match swallow the maqaf-joined word before the ketiv, so
      // `וְלֹא־עלתה [עַוְלָתָה]` collapsed to `עַוְלָתָה` — deleting וְלֹא and
      // inverting the meaning of the verse.
      .replace(/[\u05D0-\u05EA\u0591-\u05BD\u05BF-\u05C7]+\s*\[([^\]]+)\]/g, "$1")
      // Sefaria ends each verse with sof pasuq U+05C3; the corpus uses a colon.
      .replace(/׃/g, ":")
      // Standalone Name: the corpus writes the holam, Sefaria omits it.
      // י ְ ה [ֹ] ו ָ ה
      .replace(/יְהוָה/g, "יְהֹוָה")
      // Prefixed Name (לַיהוָה): the corpus puts the holam after the qamats.
      .replace(/יהוָה/g, "יהוָֹה")
      // The surrounding psalms in this section use holam haser on אֱלֺהִים.
      .replace(/אֱלֹה/g, "אֱלֺה")
  );
}

const payload = JSON.parse(fs.readFileSync(CACHE, "utf-8"));
const version = payload.versions?.[0];
if (!version) throw new Error("no version in the cached Sefaria response");
if (version.license !== "Public Domain") {
  throw new Error(`unexpected license '${version.license}' — refusing to import`);
}
const verses: string[] = version.text;
if (verses.length !== 16) {
  throw new Error(`Psalm 92 should have 16 verses, got ${verses.length}`);
}

const psalm = normalizeHebrew(verses.map(toCorpusOrthography).join(" "));

const doc: Document = parseDocument(fs.readFileSync(FILE, "utf-8"));
const node = (doc.get("sections") as any).items.find(
  (n: any) => n.get("id") === SECTION
);
if (!node) throw new Error(`${SECTION} not found`);

const lines = String(node.get("text")).split("\n");
const markers = lines.filter((l) => l.includes("הַיּוֹם יוֹם")).length;
if (markers === 7) {
  console.log("SKIP — all seven days already present");
  process.exit(0);
}
if (markers !== 6) throw new Error(`expected 6 day markers, found ${markers}`);

// Derive Shabbos's intro from Friday's so every other word, and every
// cantillation-like marker in it, is identical by construction.
const friday = lines.find((l) => l.includes("יוֹם שִׁשִּׁי"));
if (!friday) throw new Error("Friday intro line not found");
const shabbosIntro = friday.replace(
  /יוֹם שִׁשִּׁי בַּשַּׁבָּת/,
  "יוֹם שַׁבַּת קֹֽדֶשׁ"
);
if (shabbosIntro === friday) throw new Error("intro substitution did not apply");

const updated = [...lines, "בשבת:", shabbosIntro, psalm].join("\n");

// Gate: this may only APPEND. Everything already there must survive byte for byte.
if (!updated.startsWith(String(node.get("text")))) {
  throw new Error("existing text would be modified — refusing");
}

node.set("text", updated);
node.set(
  "sourceRef",
  "Sefaria: Psalms 92, version 'Tanach with Nikkud' (Public Domain)"
);
fs.writeFileSync(FILE, doc.toString({ lineWidth: 0 }), "utf-8");

console.log(`added Psalm 92 (${psalm.replace(/[^א-ת]/g, "").length} letters)`);
console.log(`  cue    : בשבת:`);
console.log(`  intro  : ${shabbosIntro.slice(0, 60)}…`);
console.log(`  opening: ${psalm.slice(0, 60)}…`);
