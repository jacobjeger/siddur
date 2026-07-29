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
 * text, cue labels hoisted out of position, unbalanced brackets, undecoded
 * entities, and conditional insertions pointing at section ids that no longer
 * exist.
 *
 * Empty text warns (the corpus is still being restored — see
 * docs/remaining-text.md). Everything else FAILS, because each of them ships
 * liturgy that is actively wrong rather than merely missing, and none of them
 * is visible at runtime.
 *
 * Note rubrics INSIDE `text` are correct and expected — see
 * src/utils/sectionBlocks.ts.
 */
function runContentGuards(tefilos: TefilaYaml[]): void {
  let empty = 0;
  const hoistedCues: string[] = [];
  /**
   * Sections where the cue in `instructionHe` genuinely heads the whole
   * section, so there is no interleaving to lose. Verified by reading each one
   * — do not add to this list without doing the same.
   *
   * Anything NOT listed here and not repaired by scripts/restore-inline-cues.ts
   * is either damaged or unreviewed, and must fail rather than ship silently.
   */
  const LEADING_CUE_OK = new Set([
    "shacharis-vayehi-bnsoa", // one line of text; the cue heads it
    "shacharis-chatzi-kaddish-1", // section IS the kaddish
    "maariv-chatzi-kaddish-maariv",
    "mincha-chatzi-kaddish-mincha",
    "shacharis-avinu-malkeinu", // heads all 50 lines; per-line cues already inline
    "shacharis-lecha-hashem", // the paired response cue is already inline
    // Reviewed but NOT resolved — the cue may belong to an inner line. Listed
    // in docs/unverified-rules.md rather than guessed at.
    "shacharis-shema",
    "maariv-shema-maariv",
    "bedtime-shema-misc-shema-bedtime",
    "shacharis-ol-malchus-shamayim",
    "shacharis-tachanun-viddui-13-middos",
    "shacharis-tallis-bracha",
  ]);
  const orphanBrackets: string[] = [];
  const danglingBrachos: string[] = [];
  /**
   * A bracha over RECITING something — "לִקְרֹא אֶת הַהַלֵּל", "עַל מִקְרָא מְגִלָּה",
   * "לַעֲסוֹק בְּדִבְרֵי תוֹרָה". If the section holds essentially nothing else, it
   * prompts a bracha over a text that is not there, which is a berachah
   * levatalah rather than a cosmetic gap. `hallel-full` shipped exactly this:
   * the bracha לִקְרֹא אֶת הַהַלֵּל with none of Psalms 113-118 after it.
   *
   * Deliberately NOT every birchas hamitzvah: a bracha over an ACTION stands on
   * its own perfectly well, which is why netilas yadayim is a section of one
   * line and correct.
   */
  // Match on CONSONANTS, not vocalized forms. The first version demanded exact
  // nikkud and so missed לִגְמֹר אֶת הַהַלֵּל — the Ashkenaz wording for the very
  // section (Full Hallel) the guard was written for — and the plene מְגִילָּה.
  const RECITAL_BRACHA = /(לקרא|לקרוא|לגמר|לגמור|מקרא מגל|מקרא מגיל|לעסוק בדברי)/;
  const entityLeaks: string[] = [];
  const ENTITY = /&(?:[a-zA-Z][a-zA-Z0-9]{1,10}|#\d+|#x[0-9a-fA-F]+);/;
  const nikkud = /[ְ-ׇּׁׂ]/;

  for (const t of tefilos) {
    for (const s of t.sections ?? []) {
      const rawText = (s as { text?: unknown }).text;
      // `SectionYaml.text` is declared `string | Record<string,string>` for
      // future per-nusach variants. Calling .trim() on a map crashed the build
      // with an unactionable stack trace, so fail with something readable.
      if (rawText != null && typeof rawText !== "string") {
        throw new Error(
          `section '${s.id}' has a map-valued 'text'; per-nusach variants are not supported by the build yet`
        );
      }
      const text = (rawText as string) ?? "";

      // Check the non-text fields BEFORE the empty-text early exit. Skipping
      // them meant 44 of 174 sections — every empty one — passed every guard.
      const instructionHe = (s as { instructionHe?: string }).instructionHe ?? "";
      const instructionEn = (s as { instruction?: string }).instruction ?? "";
      for (const [field, value] of [
        ["text", text],
        ["instructionHe", instructionHe],
        ["instruction", instructionEn],
        ["title", (s as { title?: string }).title ?? ""],
        ["titleHe", (s as { titleHe?: string }).titleHe ?? ""],
        ["translation", (s as { translation?: string }).translation ?? ""],
      ] as [string, string][]) {
        if (ENTITY.test(value)) entityLeaks.push(`${s.id}.${field}: ${ENTITY.exec(value)?.[0]}`);
      }

      if (!text.trim()) {
        empty++;
        continue;
      }
      if (
        RECITAL_BRACHA.test(text.replace(/[^א-ת\s]/g, "")) &&
        text.replace(/[^א-ת]/g, "").length < 130
      ) {
        danglingBrachos.push(`${s.id}: ${text.trim().slice(0, 60)}`);
      }

      // An unclosed '[' means a '[קהל: אמן]' response was torn apart.
      for (const line of text.split("\n")) {
        const opens = (line.match(/\[/g) ?? []).length;
        const closes = (line.match(/\]/g) ?? []).length;
        if (opens !== closes) orphanBrackets.push(`${s.id}: ${line.trim().slice(0, 48)}`);
      }

      // A short label ending in ':' is a CUE — it selects the alternative that
      // follows it, so it is meaningless once separated from that text. Finding
      // one in `instructionHe` means it was hoisted out of position.
      for (const line of instructionHe.split("\n")) {
        const trimmed = line.trim();
        // Require the trailing colon: that is what distinguishes a cue ("בחנוכה:")
        // from a heading or gloss ("קדמות השם"), which may legitimately sit here.
        if (
          trimmed.length <= 40 &&
          /[א-ת]/.test(trimmed) &&
          !nikkud.test(trimmed) &&
          /[:：]$/.test(trimmed) &&
          !LEADING_CUE_OK.has(s.id)
        ) {
          hoistedCues.push(`${s.id}: ${trimmed}`);
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
  // Both of these produce liturgy that is wrong rather than merely incomplete
  // — a hoisted cue prints mutually exclusive alternatives as one run-on
  // sentence — so they fail the build instead of warning.
  if (orphanBrackets.length) {
    throw new Error(
      `${orphanBrackets.length} line(s) have an unbalanced bracket:\n  ${orphanBrackets
        .slice(0, 10)
        .join("\n  ")}`
    );
  }
  if (danglingBrachos.length) {
    throw new Error(
      `${danglingBrachos.length} section(s) are a bracha with no text after it ` +
        `(berachah levatalah — clear the text so the placeholder shows instead):\n  ` +
        danglingBrachos.join("\n  ")
    );
  }
  if (hoistedCues.length) {
    throw new Error(
      `${hoistedCues.length} cue label(s) sit in 'instructionHe' instead of inline in 'text'.\n` +
        `A cue selects the text that FOLLOWS it; hoisting it runs the alternatives together.\n  ` +
        hoistedCues.slice(0, 15).join("\n  ")
    );
  }

  // Conditional insertions must resolve, or seasonal text silently never fires.
  // Duplicate SECTION ids break the premise that a targetSectionId resolves to
  // exactly one section, and only duplicate TEFILA ids were being checked.
  const seenIds = new Map<string, string>();
  const duplicateIds: string[] = [];
  for (const t of tefilos) {
    for (const s of t.sections ?? []) {
      const owner = seenIds.get(s.id);
      if (owner) duplicateIds.push(`${s.id} (in '${owner}' and '${t.id}')`);
      else seenIds.set(s.id, t.id);
    }
  }
  if (duplicateIds.length) {
    throw new Error(
      `duplicate section id(s):\n  ${duplicateIds.join("\n  ")}`
    );
  }

  const sectionIds = new Set(
    tefilos.flatMap((t) => (t.sections ?? []).map((s) => s.id))
  );
  const insertionsFile = path.join(ROOT, "src/data/insertions.ts");
  if (fs.existsSync(insertionsFile)) {
    const source = fs.readFileSync(insertionsFile, "utf8");
    // Accept either quote style. Matching only double quotes meant a
    // single-quoted target bypassed the guard completely, so a dead insertion
    // would ship silently — the exact failure the guard exists to prevent.
    const targets = [...source.matchAll(/targetSectionId:\s*["']([^"']+)["']/g)].map(
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
