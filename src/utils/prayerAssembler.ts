import type { Tefila, PrayerSection, InsertionContext, ConditionalInsertion } from "../data/types";
import { ALL_INSERTIONS } from "../data/prayers/insertions";

/**
 * Assemble a final prayer by applying conditional insertions based on the current date context.
 * Returns a new Tefila with modified sections where applicable.
 */
export function assemblePrayer(
  baseTefila: Tefila,
  context: InsertionContext
): Tefila {
  // Find active insertions for this context
  const activeInsertions = ALL_INSERTIONS.filter((ins) => ins.condition(context));

  if (activeInsertions.length === 0) {
    return baseTefila;
  }

  // Apply insertions to sections
  const newSections: PrayerSection[] = [];

  for (const section of baseTefila.sections) {
    const sectionInsertions = activeInsertions.filter(
      (ins) => matchesSectionId(section.id, ins.targetSectionId)
    );

    if (sectionInsertions.length === 0) {
      newSections.push(section);
      continue;
    }

    // Process insertions for this section
    for (const insertion of sectionInsertions) {
      if (insertion.position === "before") {
        newSections.push(createInsertionSection(insertion));
      }
    }

    // Check for replacements
    const replacement = sectionInsertions.find((ins) => ins.position === "replace");
    if (replacement) {
      // For "replace" type, we modify the section's closing bracha text
      // This is used for HaMelech HaKadosh / HaMelech HaMishpat
      newSections.push({
        ...section,
        instruction: section.instruction
          ? `${section.instruction} [${replacement.name}]`
          : `[${replacement.name}]`,
      });
    } else {
      newSections.push(section);
    }

    for (const insertion of sectionInsertions) {
      if (insertion.position === "after") {
        newSections.push(createInsertionSection(insertion));
      }
    }
  }

  return {
    ...baseTefila,
    sections: newSections,
  };
}

/**
 * Get a list of active insertion names for display (badges in the UI).
 */
export function getActiveInsertionNames(
  context: InsertionContext
): string[] {
  return ALL_INSERTIONS
    .filter((ins) => ins.condition(context))
    .map((ins) => ins.name);
}

/**
 * Check if Tachanun should be said today.
 * Tachanun is omitted on Rosh Chodesh, holidays, Chol HaMoed,
 * Chanukah, Purim, and other occasions.
 */
export function shouldSayTachanun(context: InsertionContext): boolean {
  if (context.isRoshChodesh) return false;
  if (context.isCholHamoed) return false;
  if (context.holiday === "chanukah") return false;
  if (context.holiday === "purim") return false;
  if (context.isAseresYemeiTeshuva) return true; // Tachanun IS said during AYT
  return true;
}

/**
 * Determine if Hallel should be said, and which type.
 */
export function getHallelType(
  context: InsertionContext
): "full" | "half" | "none" {
  if (context.holiday === "chanukah") return "full";
  if (context.isRoshChodesh) return "half";
  if (context.isCholHamoed) return "half"; // Last 6 days of Pesach; Sukkos is full
  return "none";
}

// --- Helpers ---

function matchesSectionId(sectionId: string, targetId: string): boolean {
  // Match across service prefixes: se-gevuros matches se-mincha-gevuros, se-maariv-gevuros, etc.
  if (sectionId === targetId) return true;
  // Strip service prefix and compare
  const baseSectionId = sectionId.replace(/^se-(mincha|maariv)-/, "se-");
  return baseSectionId === targetId;
}

function createInsertionSection(insertion: ConditionalInsertion): PrayerSection {
  return {
    id: `insertion-${insertion.id}`,
    title: insertion.name,
    titleHe: insertion.nameHe,
    instruction: `[Conditional insertion: ${insertion.name}]`,
    text: insertion.text,
    translation: insertion.translation,
  };
}
