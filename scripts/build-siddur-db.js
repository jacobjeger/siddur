#!/usr/bin/env node
/**
 * build-siddur-db.js
 *
 * Reads the Sefaria-Export merged.json files for each nusach and flattens
 * them into a SQLite database that ships with the app.
 *
 * Usage:  node scripts/build-siddur-db.js
 * Output: assets/siddur.db
 */

const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const SEFARIA = path.join(__dirname, "..", "data", "sefaria-export", "json");
const OUT_DIR = path.join(__dirname, "..", "assets");
const DB_PATH = path.join(OUT_DIR, "siddur.db");

// Siddur sources: { nusach, heDir, enDir }
const SIDDUR_SOURCES = [
  {
    nusach: "ashkenaz",
    heDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Ashkenaz", "Hebrew"),
    enDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Ashkenaz", "English"),
  },
  {
    nusach: "sefard",
    heDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Sefard", "Hebrew"),
    enDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Sefard", "English"),
  },
  {
    nusach: "edot_hamizrach",
    heDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Edot HaMizrach", "Hebrew"),
    enDir: path.join(SEFARIA, "Liturgy", "Siddur", "Siddur Edot HaMizrach", "English"),
  },
  {
    nusach: "ari",
    heDir: path.join(SEFARIA, "Liturgy", "Siddur", "Weekday Siddur Chabad", "Hebrew"),
    enDir: path.join(SEFARIA, "Liturgy", "Siddur", "Weekday Siddur Chabad", "English"),
  },
];

