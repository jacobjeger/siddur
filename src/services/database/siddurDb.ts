import * as SQLite from "expo-sqlite";
import { Paths, File, Directory } from "expo-file-system";
import { Asset } from "expo-asset";
import type { SiddurSectionRow, SiddurNode } from "./types";

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the siddur database by copying the pre-built asset
 * to the app's document directory and opening it.
 * Safe to call multiple times — will only initialize once.
 */
export async function initSiddurDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  // Check if the DB already exists in the default SQLite directory
  const dbFile = new File(Paths.document, "SQLite", "siddur.db");
  if (!dbFile.exists) {
    // Download the bundled asset
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const asset = Asset.fromModule(require("../../../assets/siddur.db"));
    await asset.downloadAsync();

    // Ensure the SQLite directory exists
    const sqliteDir = new Directory(Paths.document, "SQLite");
    if (!sqliteDir.exists) {
      sqliteDir.create({ intermediates: true });
    }

    // Copy asset to the SQLite directory
    if (asset.localUri) {
      const sourceFile = new File(asset.localUri);
      sourceFile.copy(dbFile);
    }
  }

  db = SQLite.openDatabaseSync("siddur.db");
  return db;
}

/**
 * Get the database instance. Throws if not yet initialized.
 * For synchronous access after initSiddurDb() has been awaited.
 */
