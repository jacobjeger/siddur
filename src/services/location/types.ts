export interface UserLocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  name: string;
  timezone: string;
}

export const DEFAULT_LOCATION: UserLocation = {
  latitude: 40.6892,
  longitude: -74.0445,
  altitude: 0,
  name: "New York, NY",
  timezone: "America/New_York",
};
