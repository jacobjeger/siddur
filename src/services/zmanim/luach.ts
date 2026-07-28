import type { ComplexZmanimCalendar } from "kosher-zmanim";
import type { AlosMethod, TzeisMethod } from "../../stores/useSettingsStore";

/**
 * A luach is a complete opinion set for calculating zmanim.
 *
 * This is a THIRD axis, independent of `nusach` (which text is shown) and
 * `minhag` (which customs apply). Nusach governs text, luach governs times, and
 * neither may auto-change the other — a Sephardi user can reasonably want any
 * luach, and an Ashkenazi user can want the Chabad one.
 *
 * kosher-zmanim 0.9.0 exposes 180 getters, including complete named shitos we
 * were not surfacing at all. Most luachos are therefore a recombination of
 * existing methods rather than new mathematics, and are expressed here as
 * presets.
 */
export type LuachId =
  | "standard"
  | "mga72"
  | "baal_hatanya"
  | "ateret_torah"
  | "rav_moshe"
  | "custom";

export interface LuachPreset {
  id: LuachId;
  name: string;
  description: string;
  /** null on "custom", where the user's own alos/tzeis pickers apply. */
  alos: AlosMethod | null;
  tzeis: TzeisMethod | null;
  /** Degrees below the horizon for misheyakir; null uses the library default. */
  misheyakirDegrees: number | null;
  useElevation: boolean;
  candleLightingOffset: number;
  /**
   * When set, the whole day is computed by dedicated library methods rather
   * than by composing alos/tzeis. Used by shitos that define their own shaah
   * zmanis basis — Baal HaTanya measures from netz amiti to shkiah amiti.
   */
  dedicated: "baal_hatanya" | "ateret_torah" | null;
}

export const LUACH_PRESETS: Record<LuachId, LuachPreset> = {
  standard: {
    id: "standard",
    name: "Standard (GRA)",
    description: "Sunrise to sunset, tzeis at 8.5°. The common default.",
    alos: "72min",
    tzeis: "8.5deg",
    misheyakirDegrees: 10.2,
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: null,
  },
  mga72: {
    id: "mga72",
    name: "Mishna Berura (MGA 72)",
    description: "Shaah zmanis from alos 72 min to tzeis 72 min.",
    alos: "72min",
    tzeis: "72min",
    misheyakirDegrees: 11.5,
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: null,
  },
  baal_hatanya: {
    id: "baal_hatanya",
    name: "Chabad (Baal HaTanya)",
    description:
      "Alos 16.9°, tzeis 6°, shaah zmanis measured from netz amiti to shkiah amiti.",
    alos: null,
    tzeis: null,
    misheyakirDegrees: 10.2,
    // Chabad's published times are sea-level; netz amiti is a degree-based
    // calculation, not an elevation adjustment.
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: "baal_hatanya",
  },
  ateret_torah: {
    id: "ateret_torah",
    name: "Ateret Torah",
    description:
      "Alos 72 zmanis, tzeis 40 minutes after sunset. Syrian / Sephardi-American.",
    alos: null,
    tzeis: null,
    misheyakirDegrees: 10.2,
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: "ateret_torah",
  },
  rav_moshe: {
    id: "rav_moshe",
    name: "Rav Moshe Feinstein",
    description: "Tzeis 50 minutes; mincha and plag from fixed local chatzos.",
    alos: "72min",
    tzeis: "50min",
    misheyakirDegrees: 11.5,
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: null,
  },
  custom: {
    id: "custom",
    name: "Custom",
    description: "Choose alos, tzeis and elevation individually.",
    alos: null,
    tzeis: null,
    misheyakirDegrees: null,
    useElevation: false,
    candleLightingOffset: 18,
    dedicated: null,
  },
};

export const LUACH_ORDER: LuachId[] = [
  "standard",
  "mga72",
  "baal_hatanya",
  "ateret_torah",
  "rav_moshe",
  "custom",
];

/**
 * Misheyakir was previously hardcoded to 10.2°. It is one of the most
 * luach-variable zmanim, so the preset owns it.
 */
export function getMisheyakir(
  calendar: ComplexZmanimCalendar,
  preset: LuachPreset
): unknown {
  switch (preset.misheyakirDegrees) {
    case 11.5:
      return calendar.getMisheyakir11Point5Degrees();
    case 11:
      return calendar.getMisheyakir11Degrees();
    case 10.2:
    default:
      return calendar.getMisheyakir10Point2Degrees();
  }
}
