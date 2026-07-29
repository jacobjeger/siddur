import { JewishCalendar, Parsha } from "kosher-zmanim";
import type { Minhag, Nusach } from "../stores/useSettingsStore";
import {
  getJewishCalendar,
  type HebrewDateOptions,
  DEFAULT_HEBREW_DATE_OPTIONS,
} from "../services/zmanim/hebrewCalendarService";

/**
 * Day-rules for tefillah: what is said today, and what is omitted.
 *
 * Rules return typed flags rather than display strings so the siddur assembler
 * can key off them directly. Each rule records which nuschaos it was sourced
 * for; anything not confidently established is listed in
 * docs/unverified-rules.md rather than guessed at here.
 */

export const ALL_NUSACHIM: Nusach[] = [
  "ashkenaz",
  "sefard",
  "edot_hamizrach",
  "ari",
];

// ---------------------------------------------------------------------------
// Shir Shel Yom
// ---------------------------------------------------------------------------

/**
 * Weekday psalms are nusach-invariant (Mishnah Tamid 7:4).
 * Index 1 = Sunday … 7 = Shabbos, matching JewishCalendar.getDayOfWeek().
 */
const WEEKDAY_PSALM: Record<number, number> = {
  1: 24,
  2: 48,
  3: 82,
  4: 94,
  5: 81,
  6: 93,
  7: 92,
};

export interface ShirShelYom {
  psalm: number;
  /**
   * Wednesday's psalm continues into Ps 95:1–3 in Ashkenaz, Sefard and Chabad,
   * but Edot HaMizrach stop at Ps 94:23. Attributed to the Arizal — not ending
   * on words of retribution.
   */
  includesPsalm95: boolean;
  /**
   * Ashkenaz says Shir Shel Yom AFTER Aleinu; Sefard, Edot HaMizrach and Chabad
   * say it before. Derived from the section order of each siddur.
   */
  afterAleinu: boolean;
  /** Barchi Nafshi (Ps 104) is added on Rosh Chodesh in the mainstream custom. */
  addBarchiNafshi: boolean;
  /**
   * True when a special-day psalm has REPLACED the weekday one, which is the
   * Gra's practice. In the mainstream custom the weekday psalm is always said
   * and Barchi Nafshi is merely added on Rosh Chodesh.
   */
  replacedWeekdayPsalm: boolean;
}

/**
 * The Gra's special-day psalms, which REPLACE the weekday psalm rather than
 * being added to it. Followed by many Ashkenazim in Eretz Yisrael, especially
 * in Yerushalayim.
 *
 * Not exhaustive — the multi-day cycles for Pesach and Succos are omitted
 * because the day-by-day assignment could not be confidently sourced. See
 * docs/unverified-rules.md.
 */
function getGraSpecialPsalm(calendar: JewishCalendar): number | null {
  // Precedence: Rosh Chodesh displaces Shabbos and Chanukah.
  if (safeBool(() => calendar.isRoshChodesh())) return 104; // Barchi Nafshi
  if (calendar.getDayOfWeek() === 7) return null; // Shabbos keeps Ps 92

  switch (calendar.getYomTovIndex()) {
    case JewishCalendar.ROSH_HASHANA:
      return 81;
    case JewishCalendar.YOM_KIPPUR:
      return 32;
    case JewishCalendar.SHEMINI_ATZERES:
      return 12;
    case JewishCalendar.SIMCHAS_TORAH:
      return 8;
    case JewishCalendar.PURIM:
      return 22;
    default:
      break;
  }

  if (safeBool(() => calendar.isChanukah())) return 30;
  return null;
}