export function getDb(): SQLite.SQLiteDatabase {
  if (!db) throw new Error("Siddur DB not initialized. Call initSiddurDb() first.");
  return db;
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags from Sefaria text, preserving the raw text content. */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Extract instruction text from <small> tags, then strip all HTML.
 * Returns { text, instruction } where instruction is the concatenated
 * <small> content (if any).
 */
export function parseTextAndInstructions(raw: string): {
  text: string;
  instruction: string | null;
} {
  const instructions: string[] = [];
  const withoutSmall = raw.replace(/<small>([\s\S]*?)<\/small>/gi, (_, content) => {
    instructions.push(stripHtml(content));
    return "";
  });

  return {
    text: stripHtml(withoutSmall),
    instruction: instructions.length > 0 ? instructions.join(" ") : null,
  };
}

// ---------------------------------------------------------------------------
// Siddur queries
// ---------------------------------------------------------------------------

/**
 * Get all leaf sections under a given parent path for a specific nusach.
 * E.g., getSections("ashkenaz", "Weekday.Shacharit.Amidah") returns all
 * Amidah brachos.
 */
export function getSections(
  nusach: string,
  parentPathPrefix: string
): SiddurSectionRow[] {
  const database = getDb();
  return database.getAllSync<SiddurSectionRow>(
    `SELECT * FROM siddur_sections
     WHERE nusach = ? AND path LIKE ?
     ORDER BY display_order`,
    [nusach, `${parentPathPrefix}.%`]
  );
}

/**
 * Get a single section by exact path and nusach.
 */
export function getSection(
  nusach: string,
  exactPath: string
): SiddurSectionRow | null {
  const database = getDb();
  return (
    database.getFirstSync<SiddurSectionRow>(
      `SELECT * FROM siddur_sections
       WHERE nusach = ? AND path = ?`,
      [nusach, exactPath]
    ) ?? null
  );
}

/**
 * Get all sections under a parent path, OR the section itself if it's a leaf.
 * This is the main query for assembling a tefila view.
 */
export function getSectionsForPath(
  nusach: string,
  pathPrefix: string
): SiddurSectionRow[] {
  const database = getDb();
  return database.getAllSync<SiddurSectionRow>(
    `SELECT * FROM siddur_sections
     WHERE nusach = ? AND (path = ? OR path LIKE ?)
     ORDER BY display_order`,
    [nusach, pathPrefix, `${pathPrefix}.%`]
  );
}

/**
 * Get immediate child nodes of a parent path.
 * Returns both branch nodes (with children) and leaf nodes.
 */
export function getChildNodes(
  nusach: string,
  parentPath: string
): SiddurNode[] {
  const database = getDb();

  if (!parentPath) {
    // Root level: get distinct first path segments
    const rows = database.getAllSync<{
      segment: string;
      section_name_he: string | null;
      cnt: number;
    }>(
      `SELECT
         SUBSTR(path, 1, INSTR(path || '.', '.') - 1) as segment,
         MIN(section_name_he) as section_name_he,
         COUNT(*) as cnt
       FROM siddur_sections
       WHERE nusach = ? AND source = 'siddur'
       GROUP BY segment
       ORDER BY MIN(display_order)`,
      [nusach]
    );
    return rows.map((r) => ({
      path: r.segment,
      name: r.segment,
      nameHe: r.section_name_he,
      isLeaf: r.cnt === 1,
      childCount: r.cnt,
    }));
  }

  // Get distinct next-level segments under parentPath
  const prefix = `${parentPath}.`;
  const prefixLen = prefix.length + 1; // +1 for SQL 1-indexed

  const rows = database.getAllSync<{
    segment: string;
    section_name_he: string | null;
    is_leaf: number;
    cnt: number;
  }>(
    `SELECT
       SUBSTR(path, ?, INSTR(SUBSTR(path, ?) || '.', '.') - 1) as segment,
       MIN(section_name_he) as section_name_he,
       SUM(CASE WHEN path = ? || '.' || SUBSTR(path, ?, INSTR(SUBSTR(path, ?) || '.', '.') - 1) THEN 1 ELSE 0 END) as is_leaf,
       COUNT(*) as cnt
     FROM siddur_sections
     WHERE nusach = ? AND path LIKE ?
     GROUP BY segment
     ORDER BY MIN(display_order)`,
    [prefixLen, prefixLen, parentPath, prefixLen, prefixLen, nusach, `${prefix}%`]
  );

  return rows.map((r) => ({
    path: `${parentPath}.${r.segment}`,
    name: r.segment,
    nameHe: r.section_name_he,
    isLeaf: r.is_leaf > 0 && r.cnt === 1,
    childCount: r.cnt,
  }));
}

/**
 * Get all top-level paths for a nusach (the root categories).
 */
export function getTopLevelPaths(nusach: string): SiddurNode[] {
  return getChildNodes(nusach, "");
}

/**
 * Search sections by text content (Hebrew or English).
 */
export function searchSections(
  nusach: string,
  query: string,
  limit = 50
): SiddurSectionRow[] {
  const database = getDb();
  return database.getAllSync<SiddurSectionRow>(
    `SELECT * FROM siddur_sections
     WHERE nusach = ?
       AND (text_hebrew LIKE ? OR text_english LIKE ? OR section_name LIKE ?)
     ORDER BY display_order
     LIMIT ?`,
    [nusach, `%${query}%`, `%${query}%`, `%${query}%`, limit]
  );
}

/**
 * Get sections from supplementary sources (tehillim, megillas, etc.).
 */
export function getSupplementarySections(
  source: string,
  pathPrefix?: string
): SiddurSectionRow[] {
  const database = getDb();
  if (pathPrefix) {
    return database.getAllSync<SiddurSectionRow>(
      `SELECT * FROM siddur_sections
       WHERE nusach = 'all' AND source = ? AND (path = ? OR path LIKE ?)
       ORDER BY display_order`,
      [source, pathPrefix, `${pathPrefix}.%`]
    );
  }
  return database.getAllSync<SiddurSectionRow>(
    `SELECT * FROM siddur_sections
     WHERE nusach = 'all' AND source = ?
     ORDER BY display_order`,
    [source]
  );
}

/**
 * Get total count of sections for a nusach.
 */
export function getSectionCount(nusach: string): number {
  const database = getDb();
  const row = database.getFirstSync<{ cnt: number }>(
    `SELECT COUNT(*) as cnt FROM siddur_sections WHERE nusach = ?`,
    [nusach]
  );
  return row?.cnt ?? 0;
}
