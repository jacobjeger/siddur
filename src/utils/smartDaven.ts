import { JewishCalendar } from "kosher-zmanim";
import type { InsertionContext } from "../data/types";
import type { Nusach } from "../stores/useSettingsStore";
import { getServicePaths } from "../services/database/nusachPaths";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActiveInsertion {
  name: string;
  nameHe: string;
}

export interface DayDaveningInfo {
  /** Descriptive label for what's special today */
  specialDayLabel: string;
  specialDayLabelHe: string;
  /** Active insertions the user should be aware of */
  activeInsertions: ActiveInsertion[];
  /** Whether today is Shabbat */
  isShabbat: boolean;
  /** Whether today is Yom Tov (assur bemelacha) */
  isYomTov: boolean;
  /** Whether today is Rosh Chodesh */
  isRoshChodesh: boolean;
  /** Whether Hallel is said, and which type */
  hallelType: "full" | "half" | "none";
  /** Whether Tachanun is said */
  sayTachanun: boolean;
}

export interface SmartDavenFlow {
  /** Array of service keys to compose (in order) */
  serviceKeys: string[];
  /** Human-readable title for the composed flow */
  title: string;
  titleHe: string;
  /** Whether to use the multi-tefila daven screen */
  useMultiMode: boolean;
}

// ---------------------------------------------------------------------------
// getDayDaveningInfo — what's special today
// ---------------------------------------------------------------------------

export function getDayDaveningInfo(
  context: InsertionContext,
  date: Date = new Date()
): DayDaveningInfo {
  const calendar = new JewishCalendar(date);
  const dayOfWeek = calendar.getDayOfWeek(); // 7 = Shabbat

  const isShabbat = dayOfWeek === 7;
  const isYomTov = calendar.isYomTovAssurBemelacha();
  const isRoshChodesh = context.isRoshChodesh;

  // Build active insertions list
  const activeInsertions: ActiveInsertion[] = [];

  // Season-based
  if (context.season === "winter") {
    activeInsertions.push(
      { name: "Mashiv HaRuach", nameHe: "משיב הרוח" },
      { name: "V'ten Tal U'Matar", nameHe: "ותן טל ומטר" },
    );
  } else {
    activeInsertions.push(
      { name: "Morid HaTal", nameHe: "מוריד הטל" },
    );
  }

  // Rosh Chodesh / Chol HaMoed — Ya'aleh V'Yavo
  if (context.isRoshChodesh || context.isCholHamoed) {
    activeInsertions.push({ name: "Ya'aleh V'Yavo", nameHe: "יעלה ויבא" });
  }

  // Holiday-specific
  if (context.holiday === "chanukah") {
    activeInsertions.push({ name: "Al HaNissim", nameHe: "על הנסים" });
  }
  if (context.holiday === "purim") {
    activeInsertions.push({ name: "Al HaNissim", nameHe: "על הנסים" });
  }

  // Motzaei Shabbos
  if (context.isMotzaeiShabbos) {
    activeInsertions.push({ name: "Ata Chonantanu", nameHe: "אתה חוננתנו" });
  }

  // Fast day
  if (context.isFastDay) {
    activeInsertions.push({ name: "Aneinu", nameHe: "עננו" });
  }

  // Aseres Yemei Teshuva
  if (context.isAseresYemeiTeshuva) {
    activeInsertions.push(
      { name: "Zachreinu", nameHe: "זכרנו" },
      { name: "HaMelech HaKadosh", nameHe: "המלך הקדוש" },
    );
  }

  // Special day label
  let specialDayLabel = "";
  let specialDayLabelHe = "";
  if (isShabbat && isRoshChodesh) {
    specialDayLabel = "Shabbat Rosh Chodesh";
    specialDayLabelHe = "שבת ראש חודש";
  } else if (isShabbat) {
    specialDayLabel = "Shabbat";
    specialDayLabelHe = "שבת";
  } else if (context.holiday === "chanukah") {
    const day = calendar.getDayOfChanukah();
    specialDayLabel = `Chanukah — Day ${day}`;
    specialDayLabelHe = `חנוכה — יום ${day}`;
  } else if (context.holiday === "purim") {
    specialDayLabel = "Purim";
    specialDayLabelHe = "פורים";
  } else if (context.isAseresYemeiTeshuva) {
    specialDayLabel = "Aseres Yemei Teshuva";
    specialDayLabelHe = "עשרת ימי תשובה";
  } else if (isRoshChodesh) {
    specialDayLabel = "Rosh Chodesh";
    specialDayLabelHe = "ראש חודש";
  } else if (context.isCholHamoed) {
    specialDayLabel = "Chol HaMoed";
    specialDayLabelHe = "חול המועד";
  } else if (context.isFastDay) {
    specialDayLabel = "Fast Day";
    specialDayLabelHe = "יום צום";
  }

  // Hallel
  let hallelType: "full" | "half" | "none" = "none";
  if (context.holiday === "chanukah") {
    hallelType = "full";
  } else if (isRoshChodesh) {
    hallelType = "half";
  } else if (context.isCholHamoed) {
    hallelType = "half"; // Sukkos Chol HaMoed is actually full — simplified
  }

  // Tachanun
  let sayTachanun = true;
  if (isRoshChodesh) sayTachanun = false;
  if (context.isCholHamoed) sayTachanun = false;
  if (context.holiday === "chanukah") sayTachanun = false;
  if (context.holiday === "purim") sayTachanun = false;
  if (isShabbat) sayTachanun = false;
  if (isYomTov) sayTachanun = false;

  return {
    specialDayLabel,
    specialDayLabelHe,
    activeInsertions,
    isShabbat,
    isYomTov,
    isRoshChodesh,
    hallelType,
    sayTachanun,
  };
}

