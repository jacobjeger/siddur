import type { Tefila, PrayerSection, TefilaCategory } from "../../data/types";
import type { Nusach } from "../../stores/useSettingsStore";
import type { SiddurSectionRow } from "./types";
import {
  getSectionsForPath,
  getSupplementarySections,
  parseTextAndInstructions,
} from "./siddurDb";
import { getServicePaths, nusachToDbNusach } from "./nusachPaths";

/**
 * Build a Tefila object from a database path.
 * The returned Tefila uses the user's selected nusach for text.
 */
export function buildTefilaFromPath(
  nusach: Nusach,
  path: string,
  overrides?: {
    name?: string;
    nameHe?: string;
    category?: TefilaCategory;
    timeContext?: Tefila["timeContext"];
  }
): Tefila | null {
  const dbNusach = nusachToDbNusach(nusach);
  const rows = getSectionsForPath(dbNusach, path);
  if (rows.length === 0) return null;

  const sections = rowsToSections(rows);
  const lastName = path.split(".").pop() ?? path;
  const firstRow = rows[0];

  return {
    id: `db:${nusach}:${path}`,
    name: overrides?.name ?? lastName,
    nameHe: overrides?.nameHe ?? firstRow.section_name_he ?? lastName,
    category: overrides?.category ?? inferCategory(path),
    sections,
    timeContext: overrides?.timeContext,
  };
}

/**
 * Build a Tefila for a named service (shacharis, mincha, maariv, etc.)
 * by loading all the paths defined for that service in the nusach mapping.
 */
export function buildTefilaForService(
  nusach: Nusach,
  serviceKey: string
): Tefila | null {
  const mapping = getServicePaths(nusach, serviceKey);
  if (!mapping) return null;

  const dbNusach = nusachToDbNusach(nusach);
  const allSections: PrayerSection[] = [];

  for (const pathPrefix of mapping.paths) {
    const rows = getSectionsForPath(dbNusach, pathPrefix);
    allSections.push(...rowsToSections(rows));
  }

  if (allSections.length === 0) return null;

  return {
    id: `db:${nusach}:service:${serviceKey}`,
    name: mapping.name,
    nameHe: mapping.nameHe,
    category: inferCategoryFromService(serviceKey),
    sections: allSections,
    timeContext: inferTimeContext(serviceKey),
  };
}

/**
 * Build a Tefila from supplementary sources (Tehillim, Megillas, etc.)
 */
export function buildTefilaFromSupplementary(
  source: string,
  path?: string,
  overrides?: {
    name?: string;
    nameHe?: string;
    category?: TefilaCategory;
  }
): Tefila | null {
  const rows = getSupplementarySections(source, path);
  if (rows.length === 0) return null;

  const sections = rowsToSections(rows);

  return {
    id: `db:supplementary:${source}:${path ?? "all"}`,
    name: overrides?.name ?? path?.split(".").pop() ?? source,
    nameHe: overrides?.nameHe ?? rows[0].section_name_he ?? source,
    category: overrides?.category ?? inferCategoryFromSource(source),
    sections,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert DB rows to PrayerSection objects. */
function rowsToSections(rows: SiddurSectionRow[]): PrayerSection[] {
  return rows.map((row) => {
    const parsed = parseTextAndInstructions(row.text_hebrew);
    const parsedEn = row.text_english
      ? parseTextAndInstructions(row.text_english)
      : null;

    return {
      id: `dbsec:${row.id}`,
      title: row.section_name,
      titleHe: row.section_name_he ?? row.section_name,
      text: parsed.text,
      translation: parsedEn?.text || undefined,
      instruction: parsed.instruction || parsedEn?.instruction || undefined,
    };
  });
}

function inferCategory(path: string): TefilaCategory {
  const lower = path.toLowerCase();
  if (lower.includes("shacharit") || lower.includes("shacharis"))
    return "shacharis";
  if (lower.includes("minch")) return "mincha";
  if (lower.includes("maariv") || lower.includes("arvit")) return "maariv";
  if (lower.includes("shabbat") || lower.includes("shabbos")) return "shabbos";
  if (lower.includes("festival") || lower.includes("holiday") || lower.includes("chanuk") || lower.includes("purim"))
    return "holidays";
  if (lower.includes("berachot") || lower.includes("blessing"))
    return "blessings";
  if (lower.includes("kaddish")) return "other";
  if (lower.includes("tehillim") || lower.includes("psalm")) return "tehillim";
  return "other";
}

function inferCategoryFromService(service: string): TefilaCategory {
  if (service === "shacharis") return "shacharis";
  if (service === "mincha") return "mincha";
  if (service === "maariv") return "maariv";
  if (service.startsWith("shabbos")) return "shabbos";
  if (service === "havdalah") return "shabbos";
  if (service === "birkasHamazon") return "blessings";
  if (service === "kaddish") return "other";
  return "other";
}

function inferCategoryFromSource(source: string): TefilaCategory {
  if (source === "tehillim") return "tehillim";
  if (source === "pirkei_avot") return "other";
  if (
    source === "shir_hashirim" ||
    source === "koheles" ||
    source === "ruth" ||
    source === "esther" ||
    source === "eichah"
  )
    return "holidays";
  return "other";
}

function inferTimeContext(
  service: string
): Tefila["timeContext"] | undefined {
  if (service === "shacharis") return "shacharis";
  if (service === "mincha") return "mincha";
  if (service === "maariv") return "maariv";
  return undefined;
}
