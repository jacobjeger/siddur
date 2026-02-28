import type { Nusach } from "../../stores/useSettingsStore";

/**
 * Maps logical prayer service names to their actual paths in the
 * Sefaria siddur JSON structure for each nusach.
 */

export interface ServicePathMapping {
  name: string;
  nameHe: string;
  paths: string[];
  category: "shacharis" | "mincha" | "maariv" | "holidays" | "blessings" | "other" | "tehillim" | "lifecycle";
  timeContext?: "shacharis" | "mincha" | "maariv" | "anytime";
}

// ---------------------------------------------------------------------------
// Ashkenaz
// ---------------------------------------------------------------------------

const ASHKENAZ: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    category: "shacharis",
    timeContext: "shacharis",
    paths: [
      "Weekday.Shacharit.Preparatory Prayers",
      "Weekday.Shacharit.Pesukei Dezimra",
      "Weekday.Shacharit.Blessings of the Shema",
      "Weekday.Shacharit.Amidah",
      "Weekday.Shacharit.Post Amidah",
      "Weekday.Shacharit.Torah Reading",
      "Weekday.Shacharit.Concluding Prayers",
      "Weekday.Shacharit.Post Service",
    ],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    category: "mincha",
    timeContext: "mincha",
    paths: ["Weekday.Minchah"],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    category: "maariv",
    timeContext: "maariv",
    paths: ["Weekday.Maariv"],
  },
  // Holidays / Festivals
  roshChodesh: {
    name: "Rosh Chodesh",
    nameHe: "ראש חודש",
    category: "holidays",
    paths: ["Festivals.Rosh Chodesh"],
  },
  shaloshRegalim: {
    name: "Shalosh Regalim",
    nameHe: "שלוש רגלים",
    category: "holidays",
    paths: ["Festivals.Shalosh Regalim"],
  },
  sukkos: {
    name: "Sukkot",
    nameHe: "סוכות",
    category: "holidays",
    paths: ["Festivals.Sukkot"],
  },
  chanukah: {
    name: "Chanukah",
    nameHe: "חנוכה",
    category: "holidays",
    paths: ["Festivals.Chanukah"],
  },
  selichos: {
    name: "Selichot",
    nameHe: "סליחות",
    category: "holidays",
    paths: ["Festivals.Selichot"],
  },
  // Blessings
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    category: "blessings",
    paths: ["Berachot.Birkat HaMazon"],
  },
  birkasHanehenin: {
    name: "Birkat Hanehenin",
    nameHe: "ברכות הנהנין",
    category: "blessings",
    paths: ["Berachot.Birkat Hanehenin"],
  },
  birchosMitzvos: {
    name: "Birkhot HaMitzvot",
    nameHe: "ברכות המצוות",
    category: "blessings",
    paths: ["Berachot.Birkhot Hamitzvot"],
  },
  tefilasHaderech: {
    name: "Tefillat HaDerech",
    nameHe: "תפילת הדרך",
    category: "blessings",
    paths: ["Berachot.Tefillat HaDerech"],
  },
  bedtimeShema: {
    name: "Bedtime Shema",
    nameHe: "קריאת שמע על המיטה",
    category: "other",
    paths: ["Weekday.Maariv.Keri'at Shema al Hamita"],
  },
  // Kaddish
  kaddish: {
    name: "Kaddish",
    nameHe: "קדיש",
    category: "other",
    paths: ["Kaddish"],
  },
};

// ---------------------------------------------------------------------------
// Sefard
// ---------------------------------------------------------------------------

