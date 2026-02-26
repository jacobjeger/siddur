import * as Location from "expo-location";
import { DEFAULT_LOCATION, type UserLocation } from "./types";

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

export async function getCurrentLocation(): Promise<UserLocation> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return DEFAULT_LOCATION;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const name = await getLocationName(
      location.coords.latitude,
      location.coords.longitude
    );

    // Get timezone from the device
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      name,
      timezone,
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
