#!/usr/bin/env npx tsx
/**
 * Build step: compiles content/*.yaml into src/data/generated/prayers.ts.
 *
 * Reads:
 *   content/categories.yaml          (canonical category list + ordered tefila IDs)
 *   content/prayers/**\/*.yaml       (one tefila per file)
 *
 * Writes:
 *   src/data/generated/prayers.ts    (TEFILA_CATEGORIES, ALL_TEFILOS, helpers)
 *
 * Run via `npm run build:prayers`. Hooked into prestart/prebuild.
 */

import * as fs from "fs";
import * as path from "path";
import { parse } from "yaml";

const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const PRAYERS_DIR = path.join(CONTENT_DIR, "prayers");
const CATEGORIES_FILE = path.join(CONTENT_DIR, "categories.yaml");
const OUT_DIR = path.join(ROOT, "src/data/generated");
const OUT_FILE = path.join(OUT_DIR, "prayers.ts");

const VALID_CATEGORIES = new Set([
  "shacharis",
  "mincha",
  "maariv",
  "blessings",
  "tehillim",
  "holidays",
  "lifecycle",
  "other",
]);

const VALID_TIME_CONTEXTS = new Set(["shacharis", "mincha", "maariv", "anytime"]);

// ---------- types mirroring src/data/types.ts ----------

interface SectionYaml {
  id: string;
  title: string;
  titleHe: string;
  text: string | Record<string, string>;
  translation?: string | Record<string, string>;
  instruction?: string;
  instructionHe?: string;
}

interface TefilaYaml {
  id: string;
  name: string;
  nameHe: string;
  category: string;
  timeContext?: string;
  sections: SectionYaml[];
}

interface CategoryEntry {
  id: string;
  name: string;
  nameHe: string;
  icon: string;
  tefilos: string[];
}

interface CategoriesYaml {
  categories: CategoryEntry[];
}

// ---------- helpers ----------

function readYaml<T>(file: string): T {
  const raw = fs.readFileSync(file, "utf8");
  return parse(raw) as T;
}

function walkYamlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkYamlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".yaml")) {
      out.push(full);
    }
  }
  return out;
}

function validateTefila(t: TefilaYaml, file: string): void {
  const rel = path.relative(ROOT, file);
  if (!t.id) throw new Error(`${rel}: missing 'id'`);
  if (!t.name) throw new Error(`${rel}: missing 'name'`);
  if (!t.nameHe) throw new Error(`${rel}: missing 'nameHe'`);
  if (!t.category) throw new Error(`${rel}: missing 'category'`);
  if (!VALID_CATEGORIES.has(t.category)) {
    throw new Error(`${rel}: invalid category '${t.category}'`);
  }
  if (t.timeContext && !VALID_TIME_CONTEXTS.has(t.timeContext)) {
    throw new Error(`${rel}: invalid timeContext '${t.timeContext}'`);
  }
  if (!Array.isArray(t.sections)) {
    throw new Error(`${rel}: 'sections' must be an array`);
  }
  for (const s of t.sections) {
    if (!s.id) throw new Error(`${rel}: section missing 'id'`);
    if (s.title === undefined) throw new Error(`${rel}: section ${s.id} missing 'title'`);
    if (s.titleHe === undefined) throw new Error(`${rel}: section ${s.id} missing 'titleHe'`);
    // text may be missing for placeholder sections marked status: needs-text;
    // we default it to "" at emit time so the type is satisfied.
  }
}

// Emit a TS literal for any JSON-y value, using template literals for strings
// containing newlines so Hebrew is readable in the generated file too.
function emitValue(v: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (v === null) return "null";
  if (typeof v === "string") return emitString(v);
  if (typeof v === "number" || typeof v === "boolean") return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    const inner = v
      .map((item) => `${pad}  ${emitValue(item, indent + 1)},`)
      .join("\n");
    return `[\n${inner}\n${pad}]`;
  }
  if (typeof v === "object") {
    const entries = Object.entries(v as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const inner = entries
      .map(([k, val]) => `${pad}  ${emitKey(k)}: ${emitValue(val, indent + 1)},`)
      .join("\n");
    return `{\n${inner}\n${pad}}`;
  }
  throw new Error(`Cannot emit value of type ${typeof v}`);
}

