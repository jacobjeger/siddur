#!/usr/bin/env npx tsx
/**
 * Convert siddur-text-template-updated.xlsx -> content/prayers-from-xlsx/*.yaml
 *
 * One YAML file per sheet (= one tefila). Divider rows ("── X ──") become the
 * `group` label on subsequent sections. Data rows become PrayerSections.
 *
 * Output is staged in `content/prayers-from-xlsx/` so it doesn't overwrite the
 * existing `content/prayers/`. Once verified, swap by:
 *   rm -r content/prayers && mv content/prayers-from-xlsx content/prayers
 * and update content/categories.yaml accordingly.
 *
 * Usage: npx tsx scripts/xlsx-to-yaml.ts
 */

import * as fs from "fs";
import * as path from "path";
import { stringify } from "yaml";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require("xlsx");

const ROOT = path.resolve(__dirname, "..");
const XLSX_FILE = path.join(ROOT, "siddur-text-template-updated.xlsx");
const STAGING_DIR = path.join(ROOT, "content/prayers-from-xlsx");

// Per-sheet tefila-level metadata. Not in the workbook today.
// If you add sheets, extend this map.
interface SheetMeta {
  id: string;
  nameHe: string;
  category: "shacharis" | "mincha" | "maariv" | "blessings" | "lifecycle" | "other";
  timeContext?: "shacharis" | "mincha" | "maariv" | "anytime";
}

const SHEET_META: Record<string, SheetMeta> = {
  Shacharis: { id: "shacharis", nameHe: "שחרית", category: "shacharis", timeContext: "shacharis" },
  Mincha: { id: "mincha", nameHe: "מנחה", category: "mincha", timeContext: "mincha" },
  Maariv: { id: "maariv", nameHe: "מעריב", category: "maariv", timeContext: "maariv" },
  "Birchas HaMazon": {
    id: "birchas-hamazon",
    nameHe: "ברכת המזון",
    category: "blessings",
    timeContext: "anytime",
  },
  "Bedtime Shema & Misc": {
    id: "bedtime-shema-misc",
    nameHe: "קריאת שמע על המיטה ושונות",
    category: "other",
    timeContext: "anytime",
  },
};

// Expected column order in each data sheet (0-indexed)
const COL = {
  sectionNum: 0,
  sectionKey: 1,
  nameEn: 2,
  nameHe: 3,
  type: 4,
  hebrewText: 5,
  englishText: 6,
  instrHe: 7,
  instrEn: 8,
  conditional: 9,
  condition: 10,
  sefariaRef: 11,
  status: 12,
} as const;

function isDivider(row: unknown[]): boolean {
  const a = String(row[COL.sectionNum] ?? "");
  return a.includes("──") && !row[COL.sectionKey];
}

function dividerLabel(row: unknown[]): string {
  // "── PRE-DAVENING ──" → "Pre-Davening"
  const raw = String(row[COL.sectionNum] ?? "");
  const stripped = raw.replace(/──/g, "").trim();
  // Title-case the result so "PRE-DAVENING" → "Pre-Davening"
  return stripped
    .split(/\s+/)
    .map((word) =>
      word
        .split("-")
        .map((part) =>
          part.length > 0
            ? part[0].toUpperCase() + part.slice(1).toLowerCase()
            : part
        )
        .join("-")
    )
    .join(" ");
}

function normalizeCellText(v: unknown): string {
  // Excel often returns text with \r\n; normalize to \n and strip trailing whitespace
  // on each line, then drop leading/trailing blank lines.
  return String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/^\n+|\n+$/g, "");
}

function isEmpty(v: unknown): boolean {
  return v === undefined || v === null || String(v).trim() === "";
}

