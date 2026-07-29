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
  /** Group heading from the source workbook (e.g., "Pesukei D'Zimra") */
  group?: string;
  /** Sefaria ref or other source pointer for this section */
  sourceRef?: string;
  /** Editorial status: "complete" | "needs-text" | "draft" | etc. — free-form */
  status?: string;
  /**
   * When this section is said. Absent means always.
   *
   * Replaces conditions that were English prose in `instruction` and therefore
   * unactionable — see src/utils/sectionConditions.ts.
   */
  when?: SectionCondition;
}

export interface SectionCondition {
  rule?: string;
  /** 1 = Sunday … 7 = Shabbos. */
  weekdays?: number[];
  minyan?: boolean;
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
  /** Mashiv HaRuach season: Shemini Atzeres through the first day of Pesach. */
  season: "winter" | "summer";
  /**
   * V'Sein Tal U'Matar, which starts later than Mashiv HaRuach and on a
   * different rule in Israel (7 Cheshvan) vs the Diaspora (Dec 4/5).
   */
  saysTalUMatar: boolean;
  isRoshChodesh: boolean;
  isCholHamoed: boolean;
  holiday?: "chanukah" | "purim" | "tishaBAv" | "fastDay" | "roshHashana" | "yomKippur";
  isFastDay: boolean;
  isMotzaeiShabbos: boolean;
  isAseresYemeiTeshuva: boolean;

  // Day-rules, so conditional text can key off them directly rather than
  // re-deriving the calendar. Populated by getInsertionContext().
  /** Yom Kippur, Shmini Atzeres, last day Pesach, Shavuos (region-aware). */
  isYizkor: boolean;
  /** Tzidkascha Tzedek at Shabbos Mincha. */
  saysTzidkascha: boolean;
  /** L'Dovid Hashem Ori (Ps 27), Elul through Tishrei. */
  saysLdovid: boolean;
  /** Shabbos Mevorchim — Bircas HaChodesh is announced. */
  isShabbosMevorchim: boolean;
  /** Which of the nine special Shabbosos today is, if any. */
  specialShabbos: string | null;
  /** Day of the Omer, 0 when not counting. */
  omerDay: number;
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
