import type { Tefila, PrayerSection, InsertionContext, ConditionalInsertion } from "../data/types";
import { ALL_INSERTIONS } from "../data/insertions";

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

// Tachanun and Hallel live in src/utils/dayDavening.ts, which derives them
// from JewishCalendar. Duplicates previously lived here with materially wrong
// rules (Chol HaMoed Succos marked half Hallel; Tachanun missing Nissan, Lag
// BaOmer, Tu B'Av, Isru Chag and more). They had no callers and are removed.

// --- Helpers ---

/**
 * Insertions are declared against the Shacharis Amidah section ids, but the
 * same bracha recurs in Mincha and Maariv under a service-prefixed id
 * (`shacharis-amidah-09-shanim` vs `mincha-amidah-09-shanim`). Match on the
 * part after the service prefix so an insertion reaches every service.
 *
 * The previous implementation stripped an `se-` prefix that no id in the
 * corpus has used since the XLSX migration, so it matched nothing and Mincha
 * and Maariv received zero insertions — Ya'aleh V'Yavo, Al HaNissim, Aneinu
 * and Tal U'Matar could never appear there.
 */
const SERVICE_PREFIX = /^(shacharis|mincha|maariv)-/;

function matchesSectionId(sectionId: string, targetId: string): boolean {
  if (sectionId === targetId) return true;
  return sectionId.replace(SERVICE_PREFIX, "") === targetId.replace(SERVICE_PREFIX, "");
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
