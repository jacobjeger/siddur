import type { Minyan } from "./types";

/**
 * Placeholder minyanim used until the GoDaven API is available.
 *
 * These are illustrative, NOT real shul data — the UI labels them as sample
 * data so nobody davens by them. Coordinates are around Lakewood, NJ purely so
 * that distance sorting has something plausible to work with.
 */
export const FIXTURE_MINYANIM: Minyan[] = [
  {
    id: "sample-1",
    name: "Beis Medrash (sample)",
    address: "Forest Ave, Lakewood, NJ",
    latitude: 40.0959,
    longitude: -74.2179,
    nusach: "ashkenaz",
    times: [
      { slot: "shacharis", dayScope: "weekday", time: "06:45" },
      { slot: "shacharis", dayScope: "shabbos", time: "08:30" },
      { slot: "mincha", dayScope: "weekday", time: "13:45" },
      { slot: "maariv", dayScope: "weekday", time: "21:00" },
    ],
  },
  {
    id: "sample-2",
    name: "Chabad House (sample)",
    address: "Cedarbridge Ave, Lakewood, NJ",
    latitude: 40.0876,
    longitude: -74.1968,
    nusach: "ari",
    times: [
      { slot: "shacharis", dayScope: "weekday", time: "07:30" },
      { slot: "mincha", dayScope: "weekday", time: "14:15" },
      {
        slot: "maariv",
        dayScope: "weekday",
        time: "20:30",
        note: "Sun–Thu only",
      },
    ],
  },
  {
    id: "sample-3",
    name: "Sephardic Center (sample)",
    address: "Madison Ave, Lakewood, NJ",
    latitude: 40.1023,
    longitude: -74.2271,
    nusach: "edot_hamizrach",
    times: [
      { slot: "shacharis", dayScope: "weekday", time: "07:00" },
      { slot: "mincha", dayScope: "weekday", time: "17:15" },
      { slot: "maariv", dayScope: "weekday", time: "20:00" },
    ],
  },
  {
    id: "sample-4",
    name: "Young Israel (sample)",
    address: "Ocean Ave, Lakewood, NJ",
    latitude: 40.0812,
    longitude: -74.2405,
    nusach: "sefard",
    times: [
      { slot: "shacharis", dayScope: "weekday", time: "06:15" },
      { slot: "shacharis", dayScope: "shabbos", time: "09:00" },
      { slot: "mincha", dayScope: "weekday", time: "13:30" },
    ],
  },
];
