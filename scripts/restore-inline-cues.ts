#!/usr/bin/env npx tsx
/**
 * Second half of the inline-rubric repair, for the sections the archive could
 * not supply (see restore-inline-rubrics.ts).
 *
 * Two shapes, both reconstructible without guessing at liturgy:
 *
 * 1. CUE LABELS. A short label ending in ':' that selects the alternative
 *    immediately following it. Hoisting these is destructive: Ya'aleh V'Yavo
 *    currently prints "ראש החדש הזה / חג המצות הזה / חג הסכות הזה" one after
 *    another with the לר"ח / לפסח / לסכות labels stripped, so a user on Rosh
 *    Chodesh reads all three. Same in Modim, where both Al HaNissim paragraphs
 *    run together. The table below re-attaches each cue to the line it labels;
 *    long halachic notes are NOT moved, since those really are section-level.
 *
 * 2. BRACKETED RESPONSES. Kaddish lines end with an orphaned '[' because the
 *    '[קהל: אמן]' responses were split off into instructionHe. The cue list is
 *    strictly ordered, so it can be zipped back: a pair (X:, Y]) fills the next
 *    '[', and any item not followed by a ']'-terminated item is a standalone
 *    speaker cue for the next line.
 *
 * Every repair is gated on the liturgy being byte-identical afterwards, so this
 * can only move rubrics around — never alter or drop a word of prayer.
 */
import * as fs from "fs";
import * as path from "path";
import { parseDocument, type Document } from "yaml";

/** Cue → the opening of the line it labels. Anchors must match exactly one line. */
const CUE_TABLE: Record<string, [cue: string, anchor: string][]> = {
  "shacharis-amidah-17-avoda": [
    ["בראש חדש ובחול המועד אומרים זה:", "אֱלֹהֵֽינוּ וֵאלֹהֵי אֲבוֹתֵֽינוּ יַעֲלֶה"],
    ['לר"ח:', "רֹאשׁ הַחֹֽדֶשׁ הַזֶּה:"],
    ["לפסח:", "חַג הַמַּצּוֹת הַזֶּה:"],
    ["לסכות:", "חַג הַסֻּכּוֹת הַזֶּה:"],
  ],
  "shacharis-amidah-18-hodaa": [
    ["בחנוכה ופורים אומרים על הנסים.", "עַל הַנִּסִּים"],
    ["בחנוכה:", "בִּימֵי מַתִּתְיָֽהוּ"],
    ["בפורים:", "בִּימֵי מָרְדְּ֒כַי"],
    ['בעשי"ת:', "וּכְתוֹב לְחַיִּים טוֹבִים"],
  ],
  "shacharis-barchu": [
    ["ואומר שליח צבור:", "בָּרְ֒כוּ אֶת"],
    ["ועונין הקהל:", "בָּרוּךְ יְהֹוָה"],
  ],
  "shacharis-barchu-end": [
    ["ואומר שליח צבור:", "בָּרְ֒כוּ אֶת"],
    ["ועונין הקהל:", "בָּרוּךְ יְהֹוָה"],
  ],
  "shacharis-birchos-krias-shema-section": [
    ["ואומר שליח צבור:", "בָּרְ֒כוּ אֶת"],
    ["ועונין הקהל:", "בָּרוּךְ יְהֹוָה"],
  ],
  "maariv-barchu-maariv": [
    ["ואומר שליח צבור:", "בָּרְ֒כוּ אֶת"],
    ["ועונין הקהל:", "בָּרוּךְ יְהֹוָה"],
  ],
  "shacharis-vetigaleh-vetiraeh": [
    ["חזן:", "וְתִגָּלֶה"],
    ["והקהל עונים:", "וְאַתֶּם הַדְּ֒בֵקִים"],
  ],
  // --- second pass: cues the audit's original list of 15 missed ---
  "shacharis-tefillin-bracha": [
    ["יניח התפילין של יד", "לְהָנִיחַ תְּפִלִּין"],
    ["ויכרוך שבע כריכות", "עַל מִצְוַת תְּפִלִּין"],
    ["ואחר שיהדק הרצועה על ראשו יאמר:", "בָּרוּךְ שֵׁם כְּבוֹד"],
    ["ואח״כ כורך הרצועה של יד על אצבעו, ואומר:", "וְאֵרַשְׂתִּיךְ"],
    ["אחר שיניח תפילין יאמר", "וַיְדַבֵּר יְהֹוָה אֶל־משֶׁה"],
  ],
  "shacharis-seder-hamaaracha": [
    ["בראש חודש מוסיפים:", "וּבְרָאשֵׁי חָדְשֵׁיכֶם"],
  ],
  // Both of these currently print the year-round ending and the Aseres Yemei
  // Teshuva ending one after the other with nothing to distinguish them.
  "shacharis-amidah-11-mishpat": [
    ['בעשי"ת יסיים:', "הַמֶּֽלֶךְ הַמִּשְׁפָּט:"],
  ],
  "shacharis-amidah-19-shalom": [
    ['בעשי"ת:', "בְּסֵֽפֶר חַיִּים"],
  ],
  // The congregation's response is the SECOND line; hoisting the cue made it
  // look like the whole bracha is the response.
  "shacharis-birchas-hagomel": [
    ["והקהל עונים:", "מִי שֶׁגְּ֒מָלְ֒ךָ"],
  ],
  // Ashrei comes first in these sections; the Kaddish cue belongs at the Kaddish.
  "shacharis-ashrei-2": [["ואומר החזן חצי קדיש:", "יִתְגַּדַּל"]],
  "mincha-ashrei-mincha": [["ואומר החזן חצי קדיש:", "יִתְגַּדַּל"]],
};

