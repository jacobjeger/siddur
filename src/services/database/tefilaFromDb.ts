import type { Tefila, PrayerSection, TefilaCategory } from "../../data/types";
import type { Nusach } from "../../stores/useSettingsStore";
import type { SiddurSectionRow } from "./types";
import {
  getSectionsForPath,
  getSupplementarySections,
  getChildNodes,
  stripHtml,
} from "./siddurDb";
import { getServicePaths, nusachToDbNusach } from "./nusachPaths";

/**
 * Build a Tefila object from a database path.
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

/**
 * Get all available top-level sections from the DB for a nusach,
 * organized as a flat list of navigable items.
 */
export function getDbTefilaList(
  nusach: Nusach
): Array<{ path: string; name: string; nameHe: string; category: TefilaCategory }> {
  const dbNusach = nusachToDbNusach(nusach);
  const rootNodes = getChildNodes(dbNusach, "");
  const items: Array<{ path: string; name: string; nameHe: string; category: TefilaCategory }> = [];

  for (const node of rootNodes) {
    const children = getChildNodes(dbNusach, node.path);
    if (children.length === 0) {
      // Leaf at root level
      items.push({
        path: node.path,
        name: node.name,
        nameHe: node.nameHe ?? node.name,
        category: inferCategory(node.path),
      });
    } else {
      for (const child of children) {
        items.push({
          path: child.path,
          name: `${node.name} - ${child.name}`,
          nameHe: child.nameHe ?? child.name,
          category: inferCategory(child.path),
        });
      }
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert DB rows to PrayerSection objects.
 *
 * Sefaria texts use HTML:
 * - <b>text</b>  → bold opening words (we strip tags, keep text)
 * - <small>text</small> → halachic instructions (extracted as `instruction`)
 * - <br>, <i>, etc. → stripped
 */
function rowsToSections(rows: SiddurSectionRow[]): PrayerSection[] {
  return rows.map((row) => {
    const { mainText, instruction } = parseSefariaHtml(row.text_hebrew);
    const englishText = row.text_english
      ? parseSefariaHtml(row.text_english).mainText
      : undefined;

    return {
      id: `dbsec:${row.id}`,
      title: row.section_name,
      titleHe: row.section_name_he ?? row.section_name,
      text: mainText,
      translation: englishText || undefined,
      instruction: instruction || undefined,
    };
  });
}

/**
 * Parse Sefaria HTML text into main prayer text and instructions.
 *
 * <small> tags contain halachic instructions/rubrics — we separate these
 * and show them as instruction blocks in the UI.
 * All other HTML tags are stripped, preserving text content.
 */
function parseSefariaHtml(raw: string): {
  mainText: string;
  instruction: string | null;
} {
  const instructions: string[] = [];

  // Extract <small> blocks as instructions
  const withoutSmall = raw.replace(
    /<small>([\s\S]*?)<\/small>/gi,
    (_, content) => {
      const cleaned = stripHtml(content).trim();
      if (cleaned) instructions.push(cleaned);
      return "";
    }
  );

  // Strip remaining HTML tags
  const mainText = stripHtml(withoutSmall).trim();

  return {
    mainText,
    instruction: instructions.length > 0 ? instructions.join("\n") : null,
  };
}

function inferCategory(path: string): TefilaCategory {
  const lower = path.toLowerCase();
  if (lower.includes("shacharit") || lower.includes("shacharis") || lower.includes("morning"))
    return "shacharis";
  if (lower.includes("minch") || lower.includes("afternoon"))
    return "mincha";
  if (lower.includes("maariv") || lower.includes("arvit") || lower.includes("evening"))
    return "maariv";
  if (lower.includes("shabbat") || lower.includes("shabbos") || lower.includes("kabbalat"))
    return "other";
  if (
    lower.includes("festival") ||
    lower.includes("holiday") ||
    lower.includes("chanuk") ||
    lower.includes("purim") ||
    lower.includes("sukkot") ||
    lower.includes("rosh chodesh") ||
    lower.includes("selichot") ||
    lower.includes("fast")
  )
    return "holidays";
  if (lower.includes("berachot") || lower.includes("blessing") || lower.includes("birk"))
    return "blessings";
  if (lower.includes("tehillim") || lower.includes("psalm"))
    return "tehillim";
  if (lower.includes("kaddish"))
    return "other";
  if (lower.includes("lifecycle") || lower.includes("marriage") || lower.includes("circumcision") || lower.includes("brit"))
    return "lifecycle";
  return "other";
}

function inferCategoryFromService(service: string): TefilaCategory {
  if (service === "shacharis") return "shacharis";
  if (service === "mincha") return "mincha";
  if (service === "maariv") return "maariv";
  if (service.startsWith("shabbos")) return "other";
  if (service === "havdalah") return "other";
  if (service === "birkasHamazon") return "blessings";
  if (service === "kaddish") return "other";
  return "other";
}

function inferCategoryFromSource(source: string): TefilaCategory {
  if (source === "tehillim") return "tehillim";
  if (source === "pirkei_avot") return "other";
  if (["shir_hashirim", "koheles", "ruth", "esther", "eichah"].includes(source))
    return "holidays";
  return "other";
}

function inferTimeContext(service: string): Tefila["timeContext"] | undefined {
  if (service === "shacharis") return "shacharis";
  if (service === "mincha") return "mincha";
  if (service === "maariv") return "maariv";
  return undefined;
}
