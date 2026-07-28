#!/usr/bin/env npx tsx
/**
 * fetch-sefaria.ts
 *
 * Build-time script that fetches siddur text from the Sefaria API
 * for Siddur Ashkenaz, then generates TypeScript data files matching
 * the app's Tefila/PrayerSection interfaces.
 *
 * Fetches: Weekday, Shabbat, Festivals (Hallel, Mussaf, Rosh Chodesh,
 * holidays), Berachot, and Kaddish.
 *
 * Usage: npx tsx scripts/fetch-sefaria.ts
 */

import * as fs from "fs";
import * as path from "path";

// ============================================================
// Configuration
// ============================================================

const SEFARIA_BASE = "https://www.sefaria.org/api";
const SEFARIA_TEXTS = "https://www.sefaria.org/api/v3";

const SIDDUR_TITLE = "Siddur Ashkenaz";

/**
 * Fetch ALL sections from the Sefaria Siddur Ashkenaz index.
 * Set to empty arrays to auto-discover and fetch everything.
 * The script will walk every top-level section in the index.
 */
const FETCH_ALL_SECTIONS = true;

const OUTPUT_DIR = path.resolve(__dirname, "../src/data/prayers");

const DELAY_MS = 300; // Be respectful to Sefaria's servers

// ============================================================
// Types
// ============================================================

interface SefariaIndexNode {
  title?: string;
  heTitle?: string;
  titles?: Array<{ text: string; lang: string; primary?: boolean }>;
  nodes?: SefariaIndexNode[];
  default?: boolean;
  nodeType?: string;
  depth?: number;
  key?: string;
}

interface FetchedPrayer {
  ref: string;
  path: string[]; // e.g. ["Weekday", "Shacharit", "Preparatory Prayers", "Modeh Ani"]
  hebrew: string;
  english: string;
  heTitle: string;
}

