import type { Nusach } from "../stores/useSettingsStore";

export interface PrayerSection {
  id: string;
  title: string;
  titleHe: string;
  /** Hebrew prayer text. If nusach-specific, use NusachVariants instead. */
  text: string | NusachVariants;
  /** Optional English translation */
  translation?: string | NusachVariants;
  /** Instruction/rubric shown before the section */
  instruction?: string;
  instructionHe?: string;
}

export type NusachVariants = Partial<Record<Nusach, string>>;

export interface Tefila {
  id: string;
  name: string;
  nameHe: string;
  category: TefilaCategory;
  sections: PrayerSection[];
  /** When this tefila is typically said */
  timeContext?: "shacharis" | "mincha" | "maariv" | "anytime";
}

export type TefilaCategory =
  | "shacharis"
  | "mincha"
  | "maariv"
  | "blessings"
  | "shabbos"
  | "other";

export interface TefilaCategoryInfo {
  id: TefilaCategory;
  name: string;
  nameHe: string;
  icon: string;
}

export function getTextForNusach(
  text: string | NusachVariants,
  nusach: Nusach
): string {
  if (typeof text === "string") return text;
  return text[nusach] ?? text.ashkenaz ?? Object.values(text)[0] ?? "";
}
