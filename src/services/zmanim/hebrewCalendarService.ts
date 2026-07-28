import {
  JewishCalendar,
  HebrewDateFormatter,
  YomiCalculator,
} from "kosher-zmanim";
import type { ZmanimData } from "./types";

const hebrewFormatter = new HebrewDateFormatter();
hebrewFormatter.setHebrewFormat(true);

const englishFormatter = new HebrewDateFormatter();
englishFormatter.setHebrewFormat(false);

export interface HebrewDateOptions {
  inIsrael: boolean;
  /**
   * Tzeis for the civil day of `date`. The Jewish date advances at nightfall,
   * not at civil midnight — without this the app shows the wrong Hebrew date
   * every single evening.
   */
  tzeis?: Date | null;
}

export const DEFAULT_HEBREW_DATE_OPTIONS: HebrewDateOptions = {
  inIsrael: false,
};

export interface HebrewDateInfo {
  hebrewDate: string;
  englishDate: string;
  parsha: string;
  upcomingParsha: string;
  specialDay: string;
  isShabbos: boolean;
  isYomTov: boolean;
  isFastDay: boolean;
  isRoshChodesh: boolean;
  omerDay: number;
  dafYomi: string;
  dayType: DayType;
}

export type DayType =
  | "weekday"
  | "shabbos"
  | "yom_tov"
  | "rosh_chodesh"
  | "chol_hamoed"
  | "fast_day"
  | "chanukah"
  | "purim";

export type TefilaType = "shacharis" | "mincha" | "maariv" | "none";

/**
 * Build a JewishCalendar for the halachic day containing `date`, rolling the
 * date forward once nightfall has passed.
 */
export function getJewishCalendar(
  date: Date = new Date(),
  options: HebrewDateOptions = DEFAULT_HEBREW_DATE_OPTIONS
): JewishCalendar {
  const { inIsrael, tzeis } = options;

  const effective =
    tzeis && date.getTime() >= tzeis.getTime()
      ? new Date(date.getTime() + 24 * 60 * 60 * 1000)
      : date;

  const calendar = new JewishCalendar(effective);
  calendar.setInIsrael(inIsrael);
  return calendar;
}

