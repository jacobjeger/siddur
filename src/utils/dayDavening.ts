import { JewishCalendar } from "kosher-zmanim";
import type { InsertionContext } from "../data/types";
import type { Minhag, Nusach } from "../stores/useSettingsStore";
import {
  getJewishCalendar,
  type HebrewDateOptions,
  DEFAULT_HEBREW_DATE_OPTIONS,
} from "../services/zmanim/hebrewCalendarService";
import * as R from "./tefillahRules";
import { getOmerText } from "./omer";

export interface ActiveInsertion {
  name: string;
  nameHe: string;
}

export type HallelType = "full" | "half" | "none";

export interface DayDaveningInfo {
  specialDayLabel: string;
  specialDayLabelHe: string;
  activeInsertions: ActiveInsertion[];
  isRoshChodesh: boolean;
  hallelType: HallelType;
  /** Whether a bracha is said over Hallel — Edot HaMizrach say none. */
  hallelBracha: boolean;
  sayTachanun: boolean;

  // Day-rules from tefillahRules.ts. All nusach-aware where the practice
  // differs; see docs/unverified-rules.md for what is not yet settled.
  shirShelYom: R.ShirShelYom;
  ldovid: R.Ldovid;
  tzidkascha: R.Tzidkascha;
  pirkeiAvos: R.PirkeiAvos;
  bircasHaChodesh: R.BircasHaChodesh;
  specialShabbos: R.SpecialShabbos | null;
  isYizkor: boolean;
  isAvinuMalkeinu: boolean;
  isAvHaRachamim: boolean;
  isBaHab: boolean;
  isYomKippurKatan: boolean;
  isMacharChodesh: boolean;
  isTaanisBechoros: boolean;
  isIsruChag: boolean;
  isEruvTavshilin: boolean;
  isBedikasChometzNight: boolean;
  /** Sefiras HaOmer counting text for today, in the user's nusach. */
  omerText: string;
}

/**
 * Summarise what is different about today's davening: which insertions apply,
 * whether Hallel is said and in what form, and whether Tachanun is said.
 */
export function getDayDaveningInfo(
  context: InsertionContext,
  date: Date = new Date(),
  options: HebrewDateOptions = DEFAULT_HEBREW_DATE_OPTIONS,
  nusach: Nusach = "ashkenaz",
  minhag: Minhag = "standard"
): DayDaveningInfo {
  const calendar = getJewishCalendar(date, options);

  const activeInsertions: ActiveInsertion[] = [];

  // Mashiv HaRuach and Tal U'Matar start on different dates, so they are
  // tracked separately rather than both hanging off one "winter" flag.
  if (context.season === "winter") {
    activeInsertions.push({ name: "Mashiv HaRuach", nameHe: "משיב הרוח" });
  } else {
    activeInsertions.push({ name: "Morid HaTal", nameHe: "מוריד הטל" });
  }
  if (context.saysTalUMatar) {
    activeInsertions.push({ name: "V'Sein Tal U'Matar", nameHe: "ותן טל ומטר" });
  }

  if (context.isRoshChodesh || context.isCholHamoed) {
    activeInsertions.push({ name: "Ya'aleh V'Yavo", nameHe: "יעלה ויבא" });
  }
  if (context.holiday === "chanukah" || context.holiday === "purim") {
    activeInsertions.push({ name: "Al HaNissim", nameHe: "על הנסים" });
  }
  if (context.isMotzaeiShabbos) {
    activeInsertions.push({ name: "Ata Chonantanu", nameHe: "אתה חוננתנו" });
  }
  if (context.isFastDay) {
    activeInsertions.push({ name: "Aneinu", nameHe: "עננו" });
  }
  if (context.isAseresYemeiTeshuva) {
    activeInsertions.push(
      { name: "Zachreinu", nameHe: "זכרנו" },
      { name: "HaMelech HaKadosh", nameHe: "המלך הקדוש" }
    );
  }

  const { label, labelHe } = getSpecialDayLabel(calendar, context);
  const sayTachanun = getSayTachanun(calendar);
  // Tzidkascha and Av HaRachamim key off "would Tachanun be said on a weekday",
  // NOT off sayTachanun — which is false every Shabbos, i.e. exactly when they
  // are relevant.
  const tachanunDay = isTachanunDay(calendar);
  const omerDay = safeNumber(() => calendar.getDayOfOmer());

  return {
    specialDayLabel: label,
    specialDayLabelHe: labelHe,
    activeInsertions,
    isRoshChodesh: context.isRoshChodesh,
    hallelType: getHallelType(calendar),
    hallelBracha: R.saysHallelBracha(nusach),
    sayTachanun,

    shirShelYom: R.getShirShelYom(calendar, nusach, minhag),
    ldovid: R.getLdovid(calendar, nusach, minhag),
    tzidkascha: R.getTzidkascha(calendar, nusach, tachanunDay),
    pirkeiAvos: R.getPirkeiAvos(calendar, nusach),
    bircasHaChodesh: R.getBircasHaChodesh(date, options),
    specialShabbos: R.getSpecialShabbos(calendar),
    isYizkor: R.isYizkor(calendar),
    isAvinuMalkeinu: R.isAvinuMalkeinu(calendar, nusach),
    isAvHaRachamim: R.isAvHaRachamim(calendar, nusach, tachanunDay),
    isBaHab: R.isBaHab(calendar),
    isYomKippurKatan: R.isYomKippurKatan(calendar),
    isMacharChodesh: R.isMacharChodesh(calendar),
    isTaanisBechoros: R.isTaanisBechoros(calendar),
    isIsruChag: R.isIsruChag(calendar),
    isEruvTavshilin: R.isEruvTavshilin(calendar),
    isBedikasChometzNight: R.isBedikasChometzNight(calendar),
    omerText: omerDay > 0 ? getOmerText(omerDay, nusach) : "",
  };
}

