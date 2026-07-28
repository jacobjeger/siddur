import type { UserLocation } from "../services/location/types";

/**
 * Rough bounding box for Eretz Yisrael, used to auto-detect whether to keep
 * one day or two days of Yom Tov (and which V'Sein Tal U'Matar start date to
 * use). Deliberately generous — a user near the border who lands on the wrong
 * side can override this in Settings.
 */
const ISRAEL_BOUNDS = {
  minLat: 29.4,
  maxLat: 33.4,
  minLng: 34.2,
  maxLng: 35.9,
};

export function isLocationInIsrael(location: UserLocation | null): boolean {
  if (!location) return false;

  // The timezone is the stronger signal when it is available and unambiguous.
  if (location.timezone === "Asia/Jerusalem") return true;

  return (
    location.latitude >= ISRAEL_BOUNDS.minLat &&
    location.latitude <= ISRAEL_BOUNDS.maxLat &&
    location.longitude >= ISRAEL_BOUNDS.minLng &&
    location.longitude <= ISRAEL_BOUNDS.maxLng
  );
}

/**
 * Resolve the effective Israel/Diaspora setting: an explicit user override
 * wins, otherwise fall back to auto-detection.
 */
export function resolveInIsrael(
  override: boolean | null,
  location: UserLocation | null
): boolean {
  return override ?? isLocationInIsrael(location);
}
