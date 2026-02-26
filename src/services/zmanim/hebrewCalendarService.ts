import { JewishCalendar, HebrewDateFormatter } from "kosher-zmanim";
import type { ZmanimData } from "./types";

const hebrewFormatter = new HebrewDateFormatter();
hebrewFormatter.setHebrewFormat(true);

const englishFormatter = new HebrewDateFormatter();
englishFormatter.setHebrewFormat(false);

export interface HebrewDateInfo {
  hebrewDate: string;
  englishDate: string;
  parsha: string;
  specialDay: string;
  isShabbos: boolean;
  isYomTov: boolean;
  isFastDay: boolean;
  omerDay: number;
  dayType: DayType;
}

export type DayType =
  | "weekday"
  | "shabbos"
  | "yom_tov"
  | "rosh_chodesh"
  | "chol_hamoed"
  | "fast_day"
  | "chanukah"
  | "purim";

export type TefilaType = "shacharis" | "mincha" | "maariv" | "none";

export function getHebrewDateInfo(date: Date = new Date()): HebrewDateInfo {
  const calendar = new JewishCalendar(date);
  const dayOfWeek = calendar.getDayOfWeek();

  let parsha = "";
  try {
    parsha = englishFormatter.formatParsha(calendar) || "";
  } catch {
    parsha = "";
  }

  let specialDay = "";
  try {
    specialDay = englishFormatter.formatYomTov(calendar) || "";
  } catch {
    specialDay = "";
  }

  let omerDay = 0;
  try {
    omerDay = calendar.getDayOfOmer();
    if (omerDay < 0) omerDay = 0;
  } catch {
    omerDay = 0;
  }

  return {
    hebrewDate: hebrewFormatter.format(calendar),
    englishDate: englishFormatter.format(calendar),
    parsha,
    specialDay,
    isShabbos: dayOfWeek === 7,
    isYomTov: calendar.isYomTov(),
    isFastDay: calendar.isTaanis(),
    omerDay,
    dayType: getDayType(calendar),
  };
}

function getDayType(calendar: JewishCalendar): DayType {
  if (calendar.getDayOfWeek() === 7) return "shabbos";
  if (calendar.isYomTov()) return "yom_tov";
  if (calendar.isCholHamoed()) return "chol_hamoed";
  if (calendar.isRoshChodesh()) return "rosh_chodesh";
  if (calendar.isTaanis()) return "fast_day";
  if (calendar.isChanukah()) return "chanukah";

  const jewishMonth = calendar.getJewishMonth();
  const jewishDay = calendar.getJewishDayOfMonth();
  if (jewishMonth === 12 && jewishDay === 14) return "purim";
  if (jewishMonth === 12 && jewishDay === 15) return "purim";

  return "weekday";
}

export function getCurrentTefilaType(
  date: Date,
  zmanim: ZmanimData
): TefilaType {
  const now = date.getTime();

  const { alosHaShachar, sunrise, chatzos, sunset, tzeis } = zmanim;

  // Before alos — maariv or none
  if (alosHaShachar && now < alosHaShachar.getTime()) {
    return "none";
  }

  // Alos to chatzos — shacharis
  if (chatzos && now < chatzos.getTime()) {
    return "shacharis";
  }

  // Chatzos to sunset — mincha
  if (sunset && now < sunset.getTime()) {
    return "mincha";
  }

  // After sunset — maariv
  return "maariv";
}
