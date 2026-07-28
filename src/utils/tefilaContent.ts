import type { Tefila } from "../data/types";
import { getTextForNusach } from "../data/types";
import type { Nusach } from "../stores/useSettingsStore";

/**
 * Whether a tefila has any actual liturgy to show.
 *
 * 43 of 174 sections are still empty (see docs/remaining-text.md), and one
 * tefila — Birchas HaMazon — is empty in every section. Without this check the
 * home screen routes straight into a screen of headings over nothing, which
 * reads as a broken app rather than as missing content.
 */
export function hasContent(tefila: Tefila, nusach: Nusach): boolean {
  return tefila.sections.some((section) =>
    Boolean(getTextForNusach(section.text, nusach)?.trim())
  );
}

/** How many of a tefila's sections actually have text. */
export function contentCount(tefila: Tefila, nusach: Nusach): number {
  return tefila.sections.filter((section) =>
    Boolean(getTextForNusach(section.text, nusach)?.trim())
  ).length;
}