// Supplementary text sources (not nusach-specific)
const SUPPLEMENTARY_SOURCES = [
  {
    source: "tehillim",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Psalms", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Psalms", "English"),
    pathPrefix: "Tehillim",
  },
  {
    source: "pirkei_avot",
    heDir: path.join(SEFARIA, "Mishnah", "Seder Nezikin", "Pirkei Avot", "Hebrew"),
    enDir: path.join(SEFARIA, "Mishnah", "Seder Nezikin", "Pirkei Avot", "English"),
    pathPrefix: "Pirkei Avot",
  },
  {
    source: "shir_hashirim",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Song of Songs", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Song of Songs", "English"),
    pathPrefix: "Shir HaShirim",
  },
  {
    source: "koheles",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Ecclesiastes", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Ecclesiastes", "English"),
    pathPrefix: "Koheles",
  },
  {
    source: "ruth",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Ruth", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Ruth", "English"),
    pathPrefix: "Ruth",
  },
  {
    source: "esther",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Esther", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Esther", "English"),
    pathPrefix: "Esther",
  },
  {
    source: "eichah",
    heDir: path.join(SEFARIA, "Tanakh", "Writings", "Lamentations", "Hebrew"),
    enDir: path.join(SEFARIA, "Tanakh", "Writings", "Lamentations", "English"),
    pathPrefix: "Eichah",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read a merged.json file safely. */
function readMerged(dir) {
  const p = path.join(dir, "merged.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/**
 * Build a map from English section name → Hebrew title using the schema.
 * The schema is a recursive tree of { heTitle, enTitle, nodes? }.
 */
function buildHebrewNameMap(schema) {
  const map = {};
  function walk(node) {
    if (node.enTitle && node.heTitle) {
      map[node.enTitle] = node.heTitle;
    }
    if (node.nodes) {
      for (const child of node.nodes) walk(child);
    }
  }
  if (schema) walk(schema);
  return map;
}

/**
 * Recursively flatten a nested siddur text object into rows.
 *
 * @param {object|array} obj       – current node in the JSON tree
 * @param {string}       basePath  – dot-separated path so far
 * @param {number}       depth     – nesting depth
 * @param {object}       counter   – { order: number } shared across recursion
 * @returns {Array<object>}  flat rows
 */
function flattenText(obj, basePath, depth, counter) {
  const rows = [];

  if (Array.isArray(obj)) {
    // Leaf node – this is actual text
    rows.push({
      path: basePath,
      section_name: basePath.split(".").pop(),
      parent_path: basePath.split(".").slice(0, -1).join("."),
      depth,
      display_order: counter.order++,
      paragraphs: obj, // array of strings
    });
    return rows;
  }

  if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      rows.push(...flattenText(value, currentPath, depth + 1, counter));
    }
  }

  return rows;
}

/**
 * For supplementary texts (Tanakh books), the merged.json has a different
 * structure: the `text` field is a nested array (chapters → verses).
 * We flatten each chapter as a separate section.
 */
function flattenChapteredText(textArr, pathPrefix, counter) {
  const rows = [];
  if (!Array.isArray(textArr)) return rows;

  for (let ch = 0; ch < textArr.length; ch++) {
    const chapter = textArr[ch];
    if (!chapter) continue;

    // Chapter can be array of verses (strings) or array of arrays
    const verses = Array.isArray(chapter) ? chapter : [chapter];
    const flatVerses = verses.flat().filter((v) => typeof v === "string" && v.length > 0);
    if (flatVerses.length === 0) continue;

    const chNum = ch + 1;
    const chPath = `${pathPrefix}.Chapter ${chNum}`;
    rows.push({
      path: chPath,
      section_name: `Chapter ${chNum}`,
      parent_path: pathPrefix,
      depth: 1,
      display_order: counter.order++,
      paragraphs: flatVerses,
    });
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log("Building siddur database...\n");

  // Ensure output directory
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Remove old DB if exists
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

  const db = new Database(DB_PATH);

  // Enable WAL for faster writes
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = OFF");

  // -----------------------------------------------------------------------
  // Create tables
  // -----------------------------------------------------------------------
  db.exec(`
    CREATE TABLE IF NOT EXISTS siddur_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nusach TEXT NOT NULL,           -- 'ashkenaz' | 'sefard' | 'edot_hamizrach' | 'ari'
      path TEXT NOT NULL,             -- e.g. 'Weekday.Shacharit.Amidah.Healing'
      section_name TEXT NOT NULL,     -- leaf node name, e.g. 'Healing'
      section_name_he TEXT,           -- Hebrew name from schema
      parent_path TEXT,               -- e.g. 'Weekday.Shacharit.Amidah'
      depth INTEGER NOT NULL,         -- nesting level
      display_order INTEGER NOT NULL, -- preserves original order
      text_hebrew TEXT,               -- joined paragraphs (\\n\\n separator)
      text_english TEXT,              -- joined English paragraphs
      source TEXT DEFAULT 'siddur'    -- 'siddur' | 'tehillim' | 'pirkei_avot' | etc.
    );

    CREATE INDEX idx_sections_nusach ON siddur_sections(nusach);
    CREATE INDEX idx_sections_path ON siddur_sections(path);
    CREATE INDEX idx_sections_parent ON siddur_sections(parent_path);
    CREATE INDEX idx_sections_source ON siddur_sections(source);
    CREATE INDEX idx_sections_nusach_path ON siddur_sections(nusach, path);
    CREATE INDEX idx_sections_order ON siddur_sections(nusach, display_order);

    CREATE TABLE IF NOT EXISTS siddur_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  const insertSection = db.prepare(`
    INSERT INTO siddur_sections
      (nusach, path, section_name, section_name_he, parent_path, depth, display_order, text_hebrew, text_english, source)
    VALUES
      (@nusach, @path, @section_name, @section_name_he, @parent_path, @depth, @display_order, @text_hebrew, @text_english, @source)
  `);

  const insertMeta = db.prepare(`
    INSERT OR REPLACE INTO siddur_meta (key, value) VALUES (?, ?)
  `);

  // -----------------------------------------------------------------------
  // Import siddur texts
  // -----------------------------------------------------------------------
  let totalSections = 0;

  for (const src of SIDDUR_SOURCES) {
    console.log(`Importing ${src.nusach}...`);

    const heData = readMerged(src.heDir);
    const enData = readMerged(src.enDir);

    if (!heData) {
      console.log(`  WARNING: No Hebrew merged.json for ${src.nusach}`);
      continue;
    }

    // Build Hebrew name map from schema
    const heNameMap = buildHebrewNameMap(heData.schema);

    // Flatten Hebrew text
    const heCounter = { order: 0 };
    const heRows = flattenText(heData.text, "", 0, heCounter);

    // Flatten English text into a path→text map for matching
    const enTextMap = {};
    if (enData) {
      const enCounter = { order: 0 };
      const enRows = flattenText(enData.text, "", 0, enCounter);
      for (const row of enRows) {
        enTextMap[row.path] = row.paragraphs;
      }
    }

    // Insert into DB
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        const enParagraphs = enTextMap[row.path] || [];
        insertSection.run({
          nusach: src.nusach,
          path: row.path,
          section_name: row.section_name,
          section_name_he: heNameMap[row.section_name] || null,
          parent_path: row.parent_path,
          depth: row.depth,
          display_order: row.display_order,
          text_hebrew: row.paragraphs.join("\n\n"),
          text_english: enParagraphs.join("\n\n") || null,
          source: "siddur",
        });
      }
    });

    insertMany(heRows);
    console.log(`  → ${heRows.length} sections imported`);
    totalSections += heRows.length;
  }

  // -----------------------------------------------------------------------
  // Import supplementary texts
  // -----------------------------------------------------------------------
  console.log("\nImporting supplementary texts...");

  for (const src of SUPPLEMENTARY_SOURCES) {
    const heData = readMerged(src.heDir);
    const enData = readMerged(src.enDir);

    if (!heData) {
      console.log(`  SKIP: No data for ${src.source}`);
      continue;
    }

    const counter = { order: 0 };
    let heRows;

    // Check if text is a nested array (chaptered books) or an object (structured)
    if (Array.isArray(heData.text)) {
      heRows = flattenChapteredText(heData.text, src.pathPrefix, counter);
    } else if (typeof heData.text === "object") {
      heRows = flattenText(heData.text, src.pathPrefix, 0, counter);
    } else {
      console.log(`  SKIP: Unexpected format for ${src.source}`);
      continue;
    }

    // English map
    const enTextMap = {};
    if (enData) {
      const enCounter = { order: 0 };
      let enRows;
      if (Array.isArray(enData.text)) {
        enRows = flattenChapteredText(enData.text, src.pathPrefix, enCounter);
      } else if (typeof enData.text === "object") {
        enRows = flattenText(enData.text, src.pathPrefix, 0, enCounter);
      }
      if (enRows) {
        for (const row of enRows) {
          enTextMap[row.path] = row.paragraphs;
        }
      }
    }

    // Hebrew name map
    const heNameMap = heData.schema ? buildHebrewNameMap(heData.schema) : {};

    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        const enParagraphs = enTextMap[row.path] || [];
        // Supplementary texts are nusach-agnostic – store under "all"
        insertSection.run({
          nusach: "all",
          path: row.path,
          section_name: row.section_name,
          section_name_he: heNameMap[row.section_name] || null,
          parent_path: row.parent_path,
          depth: row.depth,
          display_order: row.display_order,
          text_hebrew: row.paragraphs.join("\n\n"),
          text_english: enParagraphs.join("\n\n") || null,
          source: src.source,
        });
      }
    });

    insertMany(heRows);
    console.log(`  ${src.source}: ${heRows.length} sections`);
    totalSections += heRows.length;
  }

  // -----------------------------------------------------------------------
  // Store metadata
  // -----------------------------------------------------------------------
  insertMeta.run("build_date", new Date().toISOString());
  insertMeta.run("total_ротations", String(totalSections));
  insertMeta.run("sefaria_export_version", "latest");

  // Optimize
  db.pragma("journal_mode = DELETE");
  db.exec("VACUUM");

  const stats = fs.statSync(DB_PATH);
  console.log(`\n✓ Database built: ${DB_PATH}`);
  console.log(`  Total sections: ${totalSections}`);
  console.log(`  File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  db.close();
}

main();