export function getShirShelYom(
  calendar: JewishCalendar,
  nusach: Nusach,
  minhag: Minhag = "standard"
): ShirShelYom {
  const dayOfWeek = calendar.getDayOfWeek();
  const isRoshChodesh = safeBool(() => calendar.isRoshChodesh());

  const graPsalm = minhag === "gra" ? getGraSpecialPsalm(calendar) : null;
  const psalm = graPsalm ?? WEEKDAY_PSALM[dayOfWeek] ?? 0;

  return {
    psalm,
    // The Wednesday tail only applies when Wednesday's own psalm is being said.
    includesPsalm95:
      graPsalm === null && dayOfWeek === 4 && nusach !== "edot_hamizrach",
    afterAleinu: nusach === "ashkenaz",
    // The Gra never says two psalms, so Barchi Nafshi is a replacement there
    // rather than an addition.
    addBarchiNafshi: minhag === "gra" ? false : isRoshChodesh,
    replacedWeekdayPsalm: graPsalm !== null,
  };
}

// ---------------------------------------------------------------------------
// L'Dovid Hashem Ori (Psalm 27)
// ---------------------------------------------------------------------------

export type LdovidTefila = "shacharis" | "mincha" | "maariv";

export interface Ldovid {
  said: boolean;
  tefillos: LdovidTefila[];
}

/**
 * Said from Rosh Chodesh Elul. Chabad begins a day earlier, on 30 Av — the
 * first day of Rosh Chodesh Elul (Hayom Yom, 30 Menachem Av).
 *
 * The end date is a genuine three-way machlokes (Yom Kippur / Hoshana Rabba /
 * Shemini Atzeres). We use Shemini Atzeres for Ashkenaz and Sefard, and Hoshana
 * Rabba for Chabad per Siddur Admur HaZaken. Edot HaMizrach practice varies
 * widely and many do not say it at all — see docs/unverified-rules.md.
 */
export function getLdovid(
  calendar: JewishCalendar,
  nusach: Nusach,
  minhag: Minhag = "standard"
): Ldovid {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();

  // Chabad begins on 30 Av, the first day of Rosh Chodesh Elul; everyone else
  // on 1 Elul.
  const startsOn30Av = nusach === "ari";
  const inElul = month === 6 || (startsOn30Av && month === 5 && day === 30);

  // The end date is a genuine three-way machlokes. Chabad and the Eretz Yisrael
  // custom finish at Hoshana Rabba (21 Tishrei); Diaspora Ashkenaz continues
  // through Shemini Atzeres (22).
  const endsAtHoshanaRabba = startsOn30Av || minhag === "gra";
  const tishreiEnd = endsAtHoshanaRabba ? 21 : 22;
  const inTishrei = month === 7 && day <= tishreiEnd;

  const said = (inElul || inTishrei) && nusach !== "edot_hamizrach";

  const tefillos: LdovidTefila[] =
    nusach === "ashkenaz" ? ["shacharis", "maariv"] : ["shacharis", "mincha"];

  return { said, tefillos: said ? tefillos : [] };
}

// ---------------------------------------------------------------------------
// Yizkor
// ---------------------------------------------------------------------------

/**
 * Four times a year. The last day of Pesach and the second day of Shavuos
 * differ between Israel and the Diaspora, which falls out of the yom tov index
 * once setInIsrael has been applied.
 *
 * Sephardic practice around Yizkor vs Hashkava is NOT established — see
 * docs/unverified-rules.md.
 */
export function isYizkor(calendar: JewishCalendar): boolean {
  const index = calendar.getYomTovIndex();
  const day = calendar.getJewishDayOfMonth();
  const inIsrael = safeBool(() => calendar.getInIsrael());

  if (index === JewishCalendar.YOM_KIPPUR) return true;
  if (index === JewishCalendar.SHEMINI_ATZERES) return true;
  if (index === JewishCalendar.PESACH) return day === (inIsrael ? 21 : 22);
  if (index === JewishCalendar.SHAVUOS) return day === (inIsrael ? 6 : 7);
  return false;
}

// ---------------------------------------------------------------------------
// Tzidkascha Tzedek
// ---------------------------------------------------------------------------

export type TzidkaschaOrder = "ashkenaz" | "tehillim";

