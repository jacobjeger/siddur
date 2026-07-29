#!/usr/bin/env npx tsx
/**
 * Fail the build on hardcoded type sizes and radii in screen code.
 *
 * The token file existed for months and had no effect: 99 hardcoded `fontSize`
 * literals against 5 that came from the scale, in 13 distinct sizes, six of
 * which had no token at all. `type.title` and `type.heading` had zero usages
 * while their values were hardcoded 14 and 3 times. A system nobody is obliged
 * to go through is not a system — hence this.
 */
import * as fs from "fs";
import * as path from "path";

const ROOTS = ["app", "src/components"];
/** 2dp dot indicators are geometry, not a radius token. */
const RADIUS_ALLOWED = new Set([2]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const problems: string[] = [];
for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    fs.readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        // `fontSize: textSize * 1.15` is a ratio and is correct; only bare
        // numeric literals are banned.
        const font = line.match(/fontSize:\s*(\d+)(?!\s*\*)/);
        if (font) problems.push(`${file}:${i + 1}  fontSize: ${font[1]} — use typeScale.*`);
        const rad = line.match(/borderRadius:\s*(\d+)/);
        if (rad && !RADIUS_ALLOWED.has(Number(rad[1]))) {
          problems.push(`${file}:${i + 1}  borderRadius: ${rad[1]} — use radius.*`);
        }
      });
  }
}

if (problems.length) {
  console.error(
    `${problems.length} hardcoded design value(s); they must come from src/theme/tokens.ts:\n  ` +
      problems.join("\n  ")
  );
  process.exit(1);
}
console.log("tokens: no hardcoded font sizes or radii in app/ or src/components/");