// ============================================================
// Helpers
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJSON<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} for ${url}: ${await resp.text()}`);
  }
  return resp.json() as Promise<T>;
}

/**
 * Recursively flatten text arrays into a single string.
 * Sefaria returns text as string | string[] | string[][] | nested deeper.
 */
function flattenText(text: any): string {
  if (!text) return "";
  if (typeof text === "string") return text;
  if (Array.isArray(text)) {
    return text.map((item) => flattenText(item)).filter(Boolean).join("\n");
  }
  return String(text);
}

/**
 * Strip HTML tags but preserve paragraph structure.
 */
function stripHTML(html: string): string {
  let text = html;
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/(p|div|blockquote)>/gi, "\n\n");
  text = text.replace(/<(p|div|blockquote)[^>]*>/gi, "");
  text = text.replace(/<[^>]+>/g, "");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

// ============================================================
// Text Formatting — Separate instructions from prayer text
// ============================================================

/**
 * Check if a string contains Hebrew nikkud (vowel points / cantillation marks).
 * Nikkud range: U+0591–U+05C7
 * Prayer text in the siddur has extensive nikkud; instructions/halachic notes do not.
 */
function hasNikkud(text: string): boolean {
  return /[\u0591-\u05C7]/.test(text);
}

/**
 * Detect lines that are halachic notes (study notes about errors/corrections).
 * These are not part of the actual prayer and should be removed from davening text.
 */
function isHalachicNote(text: string): boolean {
  const patterns = [
    /^אם\s/,                // "If he did not say..."
    /^טעה\s/,               // "If he erred..."
    /^הטועה\s/,             // "One who errs..."
    /\(קיצ/,                // Kitzur Shulchan Aruch reference
    /קיצשו"ע/,             // Kitzur Shulchan Aruch reference
    /\(דה"ח\)/,             // Derech HaChaim reference
    /\(שו"ע/,               // Shulchan Aruch reference
    /\(מ"ב/,                // Mishna Berura reference
    /צריך לחזור/,           // "must repeat"
    /אינו חוזר/,            // "does not repeat"
    /חוזר לראש/,            // "returns to beginning"
    /^ואם שכח/,             // "and if he forgot..."
    /^ואם לא אמר/,          // "and if he did not say..."
    /דינו כמו/,             // "his law is like..."
  ];
  return patterns.some((p) => p.test(text));
}

/**
 * Separate instruction/commentary text from actual prayer text.
 *
 * Strategy:
 *   - Lines with Hebrew nikkud (vowel points) are prayer text
 *   - Leading lines WITHOUT nikkud (before any prayer) become `instruction`
 *   - Inline lines without nikkud that are halachic notes get removed
 *   - Inline lines without nikkud that are short liturgical directions get kept
 */
function separateInstructionsFromText(rawText: string): {
  prayerText: string;
  instruction: string;
} {
  const lines = rawText.split("\n");
  const prayerLines: string[] = [];
  const leadingInstructions: string[] = [];
  let foundPrayer = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (foundPrayer) prayerLines.push(""); // preserve paragraph breaks
      continue;
    }

    if (hasNikkud(trimmed)) {
      foundPrayer = true;
      prayerLines.push(trimmed);
    } else if (!foundPrayer) {
      // Leading instruction before any prayer text
      leadingInstructions.push(trimmed);
    } else {
      // Inline non-nikkud text after prayer has started
      if (isHalachicNote(trimmed)) {
        // Skip halachic study notes — not needed during davening
        continue;
      }
      // Keep liturgical directions (e.g., "קהל וחזן:", "שליח ציבור:")
      prayerLines.push(trimmed);
    }
  }

  // Clean up: remove trailing blank lines
  while (prayerLines.length > 0 && prayerLines[prayerLines.length - 1] === "") {
    prayerLines.pop();
  }

  return {
    prayerText: prayerLines.join("\n"),
    instruction: leadingInstructions.join("\n"),
  };
}

/**
 * Build a Sefaria text reference from a siddur title and path segments.
 */
function buildRef(siddurTitle: string, pathSegments: string[]): string {
  return [siddurTitle, ...pathSegments].join(", ");
}

function encodeRef(ref: string): string {
  return encodeURIComponent(ref);
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNodeTitle(node: SefariaIndexNode): string {
  if (node.title) return node.title;
  if (node.titles) {
    const en = node.titles.find((t) => t.lang === "en" && t.primary);
    if (en) return en.text;
    const anyEn = node.titles.find((t) => t.lang === "en");
    if (anyEn) return anyEn.text;
  }
  return node.key || "Unknown";
}

function getNodeHeTitle(node: SefariaIndexNode): string {
  if (node.heTitle) return node.heTitle;
  if (node.titles) {
    const he = node.titles.find((t) => t.lang === "he" && t.primary);
    if (he) return he.text;
    const anyHe = node.titles.find((t) => t.lang === "he");
    if (anyHe) return anyHe.text;
  }
  return "";
}

// ============================================================
// Index Walking
// ============================================================

function findLeafPaths(
  node: SefariaIndexNode,
  currentPath: string[] = []
): Array<{ path: string[]; heTitle: string }> {
  const title = getNodeTitle(node);
  const heTitle = getNodeHeTitle(node);
  const thisPath = node.default ? currentPath : [...currentPath, title];

  if (node.nodes && node.nodes.length > 0) {
    const results: Array<{ path: string[]; heTitle: string }> = [];
    for (const child of node.nodes) {
      results.push(...findLeafPaths(child, thisPath));
    }
    return results;
  }

  if (thisPath.length > 0) {
    return [{ path: thisPath, heTitle }];
  }
  return [];
}

function findTargetSections(
  rootNodes: SefariaIndexNode[],
  targetNames: string[]
): SefariaIndexNode[] {
  const results: SefariaIndexNode[] = [];
  const lowerTargets = targetNames.map((n) => n.toLowerCase());

  for (const node of rootNodes) {
    const title = getNodeTitle(node);
    const titleLower = title.toLowerCase();

    // Exact match
    if (targetNames.includes(title)) {
      results.push(node);
      continue;
    }

    // Case-insensitive match
    if (lowerTargets.includes(titleLower)) {
      results.push(node);
      continue;
    }

    // Partial match (e.g., "Festivals" matches "Festival Prayers")
    for (const target of lowerTargets) {
      if (titleLower.includes(target) || target.includes(titleLower)) {
        results.push(node);
        break;
      }
    }
  }
  return results;
}

// ============================================================
// Text Fetching — handles multiple Sefaria response formats
// ============================================================

let diagnosticDone = false;

/**
 * Extract Hebrew and English text from a Sefaria API response.
 * The v3 API can return data in several formats:
 *   1. data.versions[] with languageFamilyName + text
 *   2. data.he / data.text (legacy format)
 *   3. data.he / data.en (another variant)
 * We try all of them.
 */
function extractTexts(data: any): { hebrew: string; english: string } {
  let hebrew = "";
  let english = "";

  // --- Strategy 1: versions array (v3 standard) ---
  if (data.versions && Array.isArray(data.versions)) {
    for (const ver of data.versions) {
      const raw = flattenText(ver.text);
      const clean = stripHTML(raw);
      if (!clean) continue;

      const lang = (ver.languageFamilyName || "").toLowerCase();
      const langCode = (ver.language || "").toLowerCase();

      if ((lang === "hebrew" || langCode === "he" || langCode.startsWith("he")) && !hebrew) {
        hebrew = clean;
      } else if ((lang === "english" || langCode === "en" || langCode.startsWith("en")) && !english) {
        english = clean;
      }
    }
  }

  // --- Strategy 2: direct he/text fields (legacy v2 format) ---
  if (!hebrew && data.he) {
    hebrew = stripHTML(flattenText(data.he));
  }
  if (!english && data.text) {
    const candidate = stripHTML(flattenText(data.text));
    // data.text in legacy format is usually the English translation
    if (candidate) english = candidate;
  }

  // --- Strategy 3: direct he/en fields ---
  if (!hebrew && data.hebrew) {
    hebrew = stripHTML(flattenText(data.hebrew));
  }
  if (!english && data.en) {
    english = stripHTML(flattenText(data.en));
  }
  if (!english && data.english) {
    english = stripHTML(flattenText(data.english));
  }

  return { hebrew, english };
}

async function fetchText(
  pathSegments: string[],
  heTitle: string
): Promise<FetchedPrayer | null> {
  const ref = buildRef(SIDDUR_TITLE, pathSegments);
  const url = `${SEFARIA_TEXTS}/texts/${encodeRef(ref)}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const body = await resp.text();
      console.error(`  ❌ HTTP ${resp.status} for ${ref}: ${body.slice(0, 200)}`);
      return null;
    }

    const data = await resp.json() as any;

    // Diagnostic: log the first response structure so we can debug
    if (!diagnosticDone) {
      diagnosticDone = true;
      console.log("\n  🔍 DIAGNOSTIC — First API response structure:");
      console.log(`     URL: ${url}`);
      console.log(`     Top-level keys: ${Object.keys(data).join(", ")}`);
      if (data.versions && Array.isArray(data.versions)) {
        console.log(`     versions.length: ${data.versions.length}`);
        for (let i = 0; i < Math.min(data.versions.length, 3); i++) {
          const v = data.versions[i];
          console.log(`     versions[${i}] keys: ${Object.keys(v).join(", ")}`);
          console.log(`       languageFamilyName: ${v.languageFamilyName}`);
          console.log(`       language: ${v.language}`);
          console.log(`       versionTitle: ${v.versionTitle}`);
          const textPreview = flattenText(v.text);
          console.log(`       text type: ${typeof v.text}, isArray: ${Array.isArray(v.text)}`);
          console.log(`       text preview (first 120 chars): ${textPreview.slice(0, 120)}`);
        }
      } else {
        console.log(`     versions: ${typeof data.versions} (${data.versions})`);
      }
      if (data.he !== undefined) {
        const hePreview = flattenText(data.he);
        console.log(`     data.he type: ${typeof data.he}, isArray: ${Array.isArray(data.he)}`);
        console.log(`     data.he preview: ${hePreview.slice(0, 120)}`);
      }
      if (data.text !== undefined) {
        const textPreview = flattenText(data.text);
        console.log(`     data.text type: ${typeof data.text}, isArray: ${Array.isArray(data.text)}`);
        console.log(`     data.text preview: ${textPreview.slice(0, 120)}`);
      }
      console.log("  🔍 END DIAGNOSTIC\n");
    }

    const { hebrew, english } = extractTexts(data);

    if (!hebrew && !english) {
      console.warn(`  ⚠️  No text found for: ${ref}`);
      return null;
    }

    // Use heRef from response if available, otherwise use provided heTitle
    const resolvedHeTitle = data.heRef || heTitle || "";

    return {
      ref,
      path: pathSegments,
      hebrew,
      english,
      heTitle: resolvedHeTitle,
    };
  } catch (err: any) {
    console.error(`  ❌ Error fetching ${ref}: ${err.message}`);
    return null;
  }
}