export interface Tzidkascha {
  said: boolean;
  /**
   * Ashkenaz reverses the verses (Ps 119:142, 71:19, 36:7); Sephardic and Ari
   * rites keep Tehillim order. Nusach Sefard siddurim print both.
   */
  order: TzidkaschaOrder;
  /** Edot HaMizrach say Yehi Shem Hashem Mevorach when Tzidkascha is omitted. */
  replacement: "yehi-shem" | null;
}

/**
 * Shabbos Mincha. Omitted whenever Tachanun would not be said on a weekday —
 * and additionally on all four of the Arba Parshiyos, a clause that is easy to
 * miss and appears identically in the Ashkenaz and Sefard siddurim.
 */
export function getTzidkascha(
  calendar: JewishCalendar,
  nusach: Nusach,
  sayTachanun: boolean
): Tzidkascha {
  const isShabbos = calendar.getDayOfWeek() === 7;
  const said = isShabbos && sayTachanun && !isArbaParshiyos(calendar);

  return {
    said,
    order: nusach === "ashkenaz" ? "ashkenaz" : "tehillim",
    replacement:
      !said && isShabbos && nusach === "edot_hamizrach" ? "yehi-shem" : null,
  };
}

// ---------------------------------------------------------------------------
// Special Shabbosos
// ---------------------------------------------------------------------------

export type SpecialShabbos =
  | "shkalim"
  | "zachor"
  | "parah"
  | "hachodesh"
  | "shuva"
  | "shira"
  | "hagadol"
  | "chazon"
  | "nachamu";

const PARSHA_TO_SPECIAL: Partial<Record<Parsha, SpecialShabbos>> = {
  [Parsha.SHKALIM]: "shkalim",
  [Parsha.ZACHOR]: "zachor",
  [Parsha.PARA]: "parah",
  [Parsha.HACHODESH]: "hachodesh",
  [Parsha.SHUVA]: "shuva",
  [Parsha.SHIRA]: "shira",
  [Parsha.HAGADOL]: "hagadol",
  [Parsha.CHAZON]: "chazon",
  [Parsha.NACHAMU]: "nachamu",
};

export function getSpecialShabbos(
  calendar: JewishCalendar
): SpecialShabbos | null {
  try {
    return PARSHA_TO_SPECIAL[calendar.getSpecialShabbos()] ?? null;
  } catch {
    return null;
  }
}

/** The four parshiyos, which suppress Tzidkascha. */
function isArbaParshiyos(calendar: JewishCalendar): boolean {
  const special = getSpecialShabbos(calendar);
  return (
    special === "shkalim" ||
    special === "zachor" ||
    special === "parah" ||
    special === "hachodesh"
  );
}

// ---------------------------------------------------------------------------
// Eruv Tavshilin / Bedikas Chometz
// ---------------------------------------------------------------------------

/** The days melacha is forbidden — a Yom Tov you cannot cook for Shabbos on. */
const MELACHA_YOM_TOV = new Set([
  JewishCalendar.PESACH,
  JewishCalendar.SHAVUOS,
  JewishCalendar.ROSH_HASHANA,
  JewishCalendar.YOM_KIPPUR,
  JewishCalendar.SUCCOS,
  JewishCalendar.SHEMINI_ATZERES,
  JewishCalendar.SIMCHAS_TORAH,
]);

/** Same calendar advanced `days` days, preserving the Israel setting. */
function addDays(calendar: JewishCalendar, days: number): JewishCalendar {
  const next = new JewishCalendar(
    new Date(
      calendar.getGregorianYear(),
      calendar.getGregorianMonth(),
      calendar.getGregorianDayOfMonth() + days
    )
  );
  next.setInIsrael(calendar.getInIsrael());
  return next;
}

