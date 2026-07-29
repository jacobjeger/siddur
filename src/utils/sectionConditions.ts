import type { PrayerSection } from "../data/types";
import type { DayDaveningInfo } from "./dayDavening";

/**
 * Whether a section is said today.
 *
 * Section-level conditions used to be English prose in `instruction` —
 * "OMIT on days with no Tachanun", "Rosh Chodesh only", "Long Tachanun Monday
 * and Thursday only" — which nothing could act on. The reader had no day
 * filtering at all, so on Tu B'Av the Today panel printed "Tachanun: Not said"
 * and the reader then rendered all three Tachanun sections. The app
 * contradicted itself on the same day.
 *
 * The vocabulary deliberately keys off the day-rules that already exist in
 * `dayDavening.ts` rather than inventing a second rule engine beside them. A
 * section names a rule; the rule stays in one place and is swept by the tests.
 */
export interface SectionCondition {
  /** A named day-rule that must hold. */
  rule?: ConditionRule;
  /** 1 = Sunday … 7 = Shabbos, matching JewishCalendar.getDayOfWeek(). */
  weekdays?: number[];
  /** Requires a minyan (chazaras hashatz, Barchu, Kedusha). */
  minyan?: boolean;
}

export type ConditionRule =
  | "tachanun"
  | "tachanunShacharis"
  | "roshChodesh"
  | "avinuMalkeinu"
  | "ldovid"
  | "avHaRachamim";

/** Everything a condition can be evaluated against. */
export interface ConditionContext {
  day: DayDaveningInfo;
  /** 1 = Sunday … 7 = Shabbos, on the same basis as the Hebrew date. */
  dayOfWeek: number;
  /** Whether the user is davening with a minyan. */
  withMinyan: boolean;
}

const RULES: Record<ConditionRule, (context: ConditionContext) => boolean> = {
  // Said at all today, at either tefilla. Tachanun is per-tefillah, so a
  // section that belongs to Shacharis specifically uses tachanunShacharis.
  tachanun: ({ day }) =>
    day.sayTachanun.shacharis || day.sayTachanun.mincha,
  tachanunShacharis: ({ day }) => day.sayTachanun.shacharis,
  roshChodesh: ({ day }) => day.isRoshChodesh,
  avinuMalkeinu: ({ day }) => day.isAvinuMalkeinu,
  ldovid: ({ day }) => day.ldovid.said,
  avHaRachamim: ({ day }) => day.isAvHaRachamim,
};

export const KNOWN_RULES = Object.keys(RULES) as ConditionRule[];

/**
 * A section with no `when` is always said. Absence must mean "say it": a typo
 * in a rule name should never silently remove liturgy, which is why the build
 * guard rejects unknown rules rather than letting them evaluate to false here.
 */
export function isSectionSaid(
  section: Pick<PrayerSection, "when">,
  context: ConditionContext
): boolean {
  const when = section.when;
  if (!when) return true;

  if (when.rule) {
    const evaluate = RULES[when.rule as ConditionRule];
    // Unknown rule: say the section. Losing liturgy is the worse failure.
    if (!evaluate) return true;
    if (!evaluate(context)) return false;
  }

  if (when.weekdays && !when.weekdays.includes(context.dayOfWeek)) return false;

  if (when.minyan && !context.withMinyan) return false;

  return true;
}