/**
 * Fetch text for all leaf paths (Ashkenaz only).
 */
async function fetchAllTexts(
  leaves: Array<{ path: string[]; heTitle: string }>
): Promise<Map<string, FetchedPrayer>> {
  const results = new Map<string, FetchedPrayer>();

  for (const leaf of leaves) {
    const key = leaf.path.join(" > ");
    console.log(`  📖 ${SIDDUR_TITLE}, ${leaf.path.join(", ")}`);
    const prayer = await fetchText(leaf.path, leaf.heTitle);
    if (prayer) {
      results.set(key, prayer);
    }
    await sleep(DELAY_MS);
  }

  return results;
}

// ============================================================
// Code Generation
// ============================================================

function escapeForTS(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function mapServiceToCategory(service: string): string {
  const lower = service.toLowerCase();

  // Weekday services
  if (lower.includes("shacharit") || lower.includes("shacharis")) return "shacharis";
  if (lower.includes("mincha") || lower.includes("minchah")) return "mincha";
  if (lower.includes("maariv") || lower.includes("ma'ariv")) return "maariv";

  // Blessings
  if (lower.includes("berachot") || lower.includes("blessings") || lower.includes("birkat"))
    return "blessings";

  // Shabbat services
  if (
    lower.includes("shabbat") || lower.includes("shabbos") ||
    lower.includes("kabbalat") ||
    lower.includes("havdalah") || lower.includes("havdala") ||
    lower.includes("third meal") || lower.includes("shalosh seudos") ||
    lower.includes("seudah shlishit")
  ) return "shabbos";

  // Festivals / Holidays (Rosh Chodesh, Hallel, Mussaf, Chanukah, etc.)
  if (
    lower.includes("hallel") ||
    lower.includes("mussaf") || lower.includes("musaf") ||
    lower.includes("rosh chodesh") || lower.includes("rosh_chodesh") ||
    lower.includes("chanukah") || lower.includes("hanukkah") ||
    lower.includes("purim") ||
    lower.includes("shalosh regalim") ||
    lower.includes("sukkot") || lower.includes("succot") ||
    lower.includes("selichot") ||
    lower.includes("festival") ||
    lower.includes("prayer for dew") || lower.includes("prayer for rain") ||
    lower.includes("tefilat tal") || lower.includes("tefilat geshem") ||
    lower.includes("chol hamoed") || lower.includes("chol_hamoed")
  ) return "holidays";

  // Kaddish
  if (lower.includes("kaddish")) return "other";

  return "other";
}

function mapServiceToTimeContext(service: string): string {
  const lower = service.toLowerCase();

  // Specific time-of-day services (works for both weekday and Shabbat)
  if (lower.includes("shacharit") || lower.includes("shacharis")) return "shacharis";
  if (lower.includes("mincha") || lower.includes("minchah")) return "mincha";
  if (lower.includes("maariv") || lower.includes("ma'ariv")) return "maariv";

  // Kabbalat Shabbat is Friday evening
  if (lower.includes("kabbalat")) return "maariv";

  // Hallel and Mussaf follow Shacharit
  if (lower.includes("hallel")) return "shacharis";
  if (lower.includes("mussaf") || lower.includes("musaf")) return "shacharis";

  // Everything else is anytime (Havdalah, Third Meal, Kaddish, Berachot, etc.)
  return "anytime";
}

/**
 * Known Sefaria Amidah section titles → insertion-compatible section IDs.
 */
const AMIDAH_SECTION_ID_MAP: Record<string, string> = {
  Patriarchs: "se-avos",
  Avot: "se-avos",
  "Divine Might": "se-gevuros",
  Gevurot: "se-gevuros",
  "Holiness of God": "se-ata-kadosh",
  Kedushah: "se-ata-kadosh",
  Knowledge: "se-ata-chonen",
  Binah: "se-ata-chonen",
  Repentance: "se-hashiveinu",
  Teshuvah: "se-hashiveinu",
  Forgiveness: "se-selach-lanu",
  Selichah: "se-selach-lanu",
  Redemption: "se-reeh",
  "Ge'ulah": "se-reeh",
  Healing: "se-refaeinu",
  "Refu'ah": "se-refaeinu",
  Prosperity: "se-bareich-aleinu",
  "Birkat HaShanim": "se-bareich-aleinu",
  Years: "se-bareich-aleinu",
  "Ingathering of Exiles": "se-teka-beshofar",
  "Gathering the Exiles": "se-teka-beshofar",
  "Kibbutz Galuyot": "se-teka-beshofar",
  Justice: "se-hashiva",
  Din: "se-hashiva",
  "Against Enemies": "se-velamalshinim",
  "Birkat HaMinim": "se-velamalshinim",
  "The Righteous": "se-al-hatzadikim",
  Tzadikim: "se-al-hatzadikim",
  "Rebuilding Jerusalem": "se-velirushalayim",
  "Binyan Yerushalayim": "se-velirushalayim",
  "Kingdom of David": "se-es-tzemach",
  "Malkhut Beit David": "se-es-tzemach",
  Prayer: "se-shema-koleinu",
  "Response to Prayer": "se-shema-koleinu",
  "Shome'a Tefilah": "se-shema-koleinu",
  "Temple Service": "se-retzei",
  Avodah: "se-retzei",
  Thanksgiving: "se-modim",
  "Hoda'ah": "se-modim",
  Peace: "se-sim-shalom",
  Shalom: "se-sim-shalom",
  "Sim Shalom": "se-sim-shalom",
  "Grant Peace": "se-sim-shalom",

  // Mussaf-specific Amidah sections
  "Kedushat HaYom": "se-kedushat-hayom",
  "Sanctification of the Day": "se-kedushat-hayom",
};

function generateSectionId(leafPath: string[], service: string): string {
  const prayerName = leafPath[leafPath.length - 1];

  const isAmidah = leafPath.some(
    (seg) => seg.toLowerCase().includes("amidah") || seg.toLowerCase().includes("amida")
  );

  if (isAmidah && AMIDAH_SECTION_ID_MAP[prayerName]) {
    const baseId = AMIDAH_SECTION_ID_MAP[prayerName];
    const serviceKey = mapServiceToCategory(service);
    if (serviceKey === "mincha") return baseId.replace("se-", "se-mincha-");
    if (serviceKey === "maariv") return baseId.replace("se-", "se-maariv-");
    if (serviceKey === "shabbos") return baseId.replace("se-", "se-shabbos-");
    if (serviceKey === "holidays") return baseId.replace("se-", "se-yomtov-");
    return baseId;
  }

  // For weekday services, use category as prefix (preserves existing IDs like "shacharis-modeh-ani")
  // For new services (Festivals, Kaddish), use the kebab-cased service name
  const category = mapServiceToCategory(service);
  const servicePrefix = (category === "shacharis" || category === "mincha" || category === "maariv" || category === "blessings")
    ? category
    : toKebabCase(service);
  const id = toKebabCase(prayerName);
  return `${servicePrefix}-${id}`;
}

/**
 * Group fetched prayers by service.
 *
 * For Weekday, service = pathSegments[1] (e.g., "Shacharit", "Minchah", "Maariv").
 * For Festivals/Kaddish, include the top-level section to avoid collisions
 * (e.g., "Festivals-Hallel", "Festivals-Rosh Chodesh", "Kaddish").
 * For Berachot sub-sections, use the sub-section name directly.
 */
function groupByService(
  allTexts: Map<string, FetchedPrayer>
): Map<string, Map<string, FetchedPrayer>> {
  const grouped = new Map<string, Map<string, FetchedPrayer>>();

  for (const [pathKey, prayer] of allTexts) {
    const pathSegments = pathKey.split(" > ");
    const topLevel = pathSegments[0]; // "Weekday", "Festivals", "Berachot", "Kaddish"

    let service: string;

    if (topLevel === "Weekday") {
      // Weekday > Shacharit > ... → use "Shacharit"
      service = pathSegments.length > 1 ? pathSegments[1] : topLevel;
    } else if (topLevel === "Shabbat") {
      // Shabbat > Shacharit > ... → use "Shabbat-Shacharit" (avoid collision with Weekday)
      // Shabbat > Kabbalat Shabbat > ... → use "Shabbat-Kabbalat Shabbat"
      service = pathSegments.length > 1
        ? `${topLevel}-${pathSegments[1]}`
        : topLevel;
    } else if (topLevel === "Festivals") {
      // Festivals > Rosh Chodesh > Hallel > ... → use "Festivals-Rosh Chodesh"
      // Festivals > Shalosh Regalim > ... → use "Festivals-Shalosh Regalim"
      service = pathSegments.length > 1
        ? `${topLevel}-${pathSegments[1]}`
        : topLevel;
    } else if (topLevel === "Kaddish") {
      // All Kaddish variants in one file
      service = "Kaddish";
    } else {
      // Berachot sub-sections use their sub-section name directly
      service = pathSegments.length > 1 ? pathSegments[1] : topLevel;
    }

    if (!grouped.has(service)) {
      grouped.set(service, new Map());
    }
    grouped.get(service)!.set(pathKey, prayer);
  }

  return grouped;
}

function toCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/**
 * Generate a TypeScript file for a service's prayers.
 * Ashkenaz-only: text is a simple string, not NusachVariants.
 */
function generateServiceFile(
  serviceName: string,
  prayers: Map<string, FetchedPrayer>
): string {
  const category = mapServiceToCategory(serviceName);
  const timeContext = mapServiceToTimeContext(serviceName);
  const tefilaVarNames: string[] = [];

  let code = `// Auto-generated by fetch-sefaria.ts — do not edit manually\n`;
  code += `// Source: Sefaria API (https://www.sefaria.org)\n`;
  code += `// Generated: ${new Date().toISOString()}\n\n`;
  code += `import type { Tefila, PrayerSection } from "../types";\n\n`;

  // Group prayers by their parent section
  const parentGroups = new Map<string, Array<[string, FetchedPrayer]>>();

  for (const [pathKey, prayer] of prayers) {
    const segments = pathKey.split(" > ");
    const parent = segments.length > 2 ? segments[2] : serviceName;
    if (!parentGroups.has(parent)) {
      parentGroups.set(parent, []);
    }
    parentGroups.get(parent)!.push([pathKey, prayer]);
  }

  for (const [parentName, groupPrayers] of parentGroups) {
    const tefilaId = toKebabCase(`${category}-${parentName}`);
    const varName = toCamelCase(tefilaId);
    tefilaVarNames.push(varName);

    // Extract a clean Hebrew title for the tefila group.
    // prayer.heTitle is often the full Sefaria ref like
    // "סידור אשכנז, ימי חול, תפילת שחרית, הכנה לתפילה, מודה אני"
    // We want just the parent section name, e.g. "הכנה לתפילה"
    let heTitle = "";
    for (const [pathKey, prayer] of groupPrayers) {
      if (prayer.heTitle) {
        // Extract the relevant segment from the heRef
        const heSegments = prayer.heTitle.split(",").map((s) => s.trim());
        // The parent group name is typically the 2nd-to-last segment
        // e.g. [..., "הכנה לתפילה", "מודה אני"] → we want "הכנה לתפילה"
        if (heSegments.length >= 2) {
          heTitle = heSegments[heSegments.length - 2];
        } else {
          heTitle = heSegments[heSegments.length - 1];
        }
        break;
      }
    }

    const sections: string[] = [];
    for (const [pathKey, prayer] of groupPrayers) {
      const pathSegments = pathKey.split(" > ");
      const prayerName = pathSegments[pathSegments.length - 1];
      const sectionId = generateSectionId(pathSegments, serviceName);

      // Extract a short Hebrew title from the heRef
      const shortHeTitle = prayer.heTitle
        ? prayer.heTitle.split(",").pop()?.trim() || prayerName
        : prayerName;

      // Separate instructional text from actual prayer text
      const { prayerText, instruction } = separateInstructionsFromText(prayer.hebrew);
      const hebrewToUse = prayerText || prayer.hebrew; // fallback to original if separation fails

      let sectionCode = `  {\n`;
      sectionCode += `    id: "${sectionId}",\n`;
      sectionCode += `    title: "${prayerName.replace(/"/g, '\\"')}",\n`;
      sectionCode += `    titleHe: "${shortHeTitle.replace(/"/g, '\\"')}",\n`;
      if (instruction) {
        sectionCode += `    instruction: \`${escapeForTS(instruction)}\`,\n`;
      }
      sectionCode += `    text: \`${escapeForTS(hebrewToUse)}\`,\n`;
      sectionCode += `    translation: \`${escapeForTS(prayer.english)}\`,\n`;
      sectionCode += `  }`;

      sections.push(sectionCode);
    }

    code += `export const ${varName}: Tefila = {\n`;
    code += `  id: "${tefilaId}",\n`;
    code += `  name: "${parentName.replace(/"/g, '\\"')}",\n`;
    code += `  nameHe: "${(heTitle || parentName).replace(/"/g, '\\"')}",\n`;
    code += `  category: "${category}",\n`;
    code += `  timeContext: "${timeContext}",\n`;
    code += `  sections: [\n${sections.join(",\n")},\n  ],\n`;
    code += `};\n\n`;
  }

  code += `export const ALL_${serviceName.toUpperCase().replace(/[^A-Z0-9]/g, "_")}: Tefila[] = [\n`;
  code += tefilaVarNames.map((v) => `  ${v}`).join(",\n");
  code += `,\n];\n`;

  return code;
}

/**
 * Generate the index.ts that exports ALL_TEFILOS.
 */
function generateIndexFile(serviceFiles: Map<string, string>): string {
  let code = `// Auto-generated by fetch-sefaria.ts — do not edit manually\n\n`;
  code += `import type { Tefila } from "../types";\n`;

  const allArrayNames: string[] = [];

  for (const [serviceName, fileName] of serviceFiles) {
    const arrayName = `ALL_${serviceName.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
    const moduleBase = `./${path.basename(fileName, ".ts")}`;
    code += `import { ${arrayName} } from "${moduleBase}";\n`;
    allArrayNames.push(arrayName);
  }

  code += `\nexport { ALL_INSERTIONS } from "./insertions";\n\n`;

  code += `export const ALL_TEFILOS: Tefila[] = [\n`;
  code += allArrayNames.map((n) => `  ...${n}`).join(",\n");
  code += `,\n];\n`;

  // Add helper functions that the app depends on
  code += `
/**
 * Get all tefilos matching a given time context (shacharis, mincha, maariv, anytime).
 */
export function getTefilosForTime(
  timeContext: "shacharis" | "mincha" | "maariv" | "anytime"
): Tefila[] {
  return ALL_TEFILOS.filter(
    (t) => t.timeContext === timeContext || t.timeContext === "anytime"
  );
}

/**
 * Find a single tefila by its ID.
 */
export function getTefilaById(id: string): Tefila | undefined {
  return ALL_TEFILOS.find((t) => t.id === id);
}

/**
 * Get all tefilos matching a given category.
 */
export function getTefilosByCategory(
  category: Tefila["category"]
): Tefila[] {
  return ALL_TEFILOS.filter((t) => t.category === category);
}
`;

  return code;
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log("🕎 Sefaria Siddur Fetcher (Ashkenaz)\n");

  // Step 0: Test connectivity — also serves as a diagnostic for response format
  console.log("Step 0: Testing Sefaria API connectivity...\n");
  try {
    const testUrl = `${SEFARIA_TEXTS}/texts/${encodeURIComponent("Siddur Ashkenaz, Weekday, Shacharit, Preparatory Prayers, Modeh Ani")}`;
    console.log(`  Testing with known ref: Siddur Ashkenaz, Weekday, Shacharit, Preparatory Prayers, Modeh Ani`);
    const resp = await fetch(testUrl);
    if (!resp.ok) {
      console.error(`  ❌ HTTP ${resp.status}`);
      const body = await resp.text();
      console.error(`  Response: ${body.slice(0, 500)}`);
      console.error("\n  Trying legacy /api/texts/ endpoint instead...");

      // Try the non-v3 texts endpoint
      const legacyUrl = `${SEFARIA_BASE}/texts/${encodeURIComponent("Siddur Ashkenaz, Weekday, Shacharit, Preparatory Prayers, Modeh Ani")}?context=0`;
      const legacyResp = await fetch(legacyUrl);
      if (legacyResp.ok) {
        const legacyData = await legacyResp.json() as any;
        console.log(`  ✅ Legacy endpoint works!`);
        console.log(`  Keys: ${Object.keys(legacyData).join(", ")}`);
        if (legacyData.he) {
          const preview = flattenText(legacyData.he);
          console.log(`  he preview: ${preview.slice(0, 120)}`);
        }
        console.log("\n  → Switching to legacy endpoint for all fetches.\n");
        // Switch to legacy endpoint globally
        useLegacyEndpoint = true;
      } else {
        console.error(`  ❌ Legacy endpoint also failed: HTTP ${legacyResp.status}`);
        process.exit(1);
      }
    } else {
      const data = await resp.json() as any;
      console.log(`  ✅ API is reachable`);
      console.log(`  Response keys: ${Object.keys(data).join(", ")}`);

      // Diagnostic: show the text extraction result
      const { hebrew, english } = extractTexts(data);
      if (hebrew) {
        console.log(`  ✅ Hebrew text extracted (${hebrew.length} chars): ${hebrew.slice(0, 80)}...`);
      } else {
        console.log(`  ⚠️  No Hebrew text extracted from v3 response`);
        // Show more detail for debugging
        if (data.versions) {
          console.log(`  versions count: ${data.versions.length}`);
          for (const v of data.versions.slice(0, 3)) {
            console.log(`    - lang=${v.languageFamilyName || v.language}, text type=${typeof v.text}, isArr=${Array.isArray(v.text)}`);
            if (v.text) console.log(`      preview: ${String(flattenText(v.text)).slice(0, 80)}`);
          }
        }
        // Try legacy endpoint as fallback
        console.log("\n  Trying legacy /api/texts/ endpoint as fallback...");
        const legacyUrl = `${SEFARIA_BASE}/texts/${encodeURIComponent("Siddur Ashkenaz, Weekday, Shacharit, Preparatory Prayers, Modeh Ani")}?context=0`;
        try {
          const legacyResp = await fetch(legacyUrl);
          if (legacyResp.ok) {
            const legacyData = await legacyResp.json() as any;
            const legacyHe = stripHTML(flattenText(legacyData.he));
            if (legacyHe) {
              console.log(`  ✅ Legacy endpoint has Hebrew text (${legacyHe.length} chars): ${legacyHe.slice(0, 80)}...`);
              console.log("  → Switching to legacy endpoint for all fetches.\n");
              useLegacyEndpoint = true;
            }
          }
        } catch (_) {}
      }
      if (english) {
        console.log(`  ✅ English text extracted (${english.length} chars)`);
      }
      console.log();
    }
  } catch (err: any) {
    console.error(`❌ Cannot reach Sefaria API: ${err.message}`);
    process.exit(1);
  }

  console.log("Step 1: Fetching index for Siddur Ashkenaz...\n");

  const indexUrls = [
    `${SEFARIA_BASE}/index/Siddur_Ashkenaz`,
    `${SEFARIA_BASE}/v2/index/Siddur_Ashkenaz`,
    `${SEFARIA_BASE}/index/Siddur%20Ashkenaz`,
  ];

  let indexData: any = null;

  for (const url of indexUrls) {
    try {
      console.log(`  Trying: ${url}`);
      const resp = await fetch(url);
      if (resp.ok) {
        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("json")) {
          indexData = await resp.json();
          console.log(`  ✅ Success!\n`);
          break;
        } else {
          console.log(`  ⚠️  Got non-JSON response (${contentType}), trying next...`);
        }
      } else {
        console.log(`  ⚠️  HTTP ${resp.status}, trying next...`);
      }
    } catch (err: any) {
      console.log(`  ⚠️  Error: ${err.message}, trying next...`);
    }
  }

  if (!indexData) {
    console.error("\n❌ Could not fetch the Siddur Ashkenaz index.");
    process.exit(1);
  }

  const rootNodes: SefariaIndexNode[] = indexData.schema?.nodes || indexData.nodes || [];

  if (rootNodes.length === 0) {
    console.error("❌ No root nodes found in index. Schema keys:", Object.keys(indexData.schema || {}));
    process.exit(1);
  }

  console.log(`Found ${rootNodes.length} top-level sections:`);
  for (const node of rootNodes) {
    console.log(`  📁 ${getNodeTitle(node)}`);
  }

  // Fetch ALL sections — walk the entire siddur index
  const targetSections = FETCH_ALL_SECTIONS
    ? rootNodes
    : findTargetSections(rootNodes, []);

  if (targetSections.length === 0) {
    console.error("❌ No sections found in index.");
    process.exit(1);
  }

  console.log(
    `\nWill fetch ALL ${targetSections.length} sections: ${targetSections.map((n) => getNodeTitle(n)).join(", ")}\n`
  );

  // Discover all leaf paths
  const allLeaves: Array<{ path: string[]; heTitle: string }> = [];
  for (const section of targetSections) {
    const leaves = findLeafPaths(section);
    console.log(`  ${getNodeTitle(section)}: ${leaves.length} leaf sections`);
    allLeaves.push(...leaves);
  }

  console.log(`\nTotal leaf sections to fetch: ${allLeaves.length}\n`);
  console.log("Step 2: Fetching ALL siddur text...\n");

  const allTexts = await fetchAllTexts(allLeaves);

  console.log(`\n✅ Fetched ${allTexts.size}/${allLeaves.length} prayer sections with text\n`);

  if (allTexts.size === 0) {
    console.error("❌ No text was fetched at all. Check the diagnostic output above.");
    process.exit(1);
  }

  console.log("Step 3: Generating TypeScript files...\n");

  const grouped = groupByService(allTexts);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const serviceFiles = new Map<string, string>();

  for (const [serviceName, prayers] of grouped) {
    const fileName = toKebabCase(serviceName) + ".ts";
    const filePath = path.join(OUTPUT_DIR, fileName);
    const content = generateServiceFile(serviceName, prayers);

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`  📝 ${fileName} (${prayers.size} sections)`);
    serviceFiles.set(serviceName, fileName);
  }

  // Generate index.ts
  const indexContent = generateIndexFile(serviceFiles);
  const indexPath = path.join(OUTPUT_DIR, "index.ts");
  fs.writeFileSync(indexPath, indexContent, "utf-8");
  console.log(`  📝 index.ts`);

  console.log(`\n🎉 Done! Generated ${serviceFiles.size + 1} files in src/data/prayers/`);
  console.log(`\nNext steps:`);
  console.log(`  1. Check the generated files for completeness`);
  console.log(`  2. Run 'npx expo start' to test the app`);
}

// Global flag: if v3 endpoint doesn't return text, fall back to legacy
let useLegacyEndpoint = false;

// Override fetchText to use legacy endpoint when needed
const originalFetchText = fetchText;

async function fetchTextWithFallback(
  pathSegments: string[],
  heTitle: string
): Promise<FetchedPrayer | null> {
  if (!useLegacyEndpoint) {
    return originalFetchText(pathSegments, heTitle);
  }

  // Use legacy /api/texts/ endpoint
  const ref = buildRef(SIDDUR_TITLE, pathSegments);
  const url = `${SEFARIA_BASE}/texts/${encodeRef(ref)}?context=0&pad=0`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const body = await resp.text();
      console.error(`  ❌ HTTP ${resp.status} for ${ref}: ${body.slice(0, 200)}`);
      return null;
    }

    const data = await resp.json() as any;

    let hebrew = "";
    let english = "";

    // Legacy endpoint returns data.he (Hebrew) and data.text (English)
    if (data.he) {
      hebrew = stripHTML(flattenText(data.he));
    }
    if (data.text) {
      english = stripHTML(flattenText(data.text));
    }

    if (!hebrew && !english) {
      console.warn(`  ⚠️  No text found for: ${ref}`);
      return null;
    }

    return {
      ref,
      path: pathSegments,
      hebrew,
      english,
      heTitle: data.heRef || heTitle || "",
    };
  } catch (err: any) {
    console.error(`  ❌ Error fetching ${ref}: ${err.message}`);
    return null;
  }
}

// Patch fetchAllTexts to use the fallback-aware version
async function fetchAllTextsPatched(
  leaves: Array<{ path: string[]; heTitle: string }>
): Promise<Map<string, FetchedPrayer>> {
  const results = new Map<string, FetchedPrayer>();

  for (const leaf of leaves) {
    const key = leaf.path.join(" > ");
    console.log(`  📖 ${SIDDUR_TITLE}, ${leaf.path.join(", ")}`);
    const prayer = await fetchTextWithFallback(leaf.path, leaf.heTitle);
    if (prayer) {
      results.set(key, prayer);
    }
    await sleep(DELAY_MS);
  }

  return results;
}

// Replace the fetchAllTexts reference in main
const _origFetchAll = fetchAllTexts;
// @ts-ignore — runtime patching
globalThis.__fetchAll = fetchAllTextsPatched;

// Re-export main with patched fetcher
async function run() {
  console.log("🕎 Sefaria Siddur Fetcher (Ashkenaz)\n");

  // Step 0: Test connectivity
  console.log("Step 0: Testing Sefaria API connectivity...\n");
  try {
    const testRef = "Siddur Ashkenaz, Weekday, Shacharit, Preparatory Prayers, Modeh Ani";

    // Try v3 endpoint first
    const v3Url = `${SEFARIA_TEXTS}/texts/${encodeRef(testRef)}`;
    console.log(`  Testing v3: ${v3Url}`);
    const v3Resp = await fetch(v3Url);

    if (v3Resp.ok) {
      const v3Data = await v3Resp.json() as any;
      console.log(`  v3 response keys: ${Object.keys(v3Data).join(", ")}`);
      const v3Result = extractTexts(v3Data);

      if (v3Result.hebrew) {
        console.log(`  ✅ v3 works! Hebrew (${v3Result.hebrew.length} chars): ${v3Result.hebrew.slice(0, 80)}...`);
        useLegacyEndpoint = false;
      } else {
        console.log(`  ⚠️  v3 returned 200 but no Hebrew text extracted.`);

        // Debug: show what's in versions
        if (v3Data.versions && Array.isArray(v3Data.versions)) {
          console.log(`  versions array has ${v3Data.versions.length} entries:`);
          for (const v of v3Data.versions) {
            const raw = flattenText(v.text);
            console.log(`    - langFamily="${v.languageFamilyName}" lang="${v.language}" textLen=${raw.length} preview="${raw.slice(0, 60)}"`);
          }
        }
        if (v3Data.he) {
          const heRaw = flattenText(v3Data.he);
          console.log(`  data.he present: ${heRaw.length} chars, preview: ${heRaw.slice(0, 60)}`);
        }

        // Try legacy endpoint
        console.log(`\n  Trying legacy: ${SEFARIA_BASE}/texts/...`);
        const legacyUrl = `${SEFARIA_BASE}/texts/${encodeRef(testRef)}?context=0&pad=0`;
        const legacyResp = await fetch(legacyUrl);
        if (legacyResp.ok) {
          const legacyData = await legacyResp.json() as any;
          const legacyHe = stripHTML(flattenText(legacyData.he));
          if (legacyHe) {
            console.log(`  ✅ Legacy works! Hebrew (${legacyHe.length} chars): ${legacyHe.slice(0, 80)}...`);
            useLegacyEndpoint = true;
          } else {
            console.log(`  ❌ Legacy also returned no Hebrew text.`);
            console.log(`  Legacy keys: ${Object.keys(legacyData).join(", ")}`);
            console.error("\n  Cannot extract text from either endpoint. Aborting.");
            process.exit(1);
          }
        } else {
          console.error(`  ❌ Legacy endpoint HTTP ${legacyResp.status}`);
          process.exit(1);
        }
      }
    } else {
      console.log(`  v3 returned HTTP ${v3Resp.status}, trying legacy...`);
      const legacyUrl = `${SEFARIA_BASE}/texts/${encodeRef(testRef)}?context=0&pad=0`;
      const legacyResp = await fetch(legacyUrl);
      if (legacyResp.ok) {
        const legacyData = await legacyResp.json() as any;
        const legacyHe = stripHTML(flattenText(legacyData.he));
        if (legacyHe) {
          console.log(`  ✅ Legacy works! Hebrew (${legacyHe.length} chars): ${legacyHe.slice(0, 80)}...`);
          useLegacyEndpoint = true;
        } else {
          console.error("  ❌ Neither endpoint returns usable text.");
          process.exit(1);
        }
      } else {
        console.error(`  ❌ Both endpoints failed.`);
        process.exit(1);
      }
    }
  } catch (err: any) {
    console.error(`❌ Cannot reach Sefaria API: ${err.message}`);
    process.exit(1);
  }

  console.log(`\n  Using endpoint: ${useLegacyEndpoint ? "legacy /api/texts/" : "v3 /api/v3/texts/"}\n`);

  console.log("Step 1: Fetching index for Siddur Ashkenaz...\n");

  const indexUrls = [
    `${SEFARIA_BASE}/index/Siddur_Ashkenaz`,
    `${SEFARIA_BASE}/v2/index/Siddur_Ashkenaz`,
    `${SEFARIA_BASE}/index/Siddur%20Ashkenaz`,
  ];

  let indexData: any = null;

  for (const url of indexUrls) {
    try {
      console.log(`  Trying: ${url}`);
      const resp = await fetch(url);
      if (resp.ok) {
        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("json")) {
          indexData = await resp.json();
          console.log(`  ✅ Success!\n`);
          break;
        }
      } else {
        console.log(`  ⚠️  HTTP ${resp.status}, trying next...`);
      }
    } catch (err: any) {
      console.log(`  ⚠️  Error: ${err.message}, trying next...`);
    }
  }

  if (!indexData) {
    console.error("\n❌ Could not fetch the Siddur Ashkenaz index.");
    process.exit(1);
  }

  const rootNodes: SefariaIndexNode[] = indexData.schema?.nodes || indexData.nodes || [];

  if (rootNodes.length === 0) {
    console.error("❌ No root nodes found in index.");
    process.exit(1);
  }

  console.log(`Found ${rootNodes.length} top-level sections:`);
  for (const node of rootNodes) {
    console.log(`  📁 ${getNodeTitle(node)}`);
  }

  // Fetch ALL sections — walk the entire siddur index
  const targetSections = FETCH_ALL_SECTIONS
    ? rootNodes
    : findTargetSections(rootNodes, []);

  if (targetSections.length === 0) {
    console.error("❌ No sections found in index.");
    process.exit(1);
  }

  console.log(
    `\nWill fetch ALL ${targetSections.length} sections: ${targetSections.map((n) => getNodeTitle(n)).join(", ")}\n`
  );

  const allLeaves: Array<{ path: string[]; heTitle: string }> = [];
  for (const section of targetSections) {
    const leaves = findLeafPaths(section);
    console.log(`  ${getNodeTitle(section)}: ${leaves.length} leaf sections`);
    allLeaves.push(...leaves);
  }

  console.log(`\nTotal leaf sections to fetch: ${allLeaves.length}\n`);
  console.log("Step 2: Fetching ALL siddur text...\n");

  // Use the patched fetcher that respects useLegacyEndpoint
  const allTexts = await fetchAllTextsPatched(allLeaves);

  console.log(`\n✅ Fetched ${allTexts.size}/${allLeaves.length} prayer sections with text\n`);

  if (allTexts.size === 0) {
    console.error("❌ No text was fetched. Check the diagnostic output above.");
    process.exit(1);
  }

  console.log("Step 3: Generating TypeScript files...\n");

  const grouped = groupByService(allTexts);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const serviceFiles = new Map<string, string>();

  for (const [serviceName, prayers] of grouped) {
    const fileName = toKebabCase(serviceName) + ".ts";
    const filePath = path.join(OUTPUT_DIR, fileName);
    const content = generateServiceFile(serviceName, prayers);

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`  📝 ${fileName} (${prayers.size} sections)`);
    serviceFiles.set(serviceName, fileName);
  }

  // Preserve insertions.ts — don't overwrite it
  const insertionsPath = path.join(OUTPUT_DIR, "insertions.ts");
  if (!fs.existsSync(insertionsPath)) {
    console.warn("  ⚠️  insertions.ts not found — make sure it exists!");
  }

  // Generate index.ts
  const indexContent = generateIndexFile(serviceFiles);
  const indexPath = path.join(OUTPUT_DIR, "index.ts");
  fs.writeFileSync(indexPath, indexContent, "utf-8");
  console.log(`  📝 index.ts`);

  console.log(`\n🎉 Done! Generated ${serviceFiles.size + 1} files in src/data/prayers/`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