/**
 * An eruv tavshilin is needed when the coming Yom Tov block runs INTO Friday,
 * so that Shabbos follows immediately and there is no weekday left to cook on.
 *
 * The previous rule was `isErevYomTov() && dayOfWeek === Wednesday`. That is
 * only the Diaspora Thursday–Friday case, and it was wrong three ways:
 *   - it fired on Erev Yom Kippur falling on Wednesday, where Yom Kippur is
 *     Thursday, Friday is chol and no eruv exists at all;
 *   - it missed every Thursday case — one-day Yom Tov on Friday, which is the
 *     normal Israel shape, and erev Shavuos or 20 Nissan falling on Thursday;
 *   - being day-of-week only, it produced ZERO divergence between Israel and
 *     the Diaspora, which cannot be right for a rule about a two-day Yom Tov.
 *
 * So walk the block instead: if tomorrow starts a run of melacha-forbidden days
 * whose last day is Friday, today is when the eruv is made.
 */
function safeNumber(fn: () => number, fallback: number): number {
  try {
    const value = fn();
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function isEruvTavshilin(calendar: JewishCalendar): boolean {
  const isYomTovDay = (day: JewishCalendar) =>
    MELACHA_YOM_TOV.has(safeNumber(() => day.getYomTovIndex(), -1));

  // Today must be a weekday that is not itself Yom Tov or Shabbos.
  if (calendar.getDayOfWeek() === 7 || isYomTovDay(calendar)) return false;
  if (!isYomTovDay(addDays(calendar, 1))) return false;

  // Walk the coming block and ask whether it CONTAINS a Friday. Requiring the
  // block to END on Friday was wrong: when Yom Tov falls on Friday and Shabbos
  // together, the eruv is exactly what permits cooking on the Friday Yom Tov
  // for Shabbos, and that case would have been missed.
  for (let offset = 1; offset <= 3; offset++) {
    const day = addDays(calendar, offset);
    if (!isYomTovDay(day)) break;
    if (day.getDayOfWeek() === 6) return true;
  }
  return false;
}

/**
 * The night of 14 Nissan — i.e. checked on 13 Nissan after nightfall. When
 * 14 Nissan is Shabbos the bedika moves back to Thursday night, 13 Nissan.
 */
export function isBedikasChometzNight(calendar: JewishCalendar): boolean {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();
  if (month !== 1) return false;

  // Normally the 13th; if the 14th falls on Shabbos, the 12th (Thursday night).
  if (day === 13) return calendar.getDayOfWeek() !== 6; // not when 14th is Shabbos
  if (day === 12) return calendar.getDayOfWeek() === 5; // Thursday, 14th is Shabbos
  return false;
}

// ---------------------------------------------------------------------------
// Pirkei Avos
// ---------------------------------------------------------------------------

export interface PirkeiAvos {
  said: boolean;
  /** 1–6, or null when not said. */
  chapter: number | null;
}

/**
 * Ashkenaz and Sefard: the Shabbosos between Pesach and Rosh Hashana, cycling
 * chapters 1–6 and repeating as needed. Sephardim conclude at Shavuos.
 *
 * The exact doubling convention when the season runs long is NOT established —
 * see docs/unverified-rules.md.
 */
export function getPirkeiAvos(
  calendar: JewishCalendar,
  nusach: Nusach
): PirkeiAvos {
  if (calendar.getDayOfWeek() !== 7) return { said: false, chapter: null };

  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();
  const inIsrael = safeBool(() => calendar.getInIsrael());

  // Pesach ends 21 Nissan in Israel, 22 in the Diaspora; the season starts on
  // the first Shabbos after that.
  const lastDayOfPesach = inIsrael ? 21 : 22;
  const afterPesach =
    (month === 1 && day > lastDayOfPesach) || (month >= 2 && month <= 6);
  if (!afterPesach) return { said: false, chapter: null };

  // … through Elul for Ashkenaz and Sefard; Sephardim conclude at Shavuos.
  if (nusach === "edot_hamizrach" && (month > 3 || (month === 3 && day > 6))) {
    return { said: false, chapter: null };
  }

  const week = shabbosIndexSincePesach(calendar, lastDayOfPesach);
  if (week === null) return { said: false, chapter: null };
  return { said: true, chapter: (week % 6) + 1 };
}

/**
 * How many Shabbosos have elapsed since the first one after Pesach (0-based).
 *
 * Counted from real day numbers via getAbsDate(). The previous implementation
 * approximated Jewish months as 29.5 days, which drifts half a day at every
 * month boundary and put Math.floor(days / 7) in the wrong bucket depending on
 * phase — chapters were repeated and skipped in roughly a quarter of years
 * (11 of 22 Shabbosos wrong in 2022 and 2029). It also began the count from
 * 22 Nissan rather than from the first Shabbos, so a year where Pesach ended on
 * Shabbos started the cycle at chapter 2.
 */
function shabbosIndexSincePesach(
  calendar: JewishCalendar,
  lastDayOfPesach: number
): number | null {
  try {
    const anchor = new JewishCalendar();
    anchor.setInIsrael(calendar.getInIsrael());
    anchor.setJewishDate(
      calendar.getJewishYear(),
      1,
      lastDayOfPesach
    );

    // Step to the first Shabbos strictly after the last day of Pesach.
    const daysToShabbos = 7 - anchor.getDayOfWeek();
    const firstShabbos = anchor.getAbsDate() + (daysToShabbos === 0 ? 7 : daysToShabbos);

    const weeks = (calendar.getAbsDate() - firstShabbos) / 7;
    if (!Number.isInteger(weeks) || weeks < 0) return null;
    return weeks;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Bircas HaChodesh
// ---------------------------------------------------------------------------

export interface BircasHaChodesh {
  said: boolean;
  /**
   * The molad of the month being announced — i.e. the NEXT month. Note
   * getMoladAsDate() returns the CURRENT month's molad, so the calendar has to
   * be advanced first.
   */
  molad: Date | null;
}


/**
 * The month that follows `month`, in kosher-zmanim's numbering where Nissan is
 * 1, Elul is 6, Tishrei is 7, Adar (or Adar I) is 12 and Adar II is 13.
 *
 * The year wraps after ELUL, not after month 12. Two separate wraps are needed:
 * Adar II (13) is followed by Nissan, and in a COMMON year Adar (12) is too.
 * Getting this wrong made Shabbos Mevorchim Adar II announce Nissan's molad
 * ~29 days late, and made Shabbos Mevorchim Nissan call setJewishMonth(14),
 * which throws, so the announcement carried no molad at all.
 */
function nextJewishMonth(month: number, isLeapYear: boolean): number {
  if (month === 13) return 1;
  if (month === 12) return isLeapYear ? 13 : 1;
  return month + 1;
}

export function getBircasHaChodesh(
  date: Date,
  options: HebrewDateOptions
): BircasHaChodesh {
  const calendar = getJewishCalendar(date, options);
  if (!safeBool(() => calendar.isShabbosMevorchim())) {
    return { said: false, molad: null };
  }

  try {
    const next = getJewishCalendar(date, options);
    const month = next.getJewishMonth();
    // The year wraps after ELUL (6), not after month 12. Treating 12 as the
    // last month is only right in a common year; in a leap year 12 is Adar I
    // and 13 is Adar II, so Shabbos Mevorchim Adar II announced Nissan's molad
    // (~29 days late) and Shabbos Mevorchim Nissan called setJewishMonth(14),
    // which throws and left the announcement with no molad at all.
    next.setJewishMonth(nextJewishMonth(month, next.isJewishLeapYear()));
    return { said: true, molad: next.getMoladAsDate().toJSDate() };
  } catch {
    return { said: true, molad: null };
  }
}

// ---------------------------------------------------------------------------
// Library-backed one-liners
// ---------------------------------------------------------------------------

export function isBaHab(calendar: JewishCalendar): boolean {
  return safeBool(() => calendar.isBeHaB());
}

export function isYomKippurKatan(calendar: JewishCalendar): boolean {
  return safeBool(() => calendar.isYomKippurKatan());
}

export function isMacharChodesh(calendar: JewishCalendar): boolean {
  return safeBool(() => calendar.isMacharChodesh());
}

export function isTaanisBechoros(calendar: JewishCalendar): boolean {
  return safeBool(() => calendar.isTaanisBechoros());
}

export function isIsruChag(calendar: JewishCalendar): boolean {
  return safeBool(() => calendar.isIsruChag());
}

// ---------------------------------------------------------------------------
// Avinu Malkeinu / Av HaRachamim
// ---------------------------------------------------------------------------

/**
 * Said throughout Aseres Yemei Teshuva in every rite, and on public fast days
 * in Ashkenazic practice. Not said on Shabbos in the Ashkenazic rite; Sephardic
 * practice on Shabbos and on fast days is disputed — see
 * docs/unverified-rules.md — so this only claims the well-sourced cases.
 */
export function isAvinuMalkeinu(
  calendar: JewishCalendar,
  nusach: Nusach
): boolean {
  const isShabbos = calendar.getDayOfWeek() === 7;
  const aseresYemeiTeshuva = safeBool(() => calendar.isAseresYemeiTeshuva());
  const isFast = safeBool(() => calendar.isTaanis());
  const isYomKippur = calendar.getYomTovIndex() === JewishCalendar.YOM_KIPPUR;

  // Yom Kippur first, and unconditionally. Deferring it to the fast-day
  // fallthrough meant Edot HaMizrach never got Avinu Malkeinu on Yom Kippur at
  // all, and when Yom Kippur fell on Shabbos the Shabbos guard suppressed it
  // for ALL FOUR nuschaos — losing it at Neilah, where it is universally said.
  // Verified: 2024, 2028 and 2031 were false for every nusach.
  if (isYomKippur) return true;

  if (isShabbos && nusach !== "edot_hamizrach") return false;
  if (aseresYemeiTeshuva) return true;
  // Eastern Ashkenazic rites add it on public fasts.
  return isFast && nusach !== "edot_hamizrach";
}

/**
 * Ashkenazic, said most Shabbosos after Krias HaTorah. Omitted on days without
 * Tachanun and on Shabbos Mevorchim. The Sefirah exception and the Sephardic
 * position are NOT established — see docs/unverified-rules.md.
 *
 * NOTE: this is `אב הרחמים שוכן מרומים`, the Shabbos memorial — NOT
 * `אב הרחמים היטיבה`, said when the ark is opened. Two different prayers.
 */
export function isAvHaRachamim(
  calendar: JewishCalendar,
  nusach: Nusach,
  sayTachanun: boolean
): boolean {
  if (calendar.getDayOfWeek() !== 7) return false;
  if (nusach === "edot_hamizrach") return false;
  if (!sayTachanun) return false;
  return !safeBool(() => calendar.isShabbosMevorchim());
}

// ---------------------------------------------------------------------------
// Hallel bracha on Rosh Chodesh
// ---------------------------------------------------------------------------

/**
 * Whether a bracha is said over the half-Hallel of Rosh Chodesh.
 *
 * Ashkenaz, Sefard and Chabad say it (Rema, following Rabbeinu Tam and the
 * Rosh). Sephardim following the Shulchan Aruch and Rav Ovadia say NO bracha —
 * not even with a minyan. (The individual-vs-minyan distinction sometimes cited
 * is the North African practice, not the general Sephardic one.)
 */
export function saysHallelBracha(nusach: Nusach): boolean {
  return nusach !== "edot_hamizrach";
}

function safeBool(fn: () => boolean): boolean {
  try {
    return fn();
  } catch {
    return false;
  }
}

export { DEFAULT_HEBREW_DATE_OPTIONS };
