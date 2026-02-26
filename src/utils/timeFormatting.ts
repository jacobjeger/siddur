import type { TimeFormat } from "../stores/useSettingsStore";

export function formatZmanTime(
  date: Date | null,
  format: TimeFormat = "12h"
): string {
  if (!date) return "--:--";

  if (format === "24h") {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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
