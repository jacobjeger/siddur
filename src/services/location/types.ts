export type LocationSource = "gps" | "manual" | "fallback";

export interface UserLocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  name: string;
  timezone: string;
  /**
   * How this location was obtained. "fallback" means GPS was unavailable or
   * denied and DEFAULT_LOCATION was substituted — the UI must say so rather
   * than presenting it as the user's real location.
   */
  source: LocationSource;
}

export const DEFAULT_LOCATION: UserLocation = {
  latitude: 40.7128,
  longitude: -74.006,
  altitude: 0,
  name: "New York, NY",
  timezone: "America/New_York",
  source: "fallback",
};

export interface CitySearchResult {
  name: string;
  latitude: number;
  longitude: number;
}
