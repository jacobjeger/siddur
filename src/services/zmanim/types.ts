export interface ZmanimData {
  alosHaShachar: Date | null;
  misheyakir: Date | null;
  sunrise: Date | null;
  sofZmanShmaMGA: Date | null;
  sofZmanShmaGRA: Date | null;
  sofZmanTefilaMGA: Date | null;
  sofZmanTefilaGRA: Date | null;
  chatzos: Date | null;
  minchaGedola: Date | null;
  minchaKetana: Date | null;
  plagHaMincha: Date | null;
  candleLighting: Date | null;
  sunset: Date | null;
  tzeis: Date | null;
  tzeis72: Date | null;
  havdala: Date | null;
  chatzosLayla: Date | null;
}

export type ZmanKey = keyof ZmanimData;

export type ZmanGroup = "morning" | "afternoon" | "evening";

export interface ZmanInfo {
  key: ZmanKey;
  time: Date;
  nameEn: string;
  nameHe: string;
  group: ZmanGroup;
}

/**
 * Explicit display order. `Object.entries(zmanimData)` was previously used to
 * render the list, which made the order an accident of key declaration — this
 * makes it intentional and groupable.
 */
export const ZMAN_ORDER: { key: ZmanKey; group: ZmanGroup }[] = [
  { key: "alosHaShachar", group: "morning" },
  { key: "misheyakir", group: "morning" },
  { key: "sunrise", group: "morning" },
  { key: "sofZmanShmaMGA", group: "morning" },
  { key: "sofZmanShmaGRA", group: "morning" },
  { key: "sofZmanTefilaMGA", group: "morning" },
  { key: "sofZmanTefilaGRA", group: "morning" },
  { key: "chatzos", group: "afternoon" },
  { key: "minchaGedola", group: "afternoon" },
  { key: "minchaKetana", group: "afternoon" },
  { key: "plagHaMincha", group: "afternoon" },
  { key: "candleLighting", group: "evening" },
  { key: "sunset", group: "evening" },
  { key: "tzeis", group: "evening" },
  { key: "tzeis72", group: "evening" },
  { key: "havdala", group: "evening" },
  { key: "chatzosLayla", group: "evening" },
];

export const ZMAN_GROUP_LABELS: Record<ZmanGroup, { en: string; he: string }> = {
  morning: { en: "Morning", he: "בוקר" },
  afternoon: { en: "Afternoon", he: "אחר הצהריים" },
  evening: { en: "Evening", he: "ערב" },
};