const SEFARD: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    category: "shacharis",
    timeContext: "shacharis",
    paths: ["Upon Arising", "Weekday Shacharit"],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    category: "mincha",
    timeContext: "mincha",
    paths: ["Weekday Mincha"],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    category: "maariv",
    timeContext: "maariv",
    paths: ["Weekday Maariv"],
  },
  bedtimeShema: {
    name: "Bedtime Shema",
    nameHe: "קריאת שמע על המיטה",
    category: "other",
    paths: ["Bedtime Shema"],
  },
  // Holidays
  roshChodesh: {
    name: "Rosh Chodesh",
    nameHe: "ראש חודש",
    category: "holidays",
    paths: ["Rosh Chodesh"],
  },
  holidays: {
    name: "Holidays",
    nameHe: "חגים",
    category: "holidays",
    paths: ["Holidays"],
  },
  sukkos: {
    name: "Sukkot",
    nameHe: "סוכות",
    category: "holidays",
    paths: ["Sukkot"],
  },
  chanukah: {
    name: "Chanukah",
    nameHe: "חנוכה",
    category: "holidays",
    paths: ["Chanukah"],
  },
  purim: {
    name: "Purim",
    nameHe: "פורים",
    category: "holidays",
    paths: ["Purim"],
  },
  pesachHaggadah: {
    name: "Pesach Haggadah",
    nameHe: "הגדה של פסח",
    category: "holidays",
    paths: ["Pesach Haggadah"],
  },
  fastDays: {
    name: "Fast Days",
    nameHe: "תעניות",
    category: "holidays",
    paths: ["Fast Days"],
  },
  // Blessings
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    category: "blessings",
    paths: ["Birchat HaMazon"],
  },
  blessings: {
    name: "Blessings",
    nameHe: "ברכות",
    category: "blessings",
    paths: ["Blessings"],
  },
  mealtimeBlessings: {
    name: "Mealtime Blessings",
    nameHe: "ברכות הסעודה",
    category: "blessings",
    paths: ["Mealtime Blessings"],
  },
  tefilasHaderech: {
    name: "Traveler's Prayer",
    nameHe: "תפילת הדרך",
    category: "blessings",
    paths: ["Blessings.Traveler's Prayer"],
  },
  // Lifecycle
  shevaBrachos: {
    name: "Sheva Berachot",
    nameHe: "שבע ברכות",
    category: "lifecycle",
    paths: ["Various Blessings.Sheva Berachot"],
  },
  brisMilah: {
    name: "Bris Milah",
    nameHe: "ברית מילה",
    category: "lifecycle",
    paths: ["Various Blessings.Circumcision"],
  },
  pidyonHaben: {
    name: "Pidyon HaBen",
    nameHe: "פדיון הבן",
    category: "lifecycle",
    paths: ["Various Blessings.Redeeming Firstborn"],
  },
  // Other
  sefirasHaOmer: {
    name: "Sefirat HaOmer",
    nameHe: "ספירת העומר",
    category: "holidays",
    paths: ["Weekday Maariv.Sefirat HaOmer"],
  },
  kiddushLevana: {
    name: "Kiddush Levana",
    nameHe: "קידוש לבנה",
    category: "other",
    paths: ["Kiddush Levanah"],
  },
};

// ---------------------------------------------------------------------------
// Edot HaMizrach
// ---------------------------------------------------------------------------

const EDOT_HAMIZRACH: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharit",
    nameHe: "שחרית",
    category: "shacharis",
    timeContext: "shacharis",
    paths: ["Preparatory Prayers", "Weekday Shacharit", "Additions for Shacharit"],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    category: "mincha",
    timeContext: "mincha",
    paths: ["Weekday Mincha"],
  },
  maariv: {
    name: "Arvit",
    nameHe: "ערבית",
    category: "maariv",
    timeContext: "maariv",
    paths: ["Weekday Arvit"],
  },
  tikunChatzos: {
    name: "Tikun Chatzot",
    nameHe: "תיקון חצות",
    category: "other",
    paths: ["The Midnight Rite"],
  },
  bedtimeShema: {
    name: "Bedtime Shema",
    nameHe: "קריאת שמע על המיטה",
    category: "other",
    paths: ["Bedtime Shema"],
  },
  roshChodesh: {
    name: "Rosh Chodesh",
    nameHe: "ראש חודש",
    category: "holidays",
    paths: ["Rosh Hodesh"],
  },
  holidays: {
    name: "Three Festivals",
    nameHe: "שלוש רגלים",
    category: "holidays",
    paths: ["Prayers for Three Festivals"],
  },
  chanukah: {
    name: "Chanukah",
    nameHe: "חנוכה",
    category: "holidays",
    paths: ["Hanukkah"],
  },
  purim: {
    name: "Purim",
    nameHe: "פורים",
    category: "holidays",
    paths: ["Purim"],
  },
  fastDays: {
    name: "Fast Days",
    nameHe: "תעניות",
    category: "holidays",
    paths: ["Fast Days and Mourning"],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    category: "blessings",
    paths: ["Post Meal Blessing"],
  },
  blessings: {
    name: "Blessings",
    nameHe: "ברכות",
    category: "blessings",
    paths: ["Blessings on Enjoyments", "Al Hamihya"],
  },
  lifecycle: {
    name: "Lifecycle",
    nameHe: "מעגל החיים",
    category: "lifecycle",
    paths: ["Assorted Blessings and Prayers"],
  },
  sefirasHaOmer: {
    name: "Sefirat HaOmer",
    nameHe: "ספירת העומר",
    category: "holidays",
    paths: ["Counting of the Omer"],
  },
  pirkeiAvos: {
    name: "Pirkei Avot",
    nameHe: "פרקי אבות",
    category: "other",
    paths: ["Mishna Study for Shabbat.Pirkei Avot"],
  },
};

