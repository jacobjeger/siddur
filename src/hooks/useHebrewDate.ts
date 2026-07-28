import { useMemo } from "react";
import {
  getHebrewDateInfo,
  getCurrentTefilaType,
  type HebrewDateInfo,
  type HebrewDateOptions,
  type TefilaType,
} from "../services/zmanim/hebrewCalendarService";
import { getInsertionContext } from "../utils/jewishCalendar";
import { getDayDaveningInfo, type DayDaveningInfo } from "../utils/dayDavening";
import { useZmanim } from "./useZmanim";
import { useLocationStore } from "../stores/useLocationStore";
import { useSettingsStore } from "../stores/useSettingsStore";
import { resolveInIsrael } from "../utils/geoRegion";

export interface UseHebrewDateResult extends HebrewDateInfo {
  tefilaType: TefilaType;
  dayDavening: DayDaveningInfo;
  /** The options used to derive the above, for callers needing the same basis. */
  options: HebrewDateOptions;
}

export function useHebrewDate(date?: Date): UseHebrewDateResult {
  const { zmanim } = useZmanim(date);
  const location = useLocationStore((s) => s.location);
  const inIsraelSetting = useSettingsStore((s) => s.inIsrael);

  return useMemo(() => {
    const now = date ?? new Date();
    const options: HebrewDateOptions = {
      inIsrael: resolveInIsrael(inIsraelSetting, location),
      // Passing tzeis is what makes the Hebrew date roll at nightfall rather
      // than at civil midnight.
      tzeis: zmanim?.tzeis ?? null,
    };

    const dateInfo = getHebrewDateInfo(now, options);
    const context = getInsertionContext(now, {
      ...options,
      sunset: zmanim?.sunset ?? null,
    });

    return {
      ...dateInfo,
      tefilaType: zmanim ? getCurrentTefilaType(now, zmanim) : "shacharis",
      dayDavening: getDayDaveningInfo(context, now, options),
      options,
    };
    // `zmanim` already re-derives at midnight and on every relevant settings
    // change, so it is a sufficient trigger for recomputing the Hebrew date.
  }, [zmanim, location, inIsraelSetting, date]);
}
