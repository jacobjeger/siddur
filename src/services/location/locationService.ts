import * as Location from "expo-location";
import tzlookup from "tz-lookup";
import {
  DEFAULT_LOCATION,
  type CitySearchResult,
  type UserLocation,
} from "./types";

/** Give up on a GPS fix after this long and fall back to last-known. */
const GPS_TIMEOUT_MS = 10_000;

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

/**
 * Resolve the timezone for a coordinate pair. The device timezone is wrong for
 * any manually-set or fallback location, and for a user who has travelled
 * without the OS catching up.
 */
export function timezoneForCoordinates(
  latitude: number,
  longitude: number
): string {
  try {
    return tzlookup(latitude, longitude);
  } catch {
    return (
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "America/New_York"
    );
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export interface ManualLocationInput {
  lat: number;
  lng: number;
  name: string;
}

/**
 * Build a UserLocation for an explicitly chosen place.
 */
export function buildManualLocation(
  manual: ManualLocationInput
): UserLocation {
  return {
    latitude: manual.lat,
    longitude: manual.lng,
    altitude: 0,
    name: manual.name,
    timezone: timezoneForCoordinates(manual.lat, manual.lng),
    source: "manual",
  };
}

export async function getCurrentLocation(
  manual?: ManualLocationInput | null
): Promise<UserLocation> {
  // An explicit manual location always wins — no permission prompt, no GPS.
  if (manual) return buildManualLocation(manual);

  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return DEFAULT_LOCATION;

    // getCurrentPositionAsync can hang indefinitely with no signal, which used
    // to leave the app on a permanent spinner.
    let position = await withTimeout(
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      }),
      GPS_TIMEOUT_MS
    );

    if (!position) {
      position = await Location.getLastKnownPositionAsync();
    }

    if (!position) return DEFAULT_LOCATION;

    const { latitude, longitude, altitude } = position.coords;
    const name = await getLocationName(latitude, longitude);

    return {
      latitude,
      longitude,
      altitude,
      name,
      timezone: timezoneForCoordinates(latitude, longitude),
      source: "gps",
    };
  } catch (error) {
    console.warn("Failed to get location, using default:", error);
    return DEFAULT_LOCATION;
  }
}

export async function getLocationName(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const results = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (results.length > 0) {
      const place = results[0];
      const parts = [place.city, place.region].filter(Boolean);
      return parts.join(", ") || "Unknown Location";
    }
    return "Unknown Location";
  } catch {
    return "Unknown Location";
  }
}

/**
 * Forward-geocode a free-text place name for the manual location picker.
 */
export async function searchCities(
  query: string
): Promise<CitySearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  try {
    const results = await Location.geocodeAsync(trimmed);
    const named = await Promise.all(
      results.slice(0, 5).map(async (r) => ({
        name: await getLocationName(r.latitude, r.longitude),
        latitude: r.latitude,
        longitude: r.longitude,
      }))
    );

    // reverseGeocode can return the same city for nearby hits; de-duplicate.
    const seen = new Set<string>();
    return named.filter((r) => {
      const key = `${r.name}|${r.latitude.toFixed(2)},${r.longitude.toFixed(2)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch {
    return [];
  }
}
