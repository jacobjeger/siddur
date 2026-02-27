import type { TefilaCategoryInfo } from "./types";

export const TEFILA_CATEGORIES: TefilaCategoryInfo[] = [
  { id: "shacharis", name: "Shacharis", nameHe: "שחרית", icon: "sunny" },
  { id: "mincha", name: "Mincha", nameHe: "מנחה", icon: "partly-sunny" },
  { id: "maariv", name: "Maariv", nameHe: "מעריב", icon: "moon" },
  { id: "blessings", name: "Brachos", nameHe: "ברכות", icon: "heart" },
  { id: "tehillim", name: "Tehillim", nameHe: "תהלים", icon: "book" },
  { id: "holidays", name: "Holidays", nameHe: "חגים", icon: "calendar" },
  { id: "lifecycle", name: "Lifecycle", nameHe: "מעגל החיים", icon: "people" },
  { id: "shabbos", name: "Shabbos", nameHe: "שבת", icon: "flame" },
  { id: "other", name: "Other", nameHe: "שונות", icon: "ellipsis-horizontal" },
];
