import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * The liturgy scale, in dp. Independent of the UI scale in tokens.ts — this is
 * the only thing the user's text-size control changes.
 *
 * Narrowed from 16-32 (default 22). At 22 with the old `lineHeight: textSize *
 * 2` the reader showed four to six lines on a 502dp screen; the ratios in
 * SectionBody are what make the new default readable at a smaller number.
 */
export const READER_MIN = 15;
export const READER_MAX = 26;
export const READER_DEFAULT = 19;

export function clampReader(value: number): number {
  return Math.min(READER_MAX, Math.max(READER_MIN, Math.round(value)));
}

export type Nusach = "ashkenaz" | "sefard" | "edot_hamizrach" | "ari";

/**
 * Minhag is a THIRD axis, independent of both nusach (which text) and luach
 * (which times). A user can be Ashkenaz nusach following the Gra's minhagim on
 * a standard luach, and all three combinations occur in practice.
 *
 * "gra" is the Vilna Gaon's practice, widely followed by Ashkenazim in Eretz
 * Yisrael and especially in Yerushalayim.
 */
export type Minhag = "standard" | "gra";

/**
 * Which luach (opinion set) drives zmanim. Independent of nusach and minhag —
 * see src/services/zmanim/luach.ts.
 */
export type LuachId =
  | "standard"
  | "mga72"
  | "baal_hatanya"
  | "ateret_torah"
  | "rav_moshe"
  | "roy"
  | "custom";
export type DarkMode = "on" | "off" | "system";
export type TimeFormat = "12h" | "24h";
export type HavdalaMethod = "72min" | "42min" | "8.5deg";
export type AlosMethod = "72min" | "16.1deg" | "18deg" | "19.8deg" | "90min";
export type TzeisMethod = "8.5deg" | "16.1deg" | "18deg" | "50min" | "72min";

interface SettingsState {
  nusach: Nusach;
  minhag: Minhag;
  luachId: LuachId;
  textSize: number;
  showEnglish: boolean;
  darkMode: DarkMode;
  locationMode: "auto" | "manual";
  manualLocation: { lat: number; lng: number; name: string } | null;
  candleLightingOffset: number;
  havdalaMethod: HavdalaMethod;
  keepScreenOn: boolean;
  timeFormat: TimeFormat;
  /**
   * null = auto-detect from the resolved location's coordinates.
   * Affects second-day Yom Tov, parsha, and the V'Sein Tal U'Matar start date.
   */
  inIsrael: boolean | null;
  /** Which opinion to use for alos and tzeis; these were hardcoded before. */
  alosMethod: AlosMethod;
  tzeisMethod: TzeisMethod;
  /**
   * Factor the observer's elevation into sunrise/sunset and everything derived
   * from them. Applied consistently — see ZmanimOptions.useElevation.
   */
  useElevation: boolean;

  setNusach: (nusach: Nusach) => void;
  setMinhag: (minhag: Minhag) => void;
  setLuachId: (luachId: LuachId) => void;
  setTextSize: (size: number) => void;
  setShowEnglish: (show: boolean) => void;
  setDarkMode: (mode: DarkMode) => void;
  setLocationMode: (mode: "auto" | "manual") => void;
  setManualLocation: (
    loc: { lat: number; lng: number; name: string } | null
  ) => void;
  setCandleLightingOffset: (offset: number) => void;
  setHavdalaMethod: (method: HavdalaMethod) => void;
  setKeepScreenOn: (keep: boolean) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setInIsrael: (inIsrael: boolean | null) => void;
  setAlosMethod: (method: AlosMethod) => void;
  setTzeisMethod: (method: TzeisMethod) => void;
  setUseElevation: (use: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      nusach: "ashkenaz",
      minhag: "standard",
      luachId: "standard",
      textSize: READER_DEFAULT,
      showEnglish: false,
      darkMode: "off",
      locationMode: "auto",
      manualLocation: null,
      candleLightingOffset: 18,
      havdalaMethod: "8.5deg",
      keepScreenOn: true,
      timeFormat: "12h",
      inIsrael: null,
      alosMethod: "72min",
      tzeisMethod: "8.5deg",
      useElevation: false,

      setNusach: (nusach) => set({ nusach }),
      setMinhag: (minhag) => set({ minhag }),
      setLuachId: (luachId) => set({ luachId }),
      setTextSize: (textSize) => set({ textSize }),
      setShowEnglish: (showEnglish) => set({ showEnglish }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setLocationMode: (locationMode) => set({ locationMode }),
      setManualLocation: (manualLocation) => set({ manualLocation }),
      setCandleLightingOffset: (candleLightingOffset) =>
        set({ candleLightingOffset }),
      setHavdalaMethod: (havdalaMethod) => set({ havdalaMethod }),
      setKeepScreenOn: (keepScreenOn) => set({ keepScreenOn }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      setInIsrael: (inIsrael) => set({ inIsrael }),
      setAlosMethod: (alosMethod) => set({ alosMethod }),
      setTzeisMethod: (tzeisMethod) => set({ tzeisMethod }),
      setUseElevation: (useElevation) => set({ useElevation }),
    }),
    {
      name: "siddur-settings",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      /**
       * The reader scale moved from 16-32 (default 22) to 15-26 (default 19).
       * Clamp rather than reset: a user who had deliberately chosen 30 should
       * land on the new maximum, not silently back at the default.
       */
      migrate: (persisted, version) => {
        const state = persisted as { textSize?: number } | undefined;
        if (state && version < 1 && typeof state.textSize === "number") {
          state.textSize = clampReader(state.textSize);
        }
        return state as never;
      },
    }
  )
);
