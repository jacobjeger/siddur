#!/usr/bin/env npx tsx
/**
 * Formats prayer files by splitting instruction lines out of text fields
 * into proper instruction fields on separate sections.
 */

import * as fs from "fs";
import * as path from "path";

const PRAYERS_DIR = path.join(__dirname, "../src/data/prayers");

// Nikud Unicode range: U+0591 to U+05C7
const NIKUD_REGEX = /[\u0591-\u05C7]/g;

function hasNikud(line: string): boolean {
  const nikudCount = (line.match(NIKUD_REGEX) || []).length;
  // If more than 3 nikud marks, it's likely prayer text
  return nikudCount > 3;
}

// Short conditional/role markers that should stay inline in prayer text
const INLINE_MARKERS = [
  "בקיץ:", "בחורף:", "בשבת:", "בחול:", "בר\"ח:", "בר\"ה:",
  "בפסח:", "בשבועות:", "בסוכות:", "בחנוכה:", "בפורים:",
  "ביו\"ט:", "ביום טוב:", "בשמיני עצרת:",
  "לר\"ח:", "לפסח:", "לסכות:", "לשבת:", "לשלש רגלים:",
  "קהל וחזן:", "שליח ציבור:", "חזן:", "קהל:",
  "המזמן:", "המסובים:", "האבלים:", "הקהל:", "אבל:",
  "בעשרת ימי תשובה:", "בתענית ציבור",
];

function isShortConditionalOrRole(line: string): boolean {
  const trimmed = line.trim();
  // Check against known markers
  for (const marker of INLINE_MARKERS) {
    if (trimmed === marker || trimmed.startsWith(marker)) return true;
  }
  // Short lines (under 25 chars) ending with colon that start with ב/ל are likely conditional
  if (trimmed.length < 25 && trimmed.endsWith(":") && (trimmed.startsWith("ב") || trimmed.startsWith("ל"))) {
    return true;
  }
  return false;
}

function isInstructionLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // Lines in brackets are congregation responses - keep in text
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return false;

  // Lines in parentheses are inline conditionals - keep in text
  if (trimmed.startsWith("(") && trimmed.endsWith(")")) return false;

  // Short conditional markers and role markers stay inline
  if (isShortConditionalOrRole(trimmed)) return false;

  // Short inline conditional markers at start of line followed by nikud text
  const colonIdx = trimmed.indexOf(":");
  if (colonIdx > 0 && colonIdx < trimmed.length - 1) {
    const afterColon = trimmed.substring(colonIdx + 1).trim();
    const beforeColon = trimmed.substring(0, colonIdx).trim();
    if (hasNikud(afterColon) && beforeColon.length < 40 && !hasNikud(beforeColon)) {
      return false;
    }
  }

  // If the line has lots of nikud, it's prayer text
  if (hasNikud(trimmed)) return false;

  // Lines ending with colon that don't have nikud are likely instructions
  if (trimmed.endsWith(":") && !hasNikud(trimmed)) return true;

  // Long non-nikud lines are likely halachic commentary
  if (!hasNikud(trimmed) && trimmed.length > 60) return true;

  return false;
}

interface Section {
  id: string;
  title: string;
  titleHe: string;
  instruction?: string;
  text: string;
  translation?: string;
}

function processTextContent(section: Section): Section[] {
  const lines = section.text.split("\n");
  const results: Section[] = [];
  let currentInstruction: string[] = [];
  let currentText: string[] = [];
  let sectionCounter = 0;

  function flushSection() {
    if (currentText.length === 0 && currentInstruction.length === 0) return;

    const instrText = currentInstruction.join("\n").trim();
    const prayerText = currentText.join("\n").trim();

    if (!prayerText && instrText) {
      // Instruction with no following text - attach to previous section or skip
      if (results.length > 0) {
        // Append as trailing instruction note (keep it)
        return;
      }
      return;
    }

    if (prayerText) {
      const newSection: Section = {
        id: sectionCounter === 0 ? section.id : `${section.id}-${sectionCounter}`,
        title: sectionCounter === 0 ? section.title : section.title,
        titleHe: sectionCounter === 0 ? section.titleHe : section.titleHe,
        text: prayerText,
      };

      // Combine existing instruction with extracted instruction
      const existingInstr = sectionCounter === 0 ? section.instruction : undefined;
      const finalInstr = [existingInstr, instrText].filter(Boolean).join("\n");
      if (finalInstr) {
        newSection.instruction = finalInstr;
      }

      if (section.translation) {
        newSection.translation = section.translation;
      }

      results.push(newSection);
      sectionCounter++;
    }

    currentInstruction = [];
    currentText = [];
  }

  for (const line of lines) {
    if (isInstructionLine(line)) {
      // If we have accumulated text, flush the current section
      if (currentText.length > 0) {
        flushSection();
      }
      currentInstruction.push(line);
    } else {
      currentText.push(line);
    }
  }

  // Flush remaining
  flushSection();

  // If no splits were made, return original
  if (results.length === 0) {
    return [section];
  }

  return results;
}

function processFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Parse sections from the file using regex
  // Match section objects: { id: "...", title: "...", ... }
  const sectionRegex =
    /\{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*titleHe:\s*"([^"]+)",\s*\n(?:\s*instruction:\s*`([^`]*)`,\s*\n)?\s*text:\s*`([^`]*)`,\s*\n(?:\s*translation:\s*`([^`]*)`,\s*\n)?\s*\}/g;

  let modified = content;
  let match;
  const replacements: Array<{ original: string; replacement: string }> = [];

  while ((match = sectionRegex.exec(content)) !== null) {
    const section: Section = {
      id: match[1],
      title: match[2],
      titleHe: match[3],
      instruction: match[4],
      text: match[5],
      translation: match[6],
    };

    const processed = processTextContent(section);

    if (processed.length > 1 || (processed.length === 1 && processed[0].instruction !== section.instruction)) {
      const originalBlock = match[0];
      const newBlocks = processed
        .map((s) => {
          let block = `  {\n    id: "${s.id}",\n    title: "${s.title}",\n    titleHe: "${s.titleHe}",\n`;
          if (s.instruction) {
            block += `    instruction: \`${s.instruction}\`,\n`;
          }
          block += `    text: \`${s.text}\`,\n`;
          if (s.translation !== undefined) {
            block += `    translation: \`${s.translation}\`,\n`;
          }
          block += `  }`;
          return block;
        })
        .join(",\n");

      replacements.push({ original: originalBlock, replacement: newBlocks });
    }
  }

  // Apply replacements in reverse order to preserve positions
  for (const { original, replacement } of replacements.reverse()) {
    modified = modified.replace(original, replacement);
  }

  if (modified !== content) {
    // Remove the auto-generated comment since we're modifying
    modified = modified.replace(/^\/\/ Auto-generated by fetch-sefaria\.ts — do not edit manually\n/, "");
    fs.writeFileSync(filePath, modified, "utf-8");
    return true;
  }
  return false;
}

// Process all .ts files in the prayers directory
const files = fs.readdirSync(PRAYERS_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");

let modifiedCount = 0;
for (const file of files) {
  const filePath = path.join(PRAYERS_DIR, file);
  try {
    if (processFile(filePath)) {
      modifiedCount++;
      console.log(`  Modified: ${file}`);
    } else {
      console.log(`  No changes: ${file}`);
    }
  } catch (e) {
    console.error(`  Error processing ${file}:`, e);
  }
}

console.log(`\nDone. Modified ${modifiedCount} files.`);