function emitKey(k: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
}

function emitString(s: string): string {
  if (!s.includes("\n") && !s.includes("`") && !s.includes("${")) {
    return JSON.stringify(s);
  }
  // Use a template literal so multi-line Hebrew stays readable in the generated file.
  // Escape backticks and ${ sequences.
  const escaped = s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  return `\`${escaped}\``;
}

// ---------- main ----------

function main(): void {
  if (!fs.existsSync(CATEGORIES_FILE)) {
    throw new Error(`Missing ${path.relative(ROOT, CATEGORIES_FILE)}`);
  }
  if (!fs.existsSync(PRAYERS_DIR)) {
    throw new Error(`Missing ${path.relative(ROOT, PRAYERS_DIR)}`);
  }

  const cats = readYaml<CategoriesYaml>(CATEGORIES_FILE);
  if (!cats?.categories || !Array.isArray(cats.categories)) {
    throw new Error(`categories.yaml: expected top-level 'categories' array`);
  }

  const files = walkYamlFiles(PRAYERS_DIR);
  const byId = new Map<string, TefilaYaml>();
  for (const file of files) {
    const t = readYaml<TefilaYaml>(file);
    validateTefila(t, file);
    if (byId.has(t.id)) {
      throw new Error(`Duplicate tefila id '${t.id}' (${path.relative(ROOT, file)})`);
    }
    byId.set(t.id, t);
  }

  // Build ordered list. categories.yaml drives order. Tefilos not listed = warning.
  const orderedTefilos: TefilaYaml[] = [];
  const seen = new Set<string>();
  for (const cat of cats.categories) {
    for (const tid of cat.tefilos ?? []) {
      const t = byId.get(tid);
      if (!t) {
        throw new Error(`categories.yaml references unknown tefila id '${tid}'`);
      }
      if (t.category !== cat.id) {
        console.warn(
          `WARN: tefila '${tid}' has category='${t.category}' but is listed under '${cat.id}'`
        );
      }
      orderedTefilos.push(t);
      seen.add(tid);
    }
  }
  for (const id of byId.keys()) {
    if (!seen.has(id)) {
      console.warn(`WARN: tefila '${id}' is not listed in categories.yaml; it will not appear`);
    }
  }

  runContentGuards(orderedTefilos);

  const categoryInfos = cats.categories.map((c) => ({
    id: c.id,
    name: c.name,
    nameHe: c.nameHe,
    icon: c.icon,
  }));

  const tefilaObjects = orderedTefilos.map((t) => {
    const obj: Record<string, unknown> = {
      id: t.id,
      name: t.name,
      nameHe: t.nameHe,
      category: t.category,
    };
    if (t.timeContext) obj.timeContext = t.timeContext;
    obj.sections = t.sections.map((s) => {
      const so: Record<string, unknown> = {
        id: s.id,
        title: s.title,
        titleHe: s.titleHe,
      };
      if (s.instruction) so.instruction = s.instruction;
      if (s.instructionHe) so.instructionHe = s.instructionHe;
      so.text = s.text ?? "";
      if (s.translation !== undefined) so.translation = s.translation;
      return so;
    });
    return obj;
  });

  const header = `// AUTO-GENERATED by scripts/build-prayers.ts — do not edit.
// Source of truth: content/categories.yaml + content/prayers/**/*.yaml
// Regenerate with: npm run build:prayers

import type { Tefila, TefilaCategoryInfo } from "../types";

`;

  const body = `export const TEFILA_CATEGORIES: TefilaCategoryInfo[] = ${emitValue(categoryInfos)};

export const ALL_TEFILOS: Tefila[] = ${emitValue(tefilaObjects)};

export function getTefilosForTime(
  timeContext: "shacharis" | "mincha" | "maariv" | "anytime"
): Tefila[] {
  return ALL_TEFILOS.filter(
    (t) => t.timeContext === timeContext || t.timeContext === "anytime"
  );
}

export function getTefilaById(id: string): Tefila | undefined {
  return ALL_TEFILOS.find((t) => t.id === id);
}

export function getTefilosByCategory(
  category: Tefila["category"]
): Tefila[] {
  return ALL_TEFILOS.filter((t) => t.category === category);
}
`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, header + body, "utf8");
  console.log(
    `Built ${path.relative(ROOT, OUT_FILE)}: ${orderedTefilos.length} tefilos, ${categoryInfos.length} categories`
  );
}

