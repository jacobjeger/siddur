import type { TimeFormat } from "../stores/useSettingsStore";
import type { DayScope, MinyanTime, TefilaSlot } from "../services/minyanim/types";

export const SLOT_LABELS: Record<TefilaSlot, string> = {
  shacharis: "Shacharis",
  mincha: "Mincha",
  maariv: "Maariv",
  selichos: "Selichos",
};

export const DAY_SCOPE_LABELS: Record<DayScope, string> = {
  weekday: "Weekday",
  shabbos: "Shabbos",
  yom_tov: "Yom Tov",
  rosh_chodesh: "Rosh Chodesh",
};

/**
 * Minyan times are wall-clock at the shul ("HH:mm"), not instants, so they are
 * formatted directly rather than through a Date/timezone conversion.
 */
export function formatMinyanTime(time: string, format: TimeFormat): string {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour)) return time;

  if (format === "24h") return time;

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${suffix}`;
}

/** Group times by day scope, preserving a sensible display order. */
export function groupTimes(times: MinyanTime[]): [DayScope, MinyanTime[]][] {
  const order: DayScope[] = ["weekday", "shabbos", "yom_tov", "rosh_chodesh"];
  return order
    .map(
      (scope) =>
        [scope, times.filter((t) => t.dayScope === scope)] as [
          DayScope,
          MinyanTime[],
        ]
    )
    .filter(([, list]) => list.length > 0);
}
