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
  | "tehillim"
  | "holidays"
  | "lifecycle"
  | "other";

export interface TefilaCategoryInfo {
  id: TefilaCategory;
  name: string;
  nameHe: string;
  icon: string;
}

export interface InsertionContext {
  season: "winter" | "summer";
  isRoshChodesh: boolean;
  isCholHamoed: boolean;
  holiday?: "chanukah" | "purim" | "tishaBAv" | "fastDay" | "roshHashana" | "yomKippur";
  isFastDay: boolean;
  isMotzaeiShabbos: boolean;
  isAseresYemeiTeshuva: boolean;
}

export interface ConditionalInsertion {
  id: string;
  name: string;
  nameHe: string;
  /** Which bracha/section this insertion applies to */
  targetSectionId: string;
  /** Where in the target section to insert */
  position: "before" | "after" | "replace";
  /** When this insertion is active */
  condition: (ctx: InsertionContext) => boolean;
  text: string | NusachVariants;
  translation?: string | NusachVariants;
}

export function getTextForNusach(
  text: string | NusachVariants,
  nusach: Nusach
): string {
  if (typeof text === "string") return text;
  return text[nusach] ?? text.ashkenaz ?? Object.values(text)[0] ?? "";
}
