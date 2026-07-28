import { JewishCalendar, Parsha } from "kosher-zmanim";
import type { Nusach } from "../stores/useSettingsStore";
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
}

export function getShirShelYom(
  calendar: JewishCalendar,
  nusach: Nusach
): ShirShelYom {
  const dayOfWeek = calendar.getDayOfWeek();
  return {
    psalm: WEEKDAY_PSALM[dayOfWeek] ?? 0,
    includesPsalm95: dayOfWeek === 4 && nusach !== "edot_hamizrach",
    afterAleinu: nusach === "ashkenaz",
    addBarchiNafshi: safeBool(() => calendar.isRoshChodesh()),
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
export function getLdovid(calendar: JewishCalendar, nusach: Nusach): Ldovid {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();

  // Chabad begins on 30 Av, the first day of Rosh Chodesh Elul; everyone else
  // on 1 Elul.
  const startsOn30Av = nusach === "ari";
  const inElul = month === 6 || (startsOn30Av && month === 5 && day === 30);

  // Tishrei: through Hoshana Rabba (21) for Chabad, Shemini Atzeres (22) others.
  const tishreiEnd = startsOn30Av ? 21 : 22;
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

/** Needed when Yom Tov runs Thursday–Friday straight into Shabbos. */
export function isEruvTavshilin(calendar: JewishCalendar): boolean {
  // Erev Yom Tov falling on Wednesday means Yom Tov starts Wednesday night and
  // runs Thursday–Friday, so cooking for Shabbos needs an eruv.
  return safeBool(() => calendar.isErevYomTov()) && calendar.getDayOfWeek() === 4;
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

  // From the Shabbos after Pesach (23 Nissan onward) …
  const afterPesach = (month === 1 && day > 22) || (month >= 2 && month <= 6);
  if (!afterPesach) return { said: false, chapter: null };

  // … to Rosh Hashana, or to Shavuos for Edot HaMizrach.
  if (nusach === "edot_hamizrach" && (month > 3 || (month === 3 && day > 6))) {
    return { said: false, chapter: null };
  }

  const week = shabbosIndexSincePesach(calendar);
  return { said: true, chapter: (week % 6) + 1 };
}

function shabbosIndexSincePesach(calendar: JewishCalendar): number {
  const month = calendar.getJewishMonth();
  const day = calendar.getJewishDayOfMonth();
  // Approximate week count from 22 Nissan; exact enough to drive the cycle.
  const daysFromNissan22 =
    month === 1 ? day - 22 : (month - 1) * 29.5 + day - 22;
  return Math.max(0, Math.floor(daysFromNissan22 / 7));
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
    next.setJewishMonth(month === 12 ? 1 : month + 1);
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

  if (isShabbos && nusach !== "edot_hamizrach") return false;
  if (aseresYemeiTeshuva && !isYomKippur) return true;
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