function safe<T>(fn: () => T, fallback: T): T {
  try {
    const value = fn();
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * The parsha of the coming Shabbos.
 *
 * `JewishCalendar.getUpcomingParsha()` cannot be used: it throws
 * `clone.getParsha is not a function` in kosher-zmanim 0.9.0, because
 * `JewishDate.clone()` hardcodes `new JewishDate` and loses subclass methods
 * (upstream issue #36 / PR #33, both open). The throw used to be swallowed by
 * `safe()`, which left this blank on every weekday.
 *
 * So walk forward to the next Shabbos and format that calendar instead.
 */
function getUpcomingParshaName(
  date: Date,
  options: HebrewDateOptions
): string {
  for (let offset = 0; offset < 14; offset++) {
    const day = new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
    const calendar = getJewishCalendar(day, options);
    if (calendar.getDayOfWeek() !== 7) continue;

    const name = safe(() => englishFormatter.formatParsha(calendar), "");
    if (name) return name;
  }
  return "";
}

export function getHebrewDateInfo(
  date: Date = new Date(),
  options: HebrewDateOptions = DEFAULT_HEBREW_DATE_OPTIONS
): HebrewDateInfo {
  const calendar = getJewishCalendar(date, options);
  const dayOfWeek = calendar.getDayOfWeek();

  return {
    hebrewDate: safe(() => hebrewFormatter.format(calendar), ""),
    englishDate: safe(() => englishFormatter.format(calendar), ""),
    parsha: safe(() => englishFormatter.formatParsha(calendar), ""),
    upcomingParsha: getUpcomingParshaName(date, options),
    specialDay: safe(() => englishFormatter.formatYomTov(calendar), ""),
    isShabbos: dayOfWeek === 7,
    isYomTov: safe(() => calendar.isYomTov(), false),
    isFastDay: safe(() => calendar.isTaanis(), false),
    isRoshChodesh: safe(() => calendar.isRoshChodesh(), false),
    omerDay: safe(() => Math.max(0, calendar.getDayOfOmer()), 0),
    dafYomi: safe(
      () =>
        englishFormatter.formatDafYomiBavli(
          YomiCalculator.getDafYomiBavli(calendar)
        ),
      ""
    ),
    dayType: getDayType(calendar),
  };
}

function getDayType(calendar: JewishCalendar): DayType {
  if (calendar.getDayOfWeek() === 7) return "shabbos";
  // Purim and Chanukah must be tested before isYomTov(), which also returns
  // true for them and would otherwise swallow both. isPurim() is Adar-II-aware;
  // the previous code hardcoded Jewish month 12, so in a leap year it labelled
  // 14 Adar I as Purim instead of 14 Adar II.
  if (safe(() => calendar.isPurim(), false)) return "purim";
  if (safe(() => calendar.isChanukah(), false)) return "chanukah";
  if (safe(() => calendar.isYomTov(), false)) return "yom_tov";
  if (safe(() => calendar.isCholHamoed(), false)) return "chol_hamoed";
  if (safe(() => calendar.isRoshChodesh(), false)) return "rosh_chodesh";
  if (safe(() => calendar.isTaanis(), false)) return "fast_day";
  return "weekday";
}

export function getMolad(
  date: Date = new Date(),
  options: HebrewDateOptions = DEFAULT_HEBREW_DATE_OPTIONS
): Date | null {
  return safe(() => {
    const calendar = getJewishCalendar(date, options);
    return calendar.getMoladAsDate().toJSDate();
  }, null);
}

export interface UpcomingEvent {
  date: Date;
  hebrewDate: string;
  label: string;
  daysAway: number;
  kind: "yom_tov" | "rosh_chodesh" | "fast_day";
}

/**
 * Scan forward for notable dates. Deliberately keyed by date rather than by
 * label so that, e.g., both days of a two-day Rosh Chodesh survive.
 */
export function getUpcomingEvents(
  date: Date = new Date(),
  options: HebrewDateOptions = DEFAULT_HEBREW_DATE_OPTIONS,
  daysAhead = 60,
  limit = 8
): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];
  const start = getJewishCalendar(date, options);
  const startMs = new Date(
    start.getGregorianYear(),
    start.getGregorianMonth(),
    start.getGregorianDayOfMonth()
  ).getTime();

  for (let offset = 1; offset <= daysAhead && events.length < limit; offset++) {
    const day = new Date(startMs + offset * 24 * 60 * 60 * 1000);
    const calendar = new JewishCalendar(day);
    calendar.setInIsrael(options.inIsrael);

    const isYomTov = safe(() => calendar.isYomTov(), false);
    const isRoshChodesh = safe(() => calendar.isRoshChodesh(), false);
    const isFast = safe(() => calendar.isTaanis(), false);
    if (!isYomTov && !isRoshChodesh && !isFast) continue;

    const label =
      safe(() => englishFormatter.formatYomTov(calendar), "") ||
      (isRoshChodesh ? "Rosh Chodesh" : "Fast Day");

    events.push({
      date: day,
      hebrewDate: safe(() => hebrewFormatter.format(calendar), ""),
      label,
      daysAway: offset,
      kind: isYomTov ? "yom_tov" : isRoshChodesh ? "rosh_chodesh" : "fast_day",
    });
  }

  return events;
}

export function getCurrentTefilaType(
  date: Date,
  zmanim: ZmanimData
): TefilaType {
  const now = date.getTime();
  const { alosHaShachar, chatzos, sunset } = zmanim;

  if (alosHaShachar && now < alosHaShachar.getTime()) return "none";
  if (chatzos && now < chatzos.getTime()) return "shacharis";
  if (sunset && now < sunset.getTime()) return "mincha";
  return "maariv";
}
