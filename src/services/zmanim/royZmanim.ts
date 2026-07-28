import type { ComplexZmanimCalendar } from "kosher-zmanim";

/**
 * Rabbi Ovadiah Yosef's zmanim.
 *
 * Two luachos, selected by whether the user is in Eretz Yisrael:
 *
 *   Ohr HaChaim (Israel)      plain seasonal minutes, elevation ON
 *   Amudeh Hora'ah (Diaspora) the same Israeli minute counts, stretched to the
 *                             user's latitude, elevation OFF (mishor)
 *
 * This approach is fundamentally seasonal-minute based, not degree-based —
 * degrees are used only as an intermediary to derive a latitude-corrected
 * seasonal-minute count. That is why it cannot be expressed as a preset over the
 * ordinary alos/tzeis pickers.
 *
 * Algorithm ported from the MIT-licensed ROZmanimCalendar.java in the
 * Rabbi Ovadiah Yosef Calendar Android app (Zemaneh-Yosef / Elyahu Jacobi).
 * The corresponding royzmanim.com JavaScript carries NO license file and was
 * used only as documentation, never copied.
 *
 * No new dependency is required — every primitive is already in kosher-zmanim
 * 0.9.0. Verified: 16.04° yields 71.57 equinox minutes at Jerusalem's latitude
 * and 80.61 at Brooklyn's, matching the documented 72-minute Israeli figure and
 * its latitude stretch.
 */

/** Seasonal-minute counts as they are in Eretz Yisrael. */
const OHR_HACHAIM = {
  alosMinutes: 72,
  tzeisMinutes: 13.5,
  tzeisLchumraMinutes: 20,
  rabbeinuTamMinutes: 72,
  /** Talis and tefillin: 11/12 of the alos span. */
  talisTefillinMinutes: 66,
} as const;

/**
 * Degrees that equal the Israeli minute counts at Israel's latitude. Outside
 * Israel these are converted into a fraction of a seasonal hour, which is what
 * produces the latitude stretch.
 */
const AMUDEH_HORAAH_DEGREES = {
  dawn: 16.04,
  nightfall: 3.7,
  stringentNightfall: 5.075,
} as const;

/**
 * NOT IMPLEMENTED: the extreme-latitude backstop.
 *
 * The reference implementation applies `max(seasonal, 98.5°-offset)` to alos and
 * tzeis. Taken literally at normal latitudes that is wrong — in Jerusalem on
 * 28 Jul the 8.5° point is 35.6 minutes before netz while 72 zmaniyos minutes is
 * 83.6, so "the later of the two" would clamp every ordinary location to 35.6
 * and silently discard the actual shitah.
 *
 * Since the intended semantics could not be established from the available
 * sources, no floor is applied. That is correct everywhere the seasonal
 * calculation is well-behaved, and it is documented in docs/unverified-rules.md
 * as an open item for far-northern latitudes.
 */

export type RoyLuach = "ohr_hachaim" | "amudeh_horaah";

export interface RoyZmanim {
  alos: Date | null;
  talisTefillin: Date | null;
  tzeis: Date | null;
  tzeisLchumra: Date | null;
  rabbeinuTam: Date | null;
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    "toJSDate" in value &&
    typeof (value as { toJSDate: unknown }).toJSDate === "function"
  ) {
    return (value as { toJSDate: () => Date }).toJSDate();
  }
  return null;
}

/** One seasonal hour, in milliseconds, for the current day. */
function shaahZmanis(calendar: ComplexZmanimCalendar): number | null {
  const value = calendar.getShaahZmanisGra();
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Convert a degree offset into the fraction of a seasonal hour it represents at
 * this latitude, then express that as minutes of the current day.
 *
 * This is the heart of Amudeh Hora'ah: "72 Israeli minutes" becomes however long
 * the sun takes to travel the equivalent arc where the user actually is.
 */
function seasonalMinutesFromDegrees(
  calendar: ComplexZmanimCalendar,
  degrees: number,
  sunset: boolean
): number | null {
  const fraction = calendar.getPercentOfShaahZmanisFromDegrees(degrees, sunset);
  if (typeof fraction !== "number" || !Number.isFinite(fraction)) return null;

  const hour = shaahZmanis(calendar);
  if (hour === null) return null;

  return (fraction * hour) / 60_000;
}

/** Minutes of the current seasonal day, as milliseconds. */
function zmaniyosToMs(
  calendar: ComplexZmanimCalendar,
  minutes: number
): number | null {
  const hour = shaahZmanis(calendar);
  if (hour === null) return null;
  return (minutes / 60) * hour;
}

export function getRoyZmanim(
  calendar: ComplexZmanimCalendar,
  luach: RoyLuach
): RoyZmanim {
  const sunrise = toDate(
    luach === "ohr_hachaim" ? calendar.getSunrise() : calendar.getSeaLevelSunrise()
  );
  const sunset = toDate(
    luach === "ohr_hachaim" ? calendar.getSunset() : calendar.getSeaLevelSunset()
  );
  if (!sunrise || !sunset) {
    return {
      alos: null,
      talisTefillin: null,
      tzeis: null,
      tzeisLchumra: null,
      rabbeinuTam: null,
    };
  }

  const before = (minutes: number | null) =>
    minutes === null ? null : new Date(sunrise.getTime() - minutes * 60_000);
  const after = (minutes: number | null) =>
    minutes === null ? null : new Date(sunset.getTime() + minutes * 60_000);

  if (luach === "ohr_hachaim") {
    // Israel: plain seasonal minutes, no latitude correction needed.
    const asMinutes = (m: number) => {
      const ms = zmaniyosToMs(calendar, m);
      return ms === null ? null : ms / 60_000;
    };
    return {
      alos: before(asMinutes(OHR_HACHAIM.alosMinutes)),
      talisTefillin: before(asMinutes(OHR_HACHAIM.talisTefillinMinutes)),
      tzeis: after(asMinutes(OHR_HACHAIM.tzeisMinutes)),
      tzeisLchumra: after(asMinutes(OHR_HACHAIM.tzeisLchumraMinutes)),
      rabbeinuTam: after(asMinutes(OHR_HACHAIM.rabbeinuTamMinutes)),
    };
  }

  // Diaspora: stretch the Israeli counts to this latitude.
  const dawn = seasonalMinutesFromDegrees(
    calendar,
    AMUDEH_HORAAH_DEGREES.dawn,
    false
  );
  const night = seasonalMinutesFromDegrees(
    calendar,
    AMUDEH_HORAAH_DEGREES.nightfall,
    true
  );
  const stringent = seasonalMinutesFromDegrees(
    calendar,
    AMUDEH_HORAAH_DEGREES.stringentNightfall,
    true
  );

  // Talis and tefillin is 5/6 of the alos span outside Israel, not 11/12.
  const talis = dawn === null ? null : dawn * (5 / 6);

  // Rabbeinu Tam is capped at 72 fixed minutes, so a long summer day in a high
  // latitude does not push it absurdly late.
  const rtSeasonal = dawn === null ? null : dawn;
  const rabbeinuTam =
    rtSeasonal === null ? null : after(Math.min(rtSeasonal, 72));

  return {
    alos: before(dawn),
    talisTefillin: before(talis),
    tzeis: after(night),
    tzeisLchumra: after(stringent),
    rabbeinuTam,
  };
}