/**
 * Guards for the defect classes that shipped silently before: sections with no
 * text, rubrics sitting inside `text`, and conditional insertions pointing at
 * section ids that no longer exist.
 *
 * Empty text and stray rubrics warn (the corpus is still being restored —
 * see docs/remaining-text.md). A dead insertion target FAILS the build, because
 * it makes seasonal text silently never appear, which is invisible at runtime.
 */
function runContentGuards(tefilos: TefilaYaml[]): void {
  let empty = 0;
  const rubricLeaks: string[] = [];
  const entityLeaks: string[] = [];
  const ENTITY = /&(?:[a-zA-Z][a-zA-Z0-9]{1,10}|#\d+|#x[0-9a-fA-F]+);/;
  const nikkud = /[ְ-ׇּׁׂ]/;

  for (const t of tefilos) {
    for (const s of t.sections ?? []) {
      const text = (s as { text?: string }).text ?? "";
      if (!text.trim()) {
        empty++;
        continue;
      }
      if (ENTITY.test(text)) {
        entityLeaks.push(`${s.id}: ${ENTITY.exec(text)?.[0]}`);
      }
      for (const line of text.split("\n")) {
        const trimmed = line.trim();
        // A line of Hebrew with no nikkud at all is a rubric, not liturgy.
        if (trimmed && /[א-ת]/.test(trimmed) && !nikkud.test(trimmed)) {
          rubricLeaks.push(`${s.id}: ${trimmed.slice(0, 48)}`);
          break;
        }
      }
    }
  }

  if (empty) {
    console.warn(`WARN: ${empty} sections have no text (see docs/remaining-text.md)`);
  }

  // An undecoded entity renders literally as "&thinsp;" mid-prayer, which
  // shipped once. Fail rather than warn — it is always a bug, never intended.
  if (entityLeaks.length) {
    throw new Error(
      `${entityLeaks.length} section(s) contain undecoded HTML entities:\n  ${entityLeaks
        .slice(0, 10)
        .join("\n  ")}`
    );
  }
  if (rubricLeaks.length) {
    console.warn(
      `WARN: ${rubricLeaks.length} sections have an unvocalized line inside 'text' (likely a rubric that belongs in instructionHe):`
    );
    for (const leak of rubricLeaks.slice(0, 10)) console.warn(`        ${leak}`);
    if (rubricLeaks.length > 10) console.warn(`        …and ${rubricLeaks.length - 10} more`);
  }

  // Conditional insertions must resolve, or seasonal text silently never fires.
  const sectionIds = new Set(
    tefilos.flatMap((t) => (t.sections ?? []).map((s) => s.id))
  );
  const insertionsFile = path.join(ROOT, "src/data/insertions.ts");
  if (fs.existsSync(insertionsFile)) {
    const source = fs.readFileSync(insertionsFile, "utf8");
    const targets = [...source.matchAll(/targetSectionId:\s*"([^"]+)"/g)].map(
      (m) => m[1]
    );
    const dead = [...new Set(targets)].filter((id) => !sectionIds.has(id));
    if (dead.length) {
      throw new Error(
        `insertions.ts targets ${dead.length} section id(s) that do not exist, so those insertions can never fire:\n  ${dead.join("\n  ")}`
      );
    }
  }
}

main();
