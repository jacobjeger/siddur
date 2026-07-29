import type { JewishCalendar } from "kosher-zmanim";
import type { InsertionContext } from "../data/types";
import * as R from "./tefillahRules";
import { isTachanunDay } from "./dayDavening";
import {
  getJewishCalendar,
  type HebrewDateOptions,
  DEFAULT_HEBREW_DATE_OPTIONS,
} from "../services/zmanim/hebrewCalendarService";

export interface InsertionContextOptions extends HebrewDateOptions {
  /** Shkia for the civil day, used to decide whether Shabbos has ended. */
  sunset?: Date | null;
}

/**
 * Build an InsertionContext for the given moment. This determines which
 * conditional insertions are active.
 */
export function getInsertionContext(
  date: Date = new Date(),
  options: InsertionContextOptions = DEFAULT_HEBREW_DATE_OPTIONS
): InsertionContext {
  const calendar = getJewishCalendar(date, options);

  return {
    season: isMashivHaRuachSeason(calendar) ? "winter" : "summer",
    saysTalUMatar: saysTalUMatar(calendar, date, options.inIsrael),
    isRoshChodesh: calendar.isRoshChodesh(),
    isCholHamoed: calendar.isCholHamoed(),
    holiday: getHoliday(calendar),
    isFastDay: calendar.isTaanis(),
    isMotzaeiShabbos: isMotzaeiShabbos(date, options),
    isAseresYemeiTeshuva: calendar.isAseresYemeiTeshuva(),

    isYizkor: R.isYizkor(calendar),
    // Tzidkascha and L'Dovid vary by nusach; the context carries the
    // nusach-independent "does today qualify" answer, and the nusach-specific
    // shape (verse order, which tefillos) lives on DayDaveningInfo.
    saysTzidkascha: R.getTzidkascha(calendar, "ashkenaz", isTachanunDay(calendar))
      .said,
    saysLdovid: R.getLdovid(calendar, "ashkenaz").said,
    isShabbosMevorchim: safeBool(() => calendar.isShabbosMevorchim()),
    specialShabbos: R.getSpecialShabbos(calendar),
    omerDay: safeOmer(calendar),
  };
}

function safeBool(fn: () => boolean): boolean {
  try {
    return fn();
  } catch {
    return false;
  }
}

function safeOmer(calendar: JewishCalendar): number {
  try {
    return Math.max(0, calendar.getDayOfOmer());
  } catch {
    return 0;
  }
}

function getHoliday(calendar: JewishCalendar): InsertionContext["holiday"] {
  if (calendar.isChanukah()) return "chanukah";
  // isPurim() is Adar-II-aware; the old month === 12 check fired in Adar I.
  if (calendar.isPurim()) return "purim";
  if (calendar.isTaanis()) {
    const month = calendar.getJewishMonth();
    const day = calendar.getJewishDayOfMonth();
    if (month === 5 && day === 9) return "tishaBAv";
    return "fastDay";
  }
  return undefined;
}

/**
 * Mashiv HaRuach: from Musaf of Shemini Atzeres (22 Tishrei) through Musaf of
 * the first day of Pesach (15 Nissan).
 */
function isMashivHaRuachSeason(calendar: JewishCalendar): boolean {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();

  if (month === 7) return day >= 22; // Tishrei
  if (month === 1) return day < 15; // Nissan, up to Pesach
  // Cheshvan (8) through Adar / Adar II (12, 13).
  return month >= 8 && month <= 13;
}

/**
 * V'Sein Tal U'Matar starts later than Mashiv HaRuach and on a different rule
 * inside and outside Israel:
 *   - Israel:   7 Cheshvan
 *   - Diaspora: the evening of 4 December (5 December before a civil leap year)
 * Both run until (but not including) 15 Nissan.
 *
 * The previous implementation applied one crude 22 Tishrei window to both,
 * which was wrong for roughly the three weeks between them in chu"l.
 */
function saysTalUMatar(
  calendar: JewishCalendar,
  date: Date,
  inIsrael: boolean
): boolean {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();

  // The window ends at 15 Nissan everywhere. Establish membership from the
  // JEWISH date first: Cheshvan (8) through Adar/Adar II (12/13), plus Nissan
  // up to the 15th.
  //
  // The previous version tested only `civilMonth <= 3` for the Jan–Apr tail and
  // excluded solely Nissan >= 15, so in any year where Iyar began before
  // 1 May it kept returning true for the rest of April — 13 wrong days in 2026
  // alone, and up to 20 in other years.
  const inWinterMonths = month >= 8 && month <= 13;
  const beforePesach = month === 1 && day < 15;
  if (!inWinterMonths && !beforePesach) return false;

  if (inIsrael) {
    // 7 Cheshvan onward.
    return month === 8 ? day >= 7 : true;
  }

  // Diaspora: the start is keyed to the civil date — the evening of 4 December,
  // or 5 December in the civil year preceding a Gregorian leap year.
  //
  // Read the civil date off the ROLLED calendar, not off `date`. Taking it from
  // the raw timestamp made the Diaspora branch flip at civil midnight while the
  // Israel branch above flips at nightfall, so on 4 December Shacharis and
  // Mincha wrongly included Tal U'Matar — it begins at Maariv that evening.
  const civilYear = calendar.getGregorianYear();
  const civilMonth = calendar.getGregorianMonth();
  const civilDay = calendar.getGregorianDayOfMonth();

  // Jan–Apr is the tail of a season that began the previous December, so by
  // this point the start has certainly passed.
  if (civilMonth <= 3) return true;

  if (civilMonth === 11) {
    // The shift to 5 December happens in the civil year BEFORE a Gregorian leap
    // year. `% 4` alone is not the Gregorian rule: 2100 is not a leap year, so
    // 2099 would wrongly start on the 5th.
    const startDay = isGregorianLeapYear(civilYear + 1) ? 5 : 4;
    // STRICTLY greater. The season begins at Maariv on the night of the 4th,
    // and `calendar` has already rolled forward at nightfall — so that first
    // Maariv reads as the 5th, while the 4th in daylight (Shacharis, Mincha)
    // must still be false.
    return civilDay > startDay;
  }

  // Cheshvan/Kislev before December — the Israel start has passed but the
  // Diaspora one has not.
  return false;
}

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Motzaei Shabbos is Saturday after nightfall — not "any time on Sunday",
 * which is what `dayOfWeek === 1` used to mean.
 */
function isMotzaeiShabbos(
  date: Date,
  options: InsertionContextOptions
): boolean {
  const isSaturday = date.getDay() === 6;
  if (!isSaturday) return false;

  const nightfall = options.tzeis ?? options.sunset;
  if (!nightfall) return false;

  return date.getTime() >= nightfall.getTime();
}

/**
 * Day of the week for Shir Shel Yom selection (0 = Sunday, 6 = Shabbos).
 */
export function getDayOfWeekIndex(date: Date = new Date()): number {
  return date.getDay();
}
