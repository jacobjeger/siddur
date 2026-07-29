import { JewishCalendar, HebrewDateFormatter } from "kosher-zmanim";
import { toHebrewNumeral } from "../../utils/hebrewNumbers";
import type { DayType, HebrewDateOptions } from "./hebrewCalendarService";

/**
 * A lightweight per-day model for the calendar grids.
 *
 * `getHebrewDateInfo` is deliberately not reused here: it derives the upcoming
 * parsha by walking forward up to fourteen days, which is fine once for the
 * Today panel but is 588 calendar constructions for a 42-cell month grid.
 * Everything a cell actually renders comes from one JewishCalendar.
 */
export interface CalendarDay {
  date: Date;
  /** Civil day-of-month, for the grid number. */
  civilDay: number;
  /** False for the leading/trailing padding cells of a month grid. */
  inMonth: boolean;
  hebrewDay: number;
  /** Hebrew numeral for the day, e.g. ט״ו. */
  hebrewDayHe: string;
  hebrewMonthHe: string;
  hebrewMonthEn: string;
  isToday: boolean;
  isShabbos: boolean;
  isYomTov: boolean;
  isCholHamoed: boolean;
  isRoshChodesh: boolean;
  isFastDay: boolean;
  isChanukah: boolean;
  /** Short English label for a notable day, or "". */
  label: string;
  labelHe: string;
  omerDay: number;
  dayType: DayType;
}

const hebrewFormatter = new HebrewDateFormatter();
hebrewFormatter.setHebrewFormat(true);
const englishFormatter = new HebrewDateFormatter();
englishFormatter.setHebrewFormat(false);

const DAY_MS = 24 * 60 * 60 * 1000;

/** The days melacha is forbidden — what "Yom Tov" means for colouring. */
const YOM_TOV_INDICES = new Set([
  JewishCalendar.PESACH,
  JewishCalendar.SHAVUOS,
  JewishCalendar.ROSH_HASHANA,
  JewishCalendar.YOM_KIPPUR,
  JewishCalendar.SUCCOS,
  JewishCalendar.SHEMINI_ATZERES,
  JewishCalendar.SIMCHAS_TORAH,
]);

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn() ?? fallback;
  } catch {
    return fallback;
  }
}

/** Midnight local, so day arithmetic never drifts across a DST boundary. */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameCivilDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * The civil day whose Hebrew date is the one in force right now.
 *
 * After tzeis the Hebrew date belongs to the next civil day, so that is the
 * cell the grid should highlight — otherwise the calendar would disagree with
 * the date shown everywhere else in the app all evening.
 */
export function effectiveToday(
  now: Date = new Date(),
  options?: HebrewDateOptions
): Date {
  const tzeis = options?.tzeis;
  const rolled =
    tzeis && now.getTime() >= tzeis.getTime()
      ? new Date(now.getTime() + DAY_MS)
      : now;
  return startOfDay(rolled);
}