const KADDISH = [
  "bedtime-shema-misc-kaddish-chatzi",
  "bedtime-shema-misc-kaddish-yasom",
  "shacharis-chatzi-kaddish-2",
  "shacharis-chatzi-kaddish-3",
];

const skeleton = (s: string) => s.replace(/[^א-ת]/g, "");
/**
 * Order-independent fingerprint. The gate must allow a cue to MOVE between
 * `instructionHe` and `text` while still catching any letter added or lost, so
 * compare the sorted multiset of consonants rather than the sequence.
 */
const charBag = (s: string) => skeleton(s).split("").sort().join("");
const lines = (s: string) =>
  (s ?? "").split("\n").map((l) => l.trim()).filter(Boolean);

interface Repair {
  text: string;
  instructionHe: string;
}

function applyCues(text: string, instr: string, table: [string, string][]): Repair {
  const body = lines(text);
  let notes = lines(instr);

  for (const [cue, anchor] of table) {
    // Match anywhere in the line, not just the start: the two tefillin brachos
    // are identical for their first 60 characters and only diverge at the end.
    const at = body.findIndex((l) => l.includes(anchor));
    if (at === -1) throw new Error(`anchor not found: ${anchor}`);
    if (body.filter((l) => l.includes(anchor)).length > 1)
      throw new Error(`ambiguous anchor: ${anchor}`);

    // Match the note by prefix so a cue can carry a trailing sentence the
    // table only names the head of.
    const noteAt = notes.findIndex((n) => n.startsWith(cue));
    if (noteAt === -1) throw new Error(`cue not in instructionHe: ${cue}`);

    body.splice(at, 0, notes[noteAt]);
    notes = notes.filter((_, i) => i !== noteAt);
  }

  return { text: body.join("\n"), instructionHe: notes.join("\n") };
}

function applyKaddish(text: string, instr: string): Repair {
  const body = lines(text);
  const cues = lines(instr);
  const brackets = (text.match(/\[/g) ?? []).length;

  let i = 0;
  const out: string[] = [];

  for (const line of body) {
    // A cue whose successor does not end in ']' is a standalone speaker
    // direction for this line, not half of a response pair.
    if (i < cues.length && !(cues[i + 1] ?? "").endsWith("]")) {
      out.push(cues[i]);
      i++;
    }

    // Split on the orphaned brackets and rejoin with the filled-in responses.
    // A repeated `replace("[", ...)` would re-match the bracket it just wrote
    // and eat the rest of the cue list.
    const parts = line.split("[");
    let filled = parts[0];
    for (const rest of parts.slice(1)) {
      const speaker = cues[i];
      const response = cues[i + 1];
      if (!speaker || !response?.endsWith("]"))
        throw new Error(`ran out of response cues at: ${line.slice(0, 30)}`);
      filled += `[${speaker} ${response}${rest}`;
      i += 2;
    }
    out.push(filled);
  }

  if (i !== cues.length)
    throw new Error(`${cues.length - i} cue(s) left over`);

  return { text: out.join("\n"), instructionHe: "" };
}

let fixed = 0;
for (const file of fs.readdirSync("content/prayers")) {
  const filePath = path.join("content/prayers", file);
  const doc: Document = parseDocument(fs.readFileSync(filePath, "utf-8"));
  const sections = doc.get("sections") as any;
  if (!sections?.items) continue;
  let touched = false;

  for (const node of sections.items) {
    const id = node.get("id");
    const isKaddish = KADDISH.includes(id);
    if (!isKaddish && !CUE_TABLE[id]) continue;

    const text = String(node.get("text") ?? "");
    const instr = String(node.get("instructionHe") ?? "");

    let repair: Repair;
    try {
      repair = isKaddish
        ? applyKaddish(text, instr)
        : applyCues(text, instr, CUE_TABLE[id]);
    } catch (error) {
      console.log(`  FAIL  ${id} — ${(error as Error).message}`);
      continue;
    }

    // Absolute gate: this pass may only relocate rubrics. If a single Hebrew
    // consonant of the combined text changed, something is wrong — bail.
    const before = charBag(text + instr);
    const after = charBag(repair.text + repair.instructionHe);
    if (before !== after) {
      console.log(`  FAIL  ${id} — text changed (${before.length} -> ${after.length})`);
      continue;
    }

    node.set("text", repair.text);
    if (repair.instructionHe) node.set("instructionHe", repair.instructionHe);
    else if (node.has("instructionHe")) node.delete("instructionHe");

    console.log(`  FIXED ${id}`);
    touched = true;
    fixed++;
  }

  if (touched) fs.writeFileSync(filePath, doc.toString({ lineWidth: 0 }), "utf-8");
}
console.log(`\nrepaired ${fixed}/${KADDISH.length + Object.keys(CUE_TABLE).length}`);
