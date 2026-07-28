import {
  ComplexZmanimCalendar,
  GeoLocation,
  JewishCalendar,
} from "kosher-zmanim";
import { DateTime } from "luxon";
import type { UserLocation } from "../location/types";
import type {
  AlosMethod,
  HavdalaMethod,
  TzeisMethod,
} from "../../stores/useSettingsStore";
import type { ZmanimData } from "./types";

export interface ZmanimOptions {
  /** Minutes before shkia for candle lighting. */
  candleLightingOffset: number;
  havdalaMethod: HavdalaMethod;
  inIsrael: boolean;
  alosMethod: AlosMethod;
  tzeisMethod: TzeisMethod;
  /**
   * Whether sunrise/sunset (and therefore every derived zman) account for the
   * observer's elevation.
   *
   * This must be applied consistently. `getSunrise()` is elevation-adjusted
   * unconditionally, while derived zmanim go through the library's
   * `getElevationAdjustedSunrise()`, which returns SEA LEVEL when the flag is
   * off. Leaving the flag unset while passing a real altitude therefore
   * displayed one sunrise and computed sof zman shma from another — 4.5 minutes
   * apart in Jerusalem.
   *
   * Defaults off, which matches the previous behaviour of every derived zman.
   * It is a genuine luach axis (Ohr HaChaim uses elevation).
   */
  useElevation: boolean;
}

export const DEFAULT_ZMANIM_OPTIONS: ZmanimOptions = {
  candleLightingOffset: 18,
  havdalaMethod: "8.5deg",
  inIsrael: false,
  alosMethod: "72min",
  tzeisMethod: "8.5deg",
  useElevation: false,
};

/**
 * Mirrors the library's protected `getElevationAdjustedSunrise/Sunset` so the
 * displayed netz/shkia use the same basis as everything derived from them.
 */
function adjustedSunrise(
  calendar: ComplexZmanimCalendar,
  useElevation: boolean
): unknown {
  return useElevation ? calendar.getSunrise() : calendar.getSeaLevelSunrise();
}

function adjustedSunset(
  calendar: ComplexZmanimCalendar,
  useElevation: boolean
): unknown {
  return useElevation ? calendar.getSunset() : calendar.getSeaLevelSunset();
}

function getAlos(
  calendar: ComplexZmanimCalendar,
  method: AlosMethod
): unknown {
  switch (method) {
    case "16.1deg":
      return calendar.getAlos16Point1Degrees();
    case "18deg":
      return calendar.getAlos18Degrees();
    case "19.8deg":
      return calendar.getAlos19Point8Degrees();
    case "90min":
      return calendar.getAlos90();
    case "72min":
    default:
      return calendar.getAlos72();
  }
}

function getTzeis(
  calendar: ComplexZmanimCalendar,
  method: TzeisMethod
): unknown {
  switch (method) {
    case "16.1deg":
      return calendar.getTzais16Point1Degrees();
    case "18deg":
      return calendar.getTzais18Degrees();
    case "50min":
      return calendar.getTzais50();
    case "72min":
      return calendar.getTzais72();
    case "8.5deg":
    default:
      return calendar.getTzaisGeonim8Point5Degrees();
  }
}

/**
 * kosher-zmanim returns Luxon DateTime objects; unwrap to JS Date.
 */
function toJSDate(dateTime: unknown): Date | null {
  if (!dateTime) return null;
  try {
    if (
      typeof dateTime === "object" &&
      dateTime !== null &&
      "toJSDate" in dateTime &&
      typeof (dateTime as Record<string, unknown>).toJSDate === "function"
    ) {
      return (dateTime as { toJSDate: () => Date }).toJSDate();
    }
    if (dateTime instanceof Date) return dateTime;
    return null;
  } catch {
    return null;
  }
}