// ---------------------------------------------------------------------------
// Ari (Chabad) — Weekday Siddur Chabad structure
// ---------------------------------------------------------------------------

const ARI: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    category: "shacharis",
    timeContext: "shacharis",
    paths: ["Shacharit"],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    category: "mincha",
    timeContext: "mincha",
    paths: ["Mincha"],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    category: "maariv",
    timeContext: "maariv",
    paths: ["Maariv"],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    category: "blessings",
    paths: ["Blessings.Birkat HaMazon"],
  },
  blessings: {
    name: "Blessings",
    nameHe: "ברכות",
    category: "blessings",
    paths: ["Blessings"],
  },
  bedtimeShema: {
    name: "Bedtime Shema",
    nameHe: "קריאת שמע על המיטה",
    category: "other",
    paths: ["Bedtime Shema"],
  },
  hallel: {
    name: "Hallel",
    nameHe: "הלל",
    category: "holidays",
    paths: ["Hallel"],
  },
  roshChodesh: {
    name: "Rosh Chodesh",
    nameHe: "ראש חודש",
    category: "holidays",
    paths: ["Rosh Chodesh"],
  },
  chanukah: {
    name: "Chanukah",
    nameHe: "חנוכה",
    category: "holidays",
    paths: ["Chanukah"],
  },
  sefirasHaOmer: {
    name: "Sefirat HaOmer",
    nameHe: "ספירת העומר",
    category: "holidays",
    paths: ["Sefirat HaOmer"],
  },
  kiddushLevana: {
    name: "Kiddush Levana",
    nameHe: "קידוש לבנה",
    category: "other",
    paths: ["Kiddush Levanah"],
  },
  hatarasNedarim: {
    name: "Annulment of Vows",
    nameHe: "התרת נדרים",
    category: "holidays",
    paths: ["Annulment of Vows"],
  },
  lifecycle: {
    name: "Lifecycle",
    nameHe: "מעגל החיים",
    category: "lifecycle",
    paths: [
      "Blessings of Marriage Ceremony",
      "Order of a Circumcision",
      "Pidyon HaBen",
    ],
  },
};

// ---------------------------------------------------------------------------
// Master map
// ---------------------------------------------------------------------------

const NUSACH_SERVICES: Record<Nusach, Record<string, ServicePathMapping>> = {
  ashkenaz: ASHKENAZ,
  sefard: SEFARD,
  edot_hamizrach: EDOT_HAMIZRACH,
  ari: ARI,
};

export function getServicePaths(
  nusach: Nusach,
  service: string
): ServicePathMapping | undefined {
  return NUSACH_SERVICES[nusach]?.[service];
}

export function getAvailableServices(
  nusach: Nusach
): Array<{ key: string } & ServicePathMapping> {
  const services = NUSACH_SERVICES[nusach] ?? {};
  return Object.entries(services).map(([key, mapping]) => ({
    key,
    ...mapping,
  }));
}

/**
 * Get services relevant to a specific time of day.
 */
export function getServicesForTime(
  nusach: Nusach,
  time: "shacharis" | "mincha" | "maariv"
): Array<{ key: string } & ServicePathMapping> {
  return getAvailableServices(nusach).filter(
    (s) => s.timeContext === time
  );
}

export function nusachToDbNusach(nusach: Nusach): string {
  return nusach;
}
