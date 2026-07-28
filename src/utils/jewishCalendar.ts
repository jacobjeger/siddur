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

  // Ends at Pesach regardless of where you are.
  if (month === 1 && day >= 15) return false;
  const beforePesach = month === 1 && day < 15;

  if (inIsrael) {
    if (month === 8) return day >= 7; // 7 Cheshvan onward
    if (month >= 9 && month <= 13) return true;
    return beforePesach;
  }

  // Diaspora: keyed to the civil date. The start shifts to 5 December in the
  // civil year preceding a Gregorian leap year.
  const civilYear = date.getFullYear();
  const isYearBeforeLeap = (civilYear + 1) % 4 === 0;
  const startDay = isYearBeforeLeap ? 5 : 4;

  const decemberStart = new Date(civilYear, 11, startDay);

  if (date.getMonth() === 11) {
    // December: on or after the start date.
    return date.getDate() >= startDay && date >= decemberStart;
  }
  // January through Pesach.
  if (date.getMonth() <= 3) {
    return !(month === 1 && day >= 15);
  }
  return false;
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
