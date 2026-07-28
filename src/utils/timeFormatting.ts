import type { TimeFormat } from "../stores/useSettingsStore";

/**
 * Format a zman for display.
 *
 * `timeZone` must be the timezone the zman was CALCULATED for, not the
 * device's. Without it a zman computed for New York renders on, say, a
 * Jerusalem clock — which is what happened whenever the user travelled, set a
 * manual location, or fell back to the default location.
 */
export function formatZmanTime(
  date: Date | null,
  format: TimeFormat = "12h",
  timeZone?: string
): string {
  if (!date) return "--:--";

  if (format === "24h") {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "now";

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 1) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}
