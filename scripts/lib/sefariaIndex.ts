/**
 * Resolve the `sourceRef` values stored in content/prayers/*.yaml against the
 * real Sefaria node tree.
 *
 * Most stored refs are one level too shallow — the xlsx recorded
 *   "Siddur Ashkenaz, Weekday, Shacharit, Torah Reading, Torah Blessings"
 * where the actual leaf is
 *   "Siddur Ashkenaz, Weekday, Shacharit, Torah Reading, Reading from Sefer, Birkat HaTorah"
 * The v3 API rejects the former as a "complex book-level ref", which is why a
 * naive fetch only resolved 26 of 66. Matching against the index recovers the
 * rest without inventing anything.
 */

const INDEX_API = "https://www.sefaria.org/api/index";

export interface LeafNode {
  ref: string;
  segments: string[];
}

interface SchemaNode {
  title?: string;
  nodes?: SchemaNode[];
}

export async function fetchLeafRefs(book: string): Promise<LeafNode[]> {
  const res = await fetch(`${INDEX_API}/${encodeURIComponent(book.replace(/ /g, "_"))}`);
  if (!res.ok) throw new Error(`index fetch failed: HTTP ${res.status}`);
  const data = (await res.json()) as { schema?: SchemaNode };

  const leaves: LeafNode[] = [];
  const walk = (node: SchemaNode, trail: string[]) => {
    const title = node.title ?? "";
    const next = title ? [...trail, title] : trail;
    if (node.nodes?.length) {
      for (const child of node.nodes) walk(child, next);
    } else if (next.length) {
      leaves.push({ ref: next.join(", "), segments: next });
    }
  };
  if (data.schema) walk(data.schema, []);
  return leaves;
}

function canon(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Score how well a stored ref matches a real leaf.
 *
 * The last segment carries most of the signal (it names the prayer), so it is
 * weighted heavily; the surrounding path disambiguates between Weekday/Shabbat
 * and Shacharit/Mincha/Maariv copies of the same prayer.
 */
function score(stored: string[], leaf: LeafNode): number {
  const storedLast = canon(stored[stored.length - 1] ?? "");
  const leafLast = canon(leaf.segments[leaf.segments.length - 1] ?? "");
  if (!storedLast || !leafLast) return 0;

  let last = 0;
  if (storedLast === leafLast) last = 100;
  else if (leafLast.includes(storedLast) || storedLast.includes(leafLast)) last = 65;
  else {
    const a = new Set(storedLast.split(" "));
    const b = new Set(leafLast.split(" "));
    const shared = [...a].filter((w) => b.has(w)).length;
    if (!shared) return 0;
    last = (shared / Math.max(a.size, b.size)) * 45;
  }

  // Reward shared path context (Weekday vs Shabbat, Shacharit vs Mincha).
  const leafCanon = leaf.segments.map(canon);
  let context = 0;
  for (const segment of stored.slice(0, -1)) {
    if (leafCanon.includes(canon(segment))) context += 8;
  }

  return last + Math.min(context, 32);
}

export interface ResolveResult {
  ref: string;
  exact: boolean;
  confidence: number;
}

export function resolveRef(
  storedRef: string,
  leaves: LeafNode[]
): ResolveResult | null {
  const stored = storedRef.split(",").map((s) => s.trim());

  const exact = leaves.find((l) => canon(l.ref) === canon(storedRef));
  if (exact) return { ref: exact.ref, exact: true, confidence: 100 };

  let best: LeafNode | null = null;
  let bestScore = 0;
  for (const leaf of leaves) {
    const s = score(stored, leaf);
    if (s > bestScore) {
      bestScore = s;
      best = leaf;
    }
  }

  // Below this the match is a guess, and a wrong prayer is worse than none.
  if (!best || bestScore < 70) return null;
  return { ref: best.ref, exact: false, confidence: Math.round(bestScore) };
}
