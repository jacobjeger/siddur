import type { Nusach } from "../../stores/useSettingsStore";

/**
 * Maps logical prayer service names to their actual paths in the
 * Sefaria siddur JSON structure for each nusach.
 *
 * Each nusach organizes its siddur differently, so we need per-nusach mappings.
 * These paths correspond to the hierarchical structure in the merged.json files.
 */

export interface ServicePathMapping {
  /** Human-readable name */
  name: string;
  nameHe: string;
  /** Path patterns to include (in order). Each is a path prefix. */
  paths: string[];
}

// ---------------------------------------------------------------------------
// Ashkenaz paths
// ---------------------------------------------------------------------------

const ASHKENAZ_SERVICES: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    paths: [
      "Weekday.Shacharit.Preparatory Prayers",
      "Weekday.Shacharit.Pesukei Dezimra",
      "Weekday.Shacharit.Blessings of the Shema",
      "Weekday.Shacharit.Amidah",
      "Weekday.Shacharit.Post Amidah",
      "Weekday.Shacharit.Torah Reading",
      "Weekday.Shacharit.Concluding Prayers",
    ],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    paths: [
      "Weekday.Minchah",
    ],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    paths: [
      "Weekday.Maariv",
    ],
  },
  shabbosKabbalasShabbos: {
    name: "Kabbalat Shabbat",
    nameHe: "קבלת שבת",
    paths: ["Shabbat.Kabbalat Shabbat"],
  },
  shabbosMaariv: {
    name: "Shabbat Maariv",
    nameHe: "מעריב לשבת",
    paths: ["Shabbat.Maariv"],
  },
  shabbosShacharit: {
    name: "Shabbat Shacharit",
    nameHe: "שחרית לשבת",
    paths: ["Shabbat.Shacharit"],
  },
  shabbosMusaf: {
    name: "Musaf for Shabbat",
    nameHe: "מוסף לשבת",
    paths: ["Shabbat.Musaf LeShabbat"],
  },
  shabbosMincha: {
    name: "Shabbat Mincha",
    nameHe: "מנחה לשבת",
    paths: ["Shabbat.Minchah"],
  },
  havdalah: {
    name: "Havdalah",
    nameHe: "הבדלה",
    paths: ["Shabbat.Havdalah"],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    paths: ["Berachot.Birkat HaMazon"],
  },
  kaddish: {
    name: "Kaddish",
    nameHe: "קדיש",
    paths: ["Kaddish"],
  },
};

// ---------------------------------------------------------------------------
// Sefard paths
// ---------------------------------------------------------------------------

const SEFARD_SERVICES: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    paths: [
      "Upon Arising",
      "Weekday Shacharit",
    ],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    paths: ["Weekday Mincha"],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    paths: ["Weekday Maariv"],
  },
  shabbosKabbalasShabbos: {
    name: "Kabbalat Shabbat",
    nameHe: "קבלת שבת",
    paths: ["Kabbalat Shabbat"],
  },
  shabbosMaariv: {
    name: "Shabbat Maariv",
    nameHe: "מעריב לשבת",
    paths: ["Shabbat Eve Maariv"],
  },
  shabbosShacharit: {
    name: "Shabbat Shacharit",
    nameHe: "שחרית לשבת",
    paths: ["Shabbat Morning Services"],
  },
  shabbosMusaf: {
    name: "Musaf",
    nameHe: "מוסף",
    paths: ["Musaf"],
  },
  shabbosMincha: {
    name: "Shabbat Mincha",
    nameHe: "מנחה לשבת",
    paths: ["Shabbat Mincha"],
  },
  havdalah: {
    name: "Havdalah",
    nameHe: "הבדלה",
    paths: ["Motzaei Shabbat "],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    paths: ["Birchat HaMazon"],
  },
};

// ---------------------------------------------------------------------------
// Edot HaMizrach paths
// ---------------------------------------------------------------------------

const EDOT_HAMIZRACH_SERVICES: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharit",
    nameHe: "שחרית",
    paths: [
      "Preparatory Prayers",
      "Weekday Shacharit",
    ],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    paths: ["Weekday Mincha"],
  },
  maariv: {
    name: "Arvit",
    nameHe: "ערבית",
    paths: ["Weekday Arvit"],
  },
  shabbosKabbalasShabbos: {
    name: "Kabbalat Shabbat",
    nameHe: "קבלת שבת",
    paths: ["Kabbalat Shabbat"],
  },
  shabbosMaariv: {
    name: "Shabbat Arvit",
    nameHe: "ערבית לשבת",
    paths: ["Shabbat Arvit"],
  },
  shabbosShacharit: {
    name: "Shabbat Shacharit",
    nameHe: "שחרית לשבת",
    paths: ["Shabbat Shacharit"],
  },
  shabbosMusaf: {
    name: "Musaf",
    nameHe: "מוסף",
    paths: ["Shabbat Mussaf"],
  },
  shabbosMincha: {
    name: "Shabbat Mincha",
    nameHe: "מנחה לשבת",
    paths: ["Shabbat Mincha"],
  },
  havdalah: {
    name: "Havdalah",
    nameHe: "הבדלה",
    paths: ["Havdalah"],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    paths: ["Post Meal Blessing"],
  },
};

// ---------------------------------------------------------------------------
// Ari (Chabad) paths — based on Weekday Siddur Chabad structure
// ---------------------------------------------------------------------------

const ARI_SERVICES: Record<string, ServicePathMapping> = {
  shacharis: {
    name: "Shacharis",
    nameHe: "שחרית",
    paths: ["Shacharit"],
  },
  mincha: {
    name: "Mincha",
    nameHe: "מנחה",
    paths: ["Mincha"],
  },
  maariv: {
    name: "Maariv",
    nameHe: "מעריב",
    paths: ["Maariv"],
  },
  birkasHamazon: {
    name: "Birkat HaMazon",
    nameHe: "ברכת המזון",
    paths: ["Blessings.Birkat HaMazon"],
  },
};

// ---------------------------------------------------------------------------
// Nusach → services map
// ---------------------------------------------------------------------------

const NUSACH_SERVICES: Record<Nusach, Record<string, ServicePathMapping>> = {
  ashkenaz: ASHKENAZ_SERVICES,
  sefard: SEFARD_SERVICES,
  edot_hamizrach: EDOT_HAMIZRACH_SERVICES,
  ari: ARI_SERVICES,
};

/**
 * Get the service path mapping for a given nusach and service name.
 */
export function getServicePaths(
  nusach: Nusach,
  service: string
): ServicePathMapping | undefined {
  return NUSACH_SERVICES[nusach]?.[service];
}

/**
 * Get all available services for a nusach.
 */
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
 * Map the nusach setting to the database nusach string.
 */
export function nusachToDbNusach(nusach: Nusach): string {
  return nusach;
}