function safeNumber(fn: () => number): number {
  try {
    const value = fn();
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function getSpecialDayLabel(
  calendar: JewishCalendar,
  context: InsertionContext
): { label: string; labelHe: string } {
  if (context.holiday === "chanukah") {
    const day = calendar.getDayOfChanukah();
    return { label: `Chanukah — Day ${day}`, labelHe: `חנוכה — יום ${day}` };
  }
  if (context.holiday === "purim") return { label: "Purim", labelHe: "פורים" };
  if (context.isAseresYemeiTeshuva) {
    return { label: "Aseres Yemei Teshuva", labelHe: "עשרת ימי תשובה" };
  }
  if (context.isCholHamoed) {
    return { label: "Chol HaMoed", labelHe: "חול המועד" };
  }
  if (context.isRoshChodesh) {
    return { label: "Rosh Chodesh", labelHe: "ראש חודש" };
  }
  if (context.isFastDay) return { label: "Fast Day", labelHe: "יום צום" };
  return { label: "", labelHe: "" };
}

/**
 * Full Hallel: Chanukah, Succos (including Chol HaMoed), Shemini Atzeres /
 * Simchas Torah, Shavuos, and the first day(s) of Pesach.
 * Half Hallel: Rosh Chodesh, and Pesach after the first day(s).
 */
function getHallelType(calendar: JewishCalendar): HallelType {
  const index = calendar.getYomTovIndex();

  if (calendar.isChanukah()) return "full";

  switch (index) {
    case JewishCalendar.SUCCOS:
    case JewishCalendar.CHOL_HAMOED_SUCCOS:
    case JewishCalendar.HOSHANA_RABBA:
    case JewishCalendar.SHEMINI_ATZERES:
    case JewishCalendar.SIMCHAS_TORAH:
    case JewishCalendar.SHAVUOS:
      return "full";
    case JewishCalendar.PESACH:
      // Only the opening day(s) of Pesach get full Hallel; from Chol HaMoed
      // onward it is half. (The previous implementation marked all of Chol
      // HaMoed as half, including Succos, which is wrong.)
      return calendar.getJewishDayOfMonth() <= (calendar.getInIsrael() ? 15 : 16)
        ? "full"
        : "half";
    case JewishCalendar.CHOL_HAMOED_PESACH:
      return "half";
    default:
      return calendar.isRoshChodesh() ? "half" : "none";
  }
}

/**
 * Tachanun is omitted on a long list of days. This covers the common ones;
 * the previous implementation handled only four.
 */
function getSayTachanun(calendar: JewishCalendar): boolean {
  // Shabbos has no Tachanun at all.
  if (calendar.getDayOfWeek() === 7) return false;
  return isTachanunDay(calendar);
}

/**
 * Whether today is a day Tachanun WOULD be said, ignoring the day of the week.
 *
 * Tzidkascha (Shabbos Mincha) and Av HaRachamim are omitted on days when
 * Tachanun would not be said "if it fell on a weekday" — so they cannot be
 * gated on getSayTachanun(), which is false every Shabbos by definition and
 * would suppress both of them permanently.
 */
export function isTachanunDay(calendar: JewishCalendar): boolean {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();
  const index = calendar.getYomTovIndex();

  if (calendar.isYomTov() || calendar.isCholHamoed()) return false;
  if (calendar.isRoshChodesh() || calendar.isChanukah()) return false;

  switch (index) {
    case JewishCalendar.PURIM:
    case JewishCalendar.SHUSHAN_PURIM:
    case JewishCalendar.PURIM_KATAN:
    case JewishCalendar.SHUSHAN_PURIM_KATAN:
    case JewishCalendar.TU_BESHVAT:
    case JewishCalendar.TU_BEAV:
    case JewishCalendar.PESACH_SHENI:
    case JewishCalendar.LAG_BAOMER:
    case JewishCalendar.EREV_ROSH_HASHANA:
    case JewishCalendar.EREV_YOM_KIPPUR:
    case JewishCalendar.TISHA_BEAV:
    case JewishCalendar.ISRU_CHAG:
      return false;
  }

  // The whole month of Nissan.
  if (month === 1) return false;
  // Rosh Chodesh Sivan through Isru Chag Shavuos (12 Sivan).
  if (month === 3 && day <= 12) return false;
  // From Yom Kippur through the end of Tishrei.
  if (month === 7 && day >= 9) return false;

  return true;
}