function isDataRow(row: unknown[]): boolean {
  if (isDivider(row)) return false;
  // A data row has at minimum a section key OR an English name.
  return !isEmpty(row[COL.sectionKey]) || !isEmpty(row[COL.nameEn]);
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function stripEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

interface SectionOut {
  id: string;
  title: string;
  titleHe: string;
  group?: string;
  text: string;
  translation?: string;
  instruction?: string;
  instructionHe?: string;
  sourceRef?: string;
  status?: string;
}

interface TefilaOut {
  id: string;
  name: string;
  nameHe: string;
  category: string;
  timeContext?: string;
  sections: SectionOut[];
}

function main(): { tefilos: TefilaOut[]; stats: Array<Record<string, unknown>> } {
  if (!fs.existsSync(XLSX_FILE)) {
    throw new Error(`Missing ${path.relative(ROOT, XLSX_FILE)}`);
  }
  const wb = XLSX.readFile(XLSX_FILE);

  const tefilos: TefilaOut[] = [];
  const stats: Array<Record<string, unknown>> = [];

  for (const sheetName of wb.SheetNames) {
    if (sheetName === "Instructions") continue;
    const meta = SHEET_META[sheetName];
    if (!meta) {
      console.warn(`No SHEET_META for '${sheetName}', skipping`);
      continue;
    }
    const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
      header: 1,
      blankrows: false,
      defval: "",
    });

    let currentGroup = "";
    let dividerCount = 0;
    let sectionCount = 0;
    let withHebrew = 0;
    const seenIds = new Set<string>();
    const sections: SectionOut[] = [];

    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (isDivider(r)) {
        currentGroup = dividerLabel(r);
        dividerCount++;
        continue;
      }
      if (!isDataRow(r)) continue;

      const key = String(r[COL.sectionKey] ?? "").trim();
      const nameEn = String(r[COL.nameEn] ?? "").trim();
      const idBase = key || slug(nameEn) || `${meta.id}-row-${i}`;
      let id = `${meta.id}-${slug(idBase)}`;
      // dedupe
      let n = 1;
      while (seenIds.has(id)) {
        id = `${meta.id}-${slug(idBase)}-${++n}`;
      }
      seenIds.add(id);

      const hebrewText = normalizeCellText(r[COL.hebrewText]);
      const englishText = normalizeCellText(r[COL.englishText]);
      const instrHe = normalizeCellText(r[COL.instrHe]);
      const instrEn = normalizeCellText(r[COL.instrEn]);
      const sefariaRef = normalizeCellText(r[COL.sefariaRef]);
      const status = normalizeCellText(r[COL.status]);

      if (hebrewText) withHebrew++;

      const section: SectionOut = stripEmpty({
        id,
        title: nameEn,
        titleHe: String(r[COL.nameHe] ?? "").trim(),
        group: currentGroup || undefined,
        instruction: instrEn || undefined,
        instructionHe: instrHe || undefined,
        text: hebrewText, // may be empty — that's the "missing" signal
        translation: englishText || undefined,
        sourceRef: sefariaRef || undefined,
        status: status || (hebrewText ? undefined : "needs-text"),
      }) as SectionOut;

      sections.push(section);
      sectionCount++;
    }

    tefilos.push({
      id: meta.id,
      name: sheetName,
      nameHe: meta.nameHe,
      category: meta.category,
      ...(meta.timeContext ? { timeContext: meta.timeContext } : {}),
      sections,
    });

    stats.push({
      sheet: sheetName,
      tefilaId: meta.id,
      dividers: dividerCount,
      sections: sectionCount,
      withHebrew,
      missingHebrew: sectionCount - withHebrew,
    });
  }

  return { tefilos, stats };
}

function writeYaml(t: TefilaOut): string {
  // Strip undefined before serialize to keep YAML clean.
  const obj: Record<string, unknown> = stripEmpty({
    id: t.id,
    name: t.name,
    nameHe: t.nameHe,
    category: t.category,
    timeContext: t.timeContext,
    sections: t.sections.map((s) =>
      stripEmpty({
        id: s.id,
        title: s.title,
        titleHe: s.titleHe,
        group: s.group,
        instruction: s.instruction,
        instructionHe: s.instructionHe,
        text: s.text || "",
        translation: s.translation,
        sourceRef: s.sourceRef,
        status: s.status,
      })
    ),
  });
  return stringify(obj, { lineWidth: 0, blockQuote: "literal", minContentWidth: 0 });
}

const { tefilos, stats } = main();

ensureDir(STAGING_DIR);
for (const t of tefilos) {
  const file = path.join(STAGING_DIR, `${t.id}.yaml`);
  fs.writeFileSync(file, writeYaml(t), "utf8");
  console.log(`  wrote ${path.relative(ROOT, file)}`);
}

console.log("\nSummary:");
console.table(stats);
console.log(
  `\nStaged in ${path.relative(ROOT, STAGING_DIR)}/ — review, then swap with content/prayers/.`
);
