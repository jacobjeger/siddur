import {
  ComplexZmanimCalendar,
  GeoLocation,
} from "kosher-zmanim";
import type { UserLocation } from "../location/types";
import type { ZmanimData } from "./types";

function toJSDate(dateTime: unknown): Date | null {
  if (!dateTime) return null;
  try {
    // kosher-zmanim returns Luxon DateTime objects with toJSDate()
    if (
      typeof dateTime === "object" &&
      dateTime !== null &&
      "toJSDate" in dateTime &&
      typeof (dateTime as Record<string, unknown>).toJSDate === "function"
    ) {
      return (dateTime as { toJSDate: () => Date }).toJSDate();
    }
    if (dateTime instanceof Date) return dateTime;
    return null;
  } catch {
    return null;
  }
}

export function getZmanimForDate(
  location: UserLocation,
  date: Date = new Date()
): ZmanimData {
  const geoLocation = new GeoLocation(
    location.name,
    location.latitude,
    location.longitude,
    location.altitude ?? 0,
    location.timezone
  );

  const calendar = new ComplexZmanimCalendar(geoLocation);

  // kosher-zmanim setDate accepts Luxon DateTime or JS Date
  // The library internally uses the date from the GeoLocation/Calendar construction
  // For a different date, we need to pass a Luxon DateTime
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DateTime } = require("luxon");
    const luxonDate = DateTime.fromJSDate(date).setZone(location.timezone);
    calendar.setDate(luxonDate);
  } catch {
    // If luxon import fails, calendar uses today by default
  }

  return {
    alosHaShachar: toJSDate(calendar.getAlos72()),
    misheyakir: toJSDate(calendar.getMisheyakir10Point2Degrees()),
    sunrise: toJSDate(calendar.getSunrise()),
    sofZmanShmaGRA: toJSDate(calendar.getSofZmanShmaGRA()),
    sofZmanShmaMGA: toJSDate(calendar.getSofZmanShmaMGA()),
    sofZmanTefilaGRA: toJSDate(calendar.getSofZmanTfilaGRA()),
    chatzos: toJSDate(calendar.getChatzos()),
    minchaGedola: toJSDate((calendar as any).getMinchaGedola()),
    minchaKetana: toJSDate((calendar as any).getMinchaKetana()),
    plagHaMincha: toJSDate((calendar as any).getPlagHamincha()),
    candleLighting: toJSDate(calendar.getCandleLighting()),
    sunset: toJSDate(calendar.getSunset()),
    tzeis: toJSDate(calendar.getTzaisGeonim8Point5Degrees()),
  };
}