// ---------------------------------------------------------------------------
// getSmartDavenFlow — compose the right service chain
// ---------------------------------------------------------------------------

/**
 * Given the current day info and time-of-day service,
 * compose the right list of DB services to load for davening.
 *
 * E.g., on Rosh Chodesh Shacharis → [shacharis, roshChodesh]
 * On Shabbat morning → [shabbosShacharit, shabbosMusaf]
 * On Chanukah Shacharis → [shacharis, chanukah]
 */
export function getSmartDavenFlow(
  nusach: Nusach,
  timeService: "shacharis" | "mincha" | "maariv",
  dayInfo: DayDaveningInfo
): SmartDavenFlow {
  const keys: string[] = [];

  // --- Base service (Shabbat vs weekday) ---
  if (dayInfo.isShabbat) {
    switch (timeService) {
      case "shacharis":
        keys.push("shabbosShacharit");
        // Add Musaf
        if (hasService(nusach, "shabbosMusaf")) {
          keys.push("shabbosMusaf");
        }
        break;
      case "mincha":
        keys.push("shabbosMincha");
        break;
      case "maariv":
        // Friday night
        if (hasService(nusach, "kabbalasShabbos")) {
          keys.push("kabbalasShabbos");
        }
        keys.push("shabbosMaariv");
        break;
    }
  } else {
    // Weekday
    keys.push(timeService);
  }

  // --- Additions based on the day ---

  // Rosh Chodesh additions (Hallel + Musaf) — only for Shacharis
  if (dayInfo.isRoshChodesh && timeService === "shacharis" && !dayInfo.isShabbat) {
    if (hasService(nusach, "roshChodesh")) {
      keys.push("roshChodesh");
    }
  }

  // Chanukah additions — only for Shacharis (Hallel + Torah reading)
  if (
    dayInfo.specialDayLabel.startsWith("Chanukah") &&
    timeService === "shacharis"
  ) {
    if (hasService(nusach, "chanukah")) {
      keys.push("chanukah");
    }
  }

  // Build title
  let title: string;
  let titleHe: string;

  if (keys.length === 1) {
    const mapping = getServicePaths(nusach, keys[0]);
    title = mapping?.name ?? keys[0];
    titleHe = mapping?.nameHe ?? keys[0];
  } else {
    // Combined title
    const baseMapping = getServicePaths(nusach, keys[0]);
    title = baseMapping?.name ?? keys[0];
    titleHe = baseMapping?.nameHe ?? keys[0];

    if (dayInfo.specialDayLabel) {
      title = `${title} — ${dayInfo.specialDayLabel}`;
    }
  }

  return {
    serviceKeys: keys,
    title,
    titleHe,
    useMultiMode: keys.length > 1,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasService(nusach: Nusach, key: string): boolean {
  return !!getServicePaths(nusach, key);
}
