/**
 * Hebrew text normalization shared by the Sefaria fetcher and the archive
 * backfill. Every defect class here was found by auditing the existing corpora.
 */

/**
 * Unicode Alphabetic Presentation Forms (U+FB1D–U+FB4F) decompose to ordinary
 * Hebrew letters. 32 sections of the pre-xlsx archive carry them, which breaks
 * search and comparison against any other corpus.
 */
const PRESENTATION_FORMS: Record<string, string> = {
  "ﬠ": "ע", // ﬠ
  "ﬡ": "א", // ﬡ
  "ﬢ": "ד", // ﬢ
  "ﬣ": "ה", // ﬣ
  "ﬤ": "כ", // ﬤ
  "ﬥ": "ל", // ﬥ
  "ﬦ": "ם", // ﬦ
  "ﬧ": "ר", // ﬧ
  "ﬨ": "ת", // ﬨ
  "שׁ": "שׁ", // שׁ
  "שׂ": "שׂ", // שׂ
  "שּׁ": "שּׁ",
  "שּׂ": "שּׂ",
  "אַ": "אַ",
  "אָ": "אָ",
  "אּ": "אּ",
  "בּ": "בּ",
  "גּ": "גּ",
  "דּ": "דּ",
  "הּ": "הּ",
  "וּ": "וּ", // וּ
  "זּ": "זּ",
  "טּ": "טּ",
  "יּ": "יּ",
  "ךּ": "ךּ",
  "כּ": "כּ",
  "לּ": "לּ",
  "מּ": "מּ",
  "נּ": "נּ",
  "סּ": "סּ",
  "ףּ": "ףּ",
  "פּ": "פּ",
  "צּ": "צּ",
  "קּ": "קּ",
  "רּ": "רּ",
  "שּ": "שּ",
  "תּ": "תּ",
  "וֹ": "וֹ", // וֹ
  "בֿ": "בֿ",
  "כֿ": "כֿ",
  "פֿ": "פֿ",
  "ﭏ": "אל",
};

/** Bidi controls, soft hyphens and zero-width joiners — 3 archive sections have these INSIDE words. */
const INVISIBLES = /[­​-‏‪-‮⁦-⁩﻿]/g;

/**
 * The archive uses four competing spellings of the Divine Name. Normalize to
 * the fully-vocalized form the current content already standardized on.
 */
const DIVINE_NAME_VARIANTS: [RegExp, string][] = [
  [/יְיָ(?![֑-ׇ])/g, "יְהֹוָה"], // יְיָ
  [/יְ‑יָ/g, "יְהֹוָה"], // יְ‑יָ
];

export function normalizeHebrew(input: string): string {
  let out = input;

  for (const [form, replacement] of Object.entries(PRESENTATION_FORMS)) {
    if (out.includes(form)) out = out.split(form).join(replacement);
  }
  out = out.replace(INVISIBLES, "");
  for (const [pattern, replacement] of DIVINE_NAME_VARIANTS) {
    out = out.replace(pattern, replacement);
  }

  // Collapse runs of spaces (the xlsx round-trip left an 8-space run in Modeh
  // Ani) without touching newlines.
  out = out.replace(/[ \t]{2,}/g, " ");

  return out
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const NIKKUD = /[ְ-ּ־-ׇ]/;

/** A line with no nikkud at all is a rubric, not liturgy. */
export function hasNikkud(line: string): boolean {
  return NIKKUD.test(line);
}

export interface SplitText {
  text: string;
  instructionHe: string;
}

/**
 * Split a Sefaria HTML fragment into liturgy and rubrics.
 *
 * Sefaria wraps instructions in `<small>` — 2 blocks in Refaeinu, 47 in Birkat
 * HaMazon. That marking is far more reliable than guessing from nikkud, and is
 * almost certainly why the original importer under-performed: it stripped HTML
 * first and destroyed the signal. So parse `<small>` BEFORE removing tags, and
 * only fall back to the nikkud heuristic for text that had no markup.
 */
export function splitSefariaHtml(html: string): SplitText {
  const rubrics: string[] = [];
  const liturgy: string[] = [];

  /**
   * `<small>` marks a rubric, but Sefaria also wraps *optional liturgy* in it —
   * Refaeinu's `<small>` contains both "מי שרוצה להתפלל על החולה יאמר כאן" (a
   * rubric) and the vocalised Mi Shebeirach itself. Classifying the whole block
   * as an instruction would have hidden real liturgy, so split inside the block
   * too: vocalised lines are liturgy, unvocalised lines are rubric.
   */
  const classify = (chunk: string) => {
    for (const line of chunk.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      (hasNikkud(trimmed) ? liturgy : rubrics).push(trimmed);
    }
  };

  let cursor = 0;
  const pattern = /<small>([\s\S]*?)<\/small>/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    classify(stripTags(html.slice(cursor, match.index)));
    classify(stripTags(match[1]));
    cursor = match.index + match[0].length;
  }
  classify(stripTags(html.slice(cursor)));

  return {
    text: normalizeHebrew(liturgy.join("\n")),
    instructionHe: normalizeHebrew(rubrics.join("\n")),
  };
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_m, d: string) => String.fromCharCode(Number(d)));
}
