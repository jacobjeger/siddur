import type { Tefila, InsertionContext, ConditionalInsertion } from "../data/types";
import { ALL_INSERTIONS } from "../data/insertions";

/**
 * Which conditional insertions apply today.
 *
 * This deliberately does NOT modify the prayer text. The corpus is a siddur:
 * it already carries every seasonal and conditional alternative inline, in
 * position, behind its own cue — `בקיץ:`/`בחורף:` in Gevuros, `בעשי"ת:` in Avos
 * and Sim Shalom, `בראש חדש ובחול המועד אומרים זה:` in Retzei, both Al HaNissim
 * paragraphs in Modim. Measured: 13 of the 15 insertions duplicate text that is
 * already present in their target section.
 *
 * The previous implementation appended each active insertion as a whole extra
 * SECTION after the target, so the user read Morid HaTal in place and then
 * again as a separate block titled in English — every day of the year — and on
 * Chanukah read Al HaNissim inside Modim and then a second full Al HaNissim
 * *after* `בָּרוּךְ אַתָּה יְהֹוָה הַטּוֹב שִׁמְךָ`. Text that belongs mid-bracha can never
 * be correct when appended after the chasima.
 *
 * `position: "replace"` was worse than a no-op: it discarded `insertion.text`
 * and appended an English tag (`[V'Sein Tal U'Matar]`) to the section, so the
 * only visible effect was Latin text above the Hebrew.
 *
 * So insertions are now purely an ANNOTATION of what applies today, which is
 * what the Today and Calendar panels already render from `activeInsertions`.
 * Anything genuinely missing from the corpus is a content gap to be filled in
 * the YAML, in position, with its cue — not patched in at runtime. The one
 * such gap today is Aneinu; see docs/remaining-text.md.
 */
export function getActiveInsertions(
  context: InsertionContext
): ConditionalInsertion[] {
  return ALL_INSERTIONS.filter((insertion) => insertion.condition(context));
}

/**
 * Kept for call-site compatibility. Returns the tefila unchanged.
 *
 * Assembly is a no-op by design — see getActiveInsertions above. It stays as a
 * named seam so that if per-nusach text variants land later (see
 * `NusachVariants` in src/data/types.ts, currently unused by all 174 sections),
 * there is one obvious place to resolve them.
 */
export function assemblePrayer(
  baseTefila: Tefila,
  _context: InsertionContext
): Tefila {
  return baseTefila;
}

// Tachanun and Hallel live in src/utils/dayDavening.ts, which derives them
// from JewishCalendar. Duplicates previously lived here with materially wrong
// rules (Chol HaMoed Succos marked half Hallel; Tachanun missing Nissan, Lag
// BaOmer, Tu B'Av, Isru Chag and more). They had no callers and are removed.