function buildDay(
  date: Date,
  today: Date,
  inMonth: boolean,
  options: HebrewDateOptions
): CalendarDay {
  const calendar = new JewishCalendar(date);
  calendar.setInIsrael(options.inIsrael);

  const isRoshChodesh = safe(() => calendar.isRoshChodesh(), false);
  const isChanukah = safe(() => calendar.isChanukah(), false);
  const isCholHamoed = safe(() => calendar.isCholHamoed(), false);
  const isFastDay = safe(() => calendar.isTaanis(), false);
  const isPurim = safe(() => calendar.isPurim(), false);
  // isYomTov() is true for a lot more than Yom Tov — Purim, Chanukah, Tu B'Av,
  // Lag BaOmer, the erev days, Isru Chag. Colouring straight off it would paint
  // Tu B'Av the same as Pesach, so restrict to the days melacha is forbidden.
  const isYomTov =
    YOM_TOV_INDICES.has(safe(() => calendar.getYomTovIndex(), -1)) &&
    !isPurim &&
    !isChanukah &&
    !isRoshChodesh &&
    !isCholHamoed;

  const yomTov = safe(() => englishFormatter.formatYomTov(calendar), "");
  const yomTovHe = safe(() => hebrewFormatter.formatYomTov(calendar), "");
  const label = yomTov || (isRoshChodesh ? "Rosh Chodesh" : "");
  const labelHe = yomTovHe || (isRoshChodesh ? "ראש חודש" : "");

  const hebrewDay = calendar.getJewishDayOfMonth();

  return {
    date,
    civilDay: date.getDate(),
    inMonth,
    hebrewDay,
    hebrewDayHe: toHebrewNumeral(hebrewDay),
    hebrewMonthHe: safe(() => hebrewFormatter.formatMonth(calendar), ""),
    hebrewMonthEn: safe(() => englishFormatter.formatMonth(calendar), ""),
    isToday: sameCivilDay(date, today),
    isShabbos: calendar.getDayOfWeek() === 7,
    isYomTov,
    isCholHamoed,
    isRoshChodesh,
    isFastDay,
    isChanukah,
    label,
    labelHe,
    omerDay: safe(() => Math.max(0, calendar.getDayOfOmer()), 0),
    dayType: classify(calendar, {
      isPurim,
      isChanukah,
      isYomTov,
      isCholHamoed,
      isRoshChodesh,
      isFastDay,
    }),
  };
}

function classify(
  calendar: JewishCalendar,
  flags: {
    isPurim: boolean;
    isChanukah: boolean;
    isYomTov: boolean;
    isCholHamoed: boolean;
    isRoshChodesh: boolean;
    isFastDay: boolean;
  }
): DayType {
  if (calendar.getDayOfWeek() === 7) return "shabbos";
  if (flags.isPurim) return "purim";
  if (flags.isChanukah) return "chanukah";
  if (flags.isYomTov) return "yom_tov";
  if (flags.isCholHamoed) return "chol_hamoed";
  if (flags.isRoshChodesh) return "rosh_chodesh";
  if (flags.isFastDay) return "fast_day";
  return "weekday";
}

/**
 * Six weeks of cells covering the civil month containing `anchor`, padded to
 * whole weeks starting on Sunday. Always 42 cells so the grid does not change
 * height from month to month, which is visibly jarring when paging.
 */
export function getMonthGrid(
  anchor: Date,
  options: HebrewDateOptions,
  now: Date = new Date()
): CalendarDay[] {
  const today = effectiveToday(now, options);
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i
    );
    days.push(
      buildDay(date, today, date.getMonth() === anchor.getMonth(), options)
    );
  }
  return days;
}

/** Sunday through Shabbos of the week containing `anchor`. */
export function getWeekDays(
  anchor: Date,
  options: HebrewDateOptions,
  now: Date = new Date()
): CalendarDay[] {
  const today = effectiveToday(now, options);
  const start = new Date(
    anchor.getFullYear(),
    anchor.getMonth(),
    anchor.getDate() - anchor.getDay()
  );
  return Array.from({ length: 7 }, (_, i) =>
    buildDay(
      new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
      today,
      true,
      options
    )
  );
}

export interface AgendaEntry extends CalendarDay {
  /** Days from today; negative is in the past. */
  daysAway: number;
}

/**
 * Notable days only, forward from today — the list view.
 *
 * Keyed per day rather than per label so both days of a two-day Rosh Chodesh
 * survive, and so Chol HaMoed shows every day rather than collapsing to one.
 */
export function getAgenda(
  options: HebrewDateOptions,
  daysAhead = 180,
  now: Date = new Date()
): AgendaEntry[] {
  const today = effectiveToday(now, options);
  const out: AgendaEntry[] = [];

  for (let i = 0; i <= daysAhead; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );
    const day = buildDay(date, today, true, options);
    const notable =
      day.isYomTov ||
      day.isRoshChodesh ||
      day.isFastDay ||
      day.isCholHamoed ||
      day.dayType === "purim" ||
      (day.isChanukah && day.hebrewDay === 25) ||
      day.label !== "";
    if (notable) out.push({ ...day, daysAway: i });
  }
  return out;
}
