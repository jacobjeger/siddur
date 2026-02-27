import { JewishCalendar } from "kosher-zmanim";
import type { InsertionContext } from "../data/types";

/**
 * Build an InsertionContext from a JewishCalendar instance.
 * This determines which conditional insertions should be active for the given date.
 */
export function getInsertionContext(
  date: Date = new Date()
): InsertionContext {
  const calendar = new JewishCalendar(date);

  const jewishMonth = calendar.getJewishMonth();
  const jewishDay = calendar.getJewishDayOfMonth();
  const dayOfWeek = calendar.getDayOfWeek();

  // Season: winter = Shemini Atzeres (22 Tishrei) through Pesach (15 Nissan)
  // Mashiv HaRuach: from Musaf of Shemini Atzeres through Musaf of 1st day Pesach
  // V'Sein Tal U'Matar: from 7 Cheshvan (Israel) / Dec 4-5 (Diaspora) through Pesach
  const isWinterSeason = getIsWinterSeason(jewishMonth, jewishDay);

  // Rosh Chodesh
  const isRoshChodesh = calendar.isRoshChodesh();

  // Chol HaMoed
  const isCholHamoed = calendar.isCholHamoed();

  // Fast day
  const isFastDay = calendar.isTaanis();

  // Motzaei Shabbos (Saturday night = Sunday in Jewish calendar after nightfall)
  // dayOfWeek: 1=Sun, 7=Shabbos. Motzaei Shabbos is Saturday night.
  // After nightfall on Shabbos, the calendar already shows Sunday (day 1),
  // but we check if it's Saturday evening context.
  const isMotzaeiShabbos = dayOfWeek === 1;

  // Aseres Yemei Teshuva: 1-10 Tishrei
  const isAseresYemeiTeshuva = jewishMonth === 7 && jewishDay >= 1 && jewishDay <= 10;

  // Holiday detection
  let holiday: InsertionContext["holiday"] = undefined;
  if (calendar.isChanukah()) {
    holiday = "chanukah";
  } else if (jewishMonth === 12 && (jewishDay === 14 || jewishDay === 15)) {
    holiday = "purim";
  } else if (isFastDay && jewishMonth === 5 && jewishDay === 9) {
    holiday = "tishaBAv";
  } else if (isFastDay) {
    holiday = "fastDay";
  }

  return {
    season: isWinterSeason ? "winter" : "summer",
    isRoshChodesh,
    isCholHamoed,
    holiday,
    isFastDay,
    isMotzaeiShabbos,
    isAseresYemeiTeshuva,
  };
}

/**
 * Determine if we're in the "winter" season for prayer insertions.
 * Winter = roughly from after Sukkos through Pesach.
 * For Mashiv HaRuach: Shemini Atzeres (22 Tishrei) through 1st day Pesach (15 Nissan).
 */
function getIsWinterSeason(month: number, day: number): boolean {
  // Jewish months: 7=Tishrei, 8=Cheshvan, ..., 1=Nissan
  // Winter: from 22 Tishrei through 14 Nissan
  if (month === 7 && day >= 22) return true; // Late Tishrei
  if (month >= 8 && month <= 13) return true; // Cheshvan through Adar (13 for Adar II)
  if (month === 1 && day < 15) return true; // Early Nissan before Pesach
  return false;
}

/**
 * Get the day of the week (0=Sunday, 6=Shabbos) for Shir Shel Yom selection.
 */
export function getDayOfWeekIndex(date: Date = new Date()): number {
  return date.getDay(); // 0=Sunday, 6=Saturday
}