/**
 * `getMinchaKetana()` and `getPlagHamincha()` accept zero arguments at runtime
 * (they fall back to elevation-adjusted sunrise/sunset when both are
 * `undefined`), but kosher-zmanim's .d.ts only declares the 3-arg overload.
 * Passing `null` explicitly would NOT be equivalent — the runtime checks for
 * `undefined` — so the cast is load-bearing, not cosmetic.
 */
interface NoArgZmanim {
  getMinchaKetana(): unknown;
  getPlagHamincha(): unknown;
}

export function getZmanimForDate(
  location: UserLocation,
  date: Date = new Date(),
  options: ZmanimOptions = DEFAULT_ZMANIM_OPTIONS
): ZmanimData {
  // GeoLocation.setElevation() throws on a negative value, and GPS routinely
  // reports negative altitude from ordinary noise. An unclamped value here
  // used to throw, get swallowed upstream, and leave the screen spinning.
  const elevation = Math.max(0, location.altitude ?? 0);

  const geoLocation = new GeoLocation(
    location.name,
    location.latitude,
    location.longitude,
    elevation,
    location.timezone
  );

  const calendar = new ComplexZmanimCalendar(geoLocation);
  calendar.setDate(DateTime.fromJSDate(date).setZone(location.timezone));
  calendar.setCandleLightingOffset(options.candleLightingOffset);
  calendar.setUseElevation(options.useElevation);

  const noArg = calendar as unknown as NoArgZmanim;

  const jewishCalendar = new JewishCalendar(date);
  jewishCalendar.setInIsrael(options.inIsrael);

  const sunset = toJSDate(adjustedSunset(calendar, options.useElevation));

  return {
    alosHaShachar: toJSDate(getAlos(calendar, options.alosMethod)),
    misheyakir: toJSDate(calendar.getMisheyakir10Point2Degrees()),
    sunrise: toJSDate(adjustedSunrise(calendar, options.useElevation)),
    sofZmanShmaMGA: toJSDate(calendar.getSofZmanShmaMGA()),
    sofZmanShmaGRA: toJSDate(calendar.getSofZmanShmaGRA()),
    sofZmanTefilaMGA: toJSDate(calendar.getSofZmanTfilaMGA()),
    sofZmanTefilaGRA: toJSDate(calendar.getSofZmanTfilaGRA()),
    chatzos: toJSDate(calendar.getChatzos()),
    minchaGedola: toJSDate(calendar.getMinchaGedola()),
    minchaKetana: toJSDate(noArg.getMinchaKetana()),
    plagHaMincha: toJSDate(noArg.getPlagHamincha()),
    // Only meaningful on erev Shabbos / erev Yom Tov — previously emitted
    // unconditionally, so "Candle Lighting" showed up on a random Tuesday.
    candleLighting: jewishCalendar.hasCandleLighting()
      ? toJSDate(calendar.getCandleLighting())
      : null,
    sunset,
    tzeis: toJSDate(getTzeis(calendar, options.tzeisMethod)),
    tzeis72: toJSDate(calendar.getTzais72()),
    havdala: getHavdala(calendar, jewishCalendar, sunset, options.havdalaMethod),
    chatzosLayla: toJSDate(calendar.getSolarMidnight()),
  };
}

/**
 * Havdala is only shown when Shabbos/Yom Tov actually ends today — i.e. today
 * is assur bemelacha and tomorrow is not.
 */
function getHavdala(
  calendar: ComplexZmanimCalendar,
  jewishCalendar: JewishCalendar,
  sunset: Date | null,
  method: HavdalaMethod
): Date | null {
  if (!jewishCalendar.isAssurBemelacha()) return null;

  switch (method) {
    case "72min":
      return sunset ? new Date(sunset.getTime() + 72 * 60_000) : null;
    case "42min":
      return sunset ? new Date(sunset.getTime() + 42 * 60_000) : null;
    case "8.5deg":
    default:
      return toJSDate(calendar.getTzaisGeonim8Point5Degrees());
  }
}
