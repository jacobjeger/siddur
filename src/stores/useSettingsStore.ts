import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      textSize: 22,
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
    }
  )
);
