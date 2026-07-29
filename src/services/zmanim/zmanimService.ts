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
import { LUACH_PRESETS, getMisheyakir, type LuachPreset } from "./luach";
import { getRoyZmanim } from "./royZmanim";

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
  /**
   * Complete opinion set. When the preset names a `dedicated` shitah, the whole
   * day comes from that shitah's own methods rather than from alos/tzeis above,
   * because it defines its own shaah zmanis basis.
   */
  luach: LuachPreset;
}

export const DEFAULT_ZMANIM_OPTIONS: ZmanimOptions = {
  candleLightingOffset: 18,
  havdalaMethod: "8.5deg",
  inIsrael: false,
  alosMethod: "72min",
  tzeisMethod: "8.5deg",
  useElevation: false,
  luach: LUACH_PRESETS.standard,
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
  getMinchaGedolaAteretTorah(): unknown;
  getMinchaKetanaAteretTorah(): unknown;
  getPlagHaminchaAteretTorah(): unknown;
}

/** The set of getters a self-contained shitah supplies for the whole day. */
interface DedicatedShitah {
  alos(): unknown;
  sofZmanShma(): unknown;
  sofZmanTfila(): unknown;
  minchaGedola(): unknown;
  minchaKetana(): unknown;
  plag(): unknown;
  tzeis(): unknown;
}

/**
 * Some shitos define their own shaah zmanis basis and so cannot be expressed by
 * composing an alos and a tzeis. Baal HaTanya measures the day from netz amiti
 * (1.583°) to shkiah amiti; Ateret Torah from alos 72 zmanis to 40 minutes
 * after sunset. kosher-zmanim ships a complete method family for each.
 */
function getDedicatedShitah(
  calendar: ComplexZmanimCalendar,
  noArg: NoArgZmanim,
  preset: LuachPreset
): DedicatedShitah | null {
  switch (preset.dedicated) {
    case "baal_hatanya":
      return {
        alos: () => calendar.getAlosBaalHatanya(),
        sofZmanShma: () => calendar.getSofZmanShmaBaalHatanya(),
        sofZmanTfila: () => calendar.getSofZmanTfilaBaalHatanya(),
        minchaGedola: () => calendar.getMinchaGedolaBaalHatanya(),
        minchaKetana: () => calendar.getMinchaKetanaBaalHatanya(),
        plag: () => calendar.getPlagHaminchaBaalHatanya(),
        tzeis: () => calendar.getTzaisBaalHatanya(),
      };
    case "ateret_torah":
      return {
        alos: () => calendar.getAlos72Zmanis(),
        sofZmanShma: () => calendar.getSofZmanShmaAteretTorah(),
        sofZmanTfila: () => calendar.getSofZmanTfilaAteretTorah(),
        minchaGedola: () => noArg.getMinchaGedolaAteretTorah(),
        minchaKetana: () => noArg.getMinchaKetanaAteretTorah(),
        plag: () => noArg.getPlagHaminchaAteretTorah(),
        tzeis: () => calendar.getTzaisAteretTorah(),
      };
    case "mga72":
      // The Mishna Berura preset previously differed from Standard only in
      // misheyakir and tzeis: mincha and plag still came from the GRA day, so
      // the MGA shaah zmanis it is named for was never applied. Measured in
      // Brooklyn that put plag 57 minutes and mincha ketana 42 minutes off.
      return {
        alos: () => calendar.getAlos72(),
        sofZmanShma: () => calendar.getSofZmanShmaMGA(),
        sofZmanTfila: () => calendar.getSofZmanTfilaMGA(),
        minchaGedola: () => calendar.getMinchaGedola72Minutes(),
        minchaKetana: () => calendar.getMinchaKetana72Minutes(),
        plag: () => calendar.getPlagHamincha72Minutes(),
        tzeis: () => calendar.getTzais72(),
      };
    case "rav_moshe":
      // "Mincha and plag from fixed local chatzos" was in the description and
      // implemented nowhere — nothing read the preset, so it differed from
      // mga72 in tzeis alone.
      return {
        alos: () => calendar.getAlos72(),
        sofZmanShma: () => calendar.getSofZmanShmaGRASunriseToFixedLocalChatzos(),
        sofZmanTfila: () => calendar.getSofZmanTfilaGRASunriseToFixedLocalChatzos(),
        minchaGedola: () => calendar.getMinchaGedolaGRAFixedLocalChatzos30Minutes(),
        minchaKetana: () => calendar.getMinchaKetanaGRAFixedLocalChatzosToSunset(),
        plag: () => calendar.getPlagHaminchaGRAFixedLocalChatzosToSunset(),
        tzeis: () => calendar.getTzais50(),
      };
    default:
      return null;
  }
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

  const luach = options.luach ?? LUACH_PRESETS.standard;
  const shitah = getDedicatedShitah(calendar, noArg, luach);

  // Rabbi Ovadiah Yosef's luach is seasonal-minute based and supplies its own
  // alos/tzeis; it cannot be composed from the ordinary pickers.
  const roy =
    luach.dedicated === "roy"
      ? getRoyZmanim(calendar, options.inIsrael ? "ohr_hachaim" : "amudeh_horaah")
      : null;

  return {
    alosHaShachar:
      roy?.alos ??
      (shitah
        ? toJSDate(shitah.alos())
        : toJSDate(getAlos(calendar, options.alosMethod))),
    // ROY's talis/tefillin time is its misheyakir equivalent.
    misheyakir: roy?.talisTefillin ?? toJSDate(getMisheyakir(calendar, luach)),
    sunrise: toJSDate(adjustedSunrise(calendar, options.useElevation)),
    sofZmanShmaMGA: toJSDate(calendar.getSofZmanShmaMGA()),
    sofZmanShmaGRA: shitah
      ? toJSDate(shitah.sofZmanShma())
      : toJSDate(calendar.getSofZmanShmaGRA()),
    sofZmanTefilaMGA: toJSDate(calendar.getSofZmanTfilaMGA()),
    sofZmanTefilaGRA: shitah
      ? toJSDate(shitah.sofZmanTfila())
      : toJSDate(calendar.getSofZmanTfilaGRA()),
    chatzos: toJSDate(calendar.getChatzos()),
    minchaGedola: shitah
      ? toJSDate(shitah.minchaGedola())
      : toJSDate(calendar.getMinchaGedola()),
    minchaKetana: shitah
      ? toJSDate(shitah.minchaKetana())
      : toJSDate(noArg.getMinchaKetana()),
    plagHaMincha: shitah
      ? toJSDate(shitah.plag())
      : toJSDate(noArg.getPlagHamincha()),
    // Only meaningful on erev Shabbos / erev Yom Tov — previously emitted
    // unconditionally, so "Candle Lighting" showed up on a random Tuesday.
    candleLighting: jewishCalendar.hasCandleLighting()
      ? toJSDate(calendar.getCandleLighting())
      : null,
    sunset,
    tzeis:
      roy?.tzeis ??
      (shitah
        ? toJSDate(shitah.tzeis())
        : toJSDate(getTzeis(calendar, options.tzeisMethod))),
    tzeis72: roy?.rabbeinuTam ?? toJSDate(calendar.getTzais72()),
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
