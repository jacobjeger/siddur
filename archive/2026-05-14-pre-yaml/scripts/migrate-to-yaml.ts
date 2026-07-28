#!/usr/bin/env npx tsx
/**
 * One-time migration: TS prayer data -> YAML content files.
 *
 * Reads ALL_TEFILOS and TEFILA_CATEGORIES from the current src/data,
 * writes:
 *   - content/prayers/{category}/{id}.yaml  (one file per tefila)
 *   - content/categories.yaml               (categories + per-category ordered tefila IDs)
 *
 * Run once: `npx tsx scripts/migrate-to-yaml.ts`
 */

import * as fs from "fs";
import * as path from "path";
import { stringify } from "yaml";

import { ALL_TEFILOS } from "../src/data/prayers";
import { TEFILA_CATEGORIES } from "../src/data/categories";
import type { Tefila, PrayerSection } from "../src/data/types";

const CONTENT_DIR = path.resolve(__dirname, "../content");
const PRAYERS_DIR = path.join(CONTENT_DIR, "prayers");

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function stripEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.length === 0) continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

function sectionToYamlObject(s: PrayerSection): Record<string, unknown> {
  return stripEmpty({
    id: s.id,
    title: s.title,
    titleHe: s.titleHe,
    instruction: s.instruction,
    instructionHe: s.instructionHe,
    text: s.text,
    translation: s.translation,
  });
}

function tefilaToYamlObject(t: Tefila): Record<string, unknown> {
  return {
    id: t.id,
    name: t.name,
    nameHe: t.nameHe,
    category: t.category,
    ...(t.timeContext ? { timeContext: t.timeContext } : {}),
    sections: t.sections.map(sectionToYamlObject),
  };
}

function writeTefilaYaml(t: Tefila): string {
  const dir = path.join(PRAYERS_DIR, t.category);
  ensureDir(dir);
  const file = path.join(dir, `${t.id}.yaml`);
  const yamlText = stringify(tefilaToYamlObject(t), {
    lineWidth: 0, // never line-wrap long Hebrew lines
    blockQuote: "literal", // use | block scalars for multiline strings
    minContentWidth: 0,
  });
  fs.writeFileSync(file, yamlText, "utf8");
  return file;
}

function writeCategoriesYaml(): string {
  // Preserve current ordering: walk ALL_TEFILOS, group by category in encounter order.
  const idsByCategory = new Map<string, string[]>();
  for (const t of ALL_TEFILOS) {
    const list = idsByCategory.get(t.category) ?? [];
    list.push(t.id);
    idsByCategory.set(t.category, list);
  }

  const categories = TEFILA_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    nameHe: c.nameHe,
    icon: c.icon,
    tefilos: idsByCategory.get(c.id) ?? [],
  }));

  const knownIds = new Set(TEFILA_CATEGORIES.map((c) => c.id));
  for (const cat of idsByCategory.keys()) {
    if (!knownIds.has(cat as never)) {
      console.warn(
        `WARN: tefilos with category "${cat}" have no matching entry in TEFILA_CATEGORIES`
      );
    }
  }

  const yamlText = stringify(
    { categories },
    { lineWidth: 0, blockQuote: "literal" }
  );
  const file = path.join(CONTENT_DIR, "categories.yaml");
  fs.writeFileSync(file, yamlText, "utf8");
  return file;
}

function main(): void {
  ensureDir(CONTENT_DIR);
  ensureDir(PRAYERS_DIR);

  console.log(`Migrating ${ALL_TEFILOS.length} tefilos to YAML...`);

  for (const t of ALL_TEFILOS) {
    const file = writeTefilaYaml(t);
    console.log(`  ${path.relative(process.cwd(), file)}`);
  }

  const catFile = writeCategoriesYaml();
  console.log(`Wrote ${path.relative(process.cwd(), catFile)}`);

  console.log(`Done. ${ALL_TEFILOS.length} tefilos written.`);
}

main();
