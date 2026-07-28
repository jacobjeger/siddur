/**
 * A prayer section is a SEQUENCE of liturgy and rubric blocks, not two flat
 * fields.
 *
 * Storing `text` and `instructionHe` separately loses the interleaving, and the
 * interleaving is load-bearing: a cue label selects between mutually exclusive
 * alternatives that immediately follow it. Flattening
 *
 *     …וְתֵן / בימות החמה: / בְּרָכָה / בימות הגשמים: / טַל וּמָטָר לִבְרָכָה / …
 *
 * into (all liturgy) + (all rubrics) produces
 *
 *     …וְתֵן בְּרָכָה טַל וּמָטָר לִבְרָכָה…
 *
 * — both seasonal alternatives run together mid-sentence, with nothing left to
 * say which applies. Same shape in Gevuros (Morid HaTal vs Mashiv HaRuach),
 * Retzei, Modim (both Al HaNissim paragraphs) and Shir Shel Yom (all seven
 * psalms).
 */

export type BlockKind = "liturgy" | "rubric";

export interface SectionBlock {
  kind: BlockKind;
  text: string;
}

const NIKKUD = /[ְ-ׇּֿׁׂ]/;
const HEBREW = /[א-ת]/;

/**
 * A Hebrew line carrying no nikkud is a rubric.
 *
 * Deliberately excludes maqaf (U+05BE), sof pasuq (U+05C3) and the shva-na
 * markers this corpus uses (U+05AF, U+0592) from the "has nikkud" test — an
 * earlier version counted maqaf as nikkud, so an unvocalized rubric containing
 * one was silently kept as liturgy.
 */
export function isRubricLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (!HEBREW.test(trimmed)) return false;
  return !NIKKUD.test(trimmed);
}

/**
 * Split a section's text into ordered blocks, preserving position. Consecutive
 * lines of the same kind are merged so a multi-line rubric stays one block.
 */
export function toBlocks(text: string): SectionBlock[] {
  const blocks: SectionBlock[] = [];

  for (const line of (text ?? "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const kind: BlockKind = isRubricLine(trimmed) ? "rubric" : "liturgy";
    const last = blocks[blocks.length - 1];

    if (last && last.kind === kind) {
      last.text = `${last.text}\n${trimmed}`;
    } else {
      blocks.push({ kind, text: trimmed });
    }
  }

  return blocks;
}
