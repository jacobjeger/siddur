import { useState, useEffect } from "react";
import {
  getHebrewDateInfo,
  getCurrentTefilaType,
  type HebrewDateInfo,
  type TefilaType,
} from "../services/zmanim/hebrewCalendarService";
import { useZmanim } from "./useZmanim";

interface UseHebrewDateResult extends HebrewDateInfo {
  tefilaType: TefilaType;
}

const DEFAULT_RESULT: UseHebrewDateResult = {
  hebrewDate: "",
  englishDate: "",
  parsha: "",
  specialDay: "",
  isShabbos: false,
  isYomTov: false,
  isFastDay: false,
  omerDay: 0,
  dayType: "weekday",
  tefilaType: "shacharis",
};

export function useHebrewDate(): UseHebrewDateResult {
  const [result, setResult] = useState<UseHebrewDateResult>(DEFAULT_RESULT);
  const { zmanim } = useZmanim();

  useEffect(() => {
    try {
      const now = new Date();
      const dateInfo = getHebrewDateInfo(now);
      const tefilaType = zmanim
        ? getCurrentTefilaType(now, zmanim)
        : "shacharis";

      setResult({ ...dateInfo, tefilaType });
    } catch (err) {
      console.warn("Hebrew date error:", err);
    }
  }, [zmanim]);

  return result;
}
