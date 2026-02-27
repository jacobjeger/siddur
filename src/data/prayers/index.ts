import type { Tefila, TefilaCategory } from "../types";
import { modehAni } from "./modehAni";
import {
  birchosShachar,
  korbanos,
  pesukeiDezimra,
  shemaShacharis,
  shemonehEsrei,
  tachanun,
  uvaLetzion,
  aleinu,
  shirShelYom,
} from "./shacharis";
import {
  ashrei,
  shemonehEsreiMincha,
  tachanunMincha,
  aleinuMincha,
} from "./mincha";
import {
  shemaMaariv,
  shemonehEsreiMaariv,
  aleinuMaariv,
} from "./maariv";
import {
  birkasHamazon,
  bedtimeShema,
  travelersPrayer,
  birchosBefore,
  brachosAfter,
  birchosMitzvos,
  birchosMeEin,
} from "./blessings";

export const ALL_TEFILOS: Tefila[] = [
  // Morning
  modehAni,
  birchosShachar,
  korbanos,
  pesukeiDezimra,
  shemaShacharis,
  shemonehEsrei,
  tachanun,
  uvaLetzion,
  aleinu,
  shirShelYom,
  // Afternoon
  ashrei,
  shemonehEsreiMincha,
  tachanunMincha,
  aleinuMincha,
  // Evening
  shemaMaariv,
  shemonehEsreiMaariv,
  aleinuMaariv,
  // Blessings & Other
  birkasHamazon,
  birchosBefore,
  brachosAfter,
  birchosMitzvos,
  birchosMeEin,
  bedtimeShema,
  travelersPrayer,
];

export function getTefilaById(id: string): Tefila | undefined {
  return ALL_TEFILOS.find((t) => t.id === id);
}

export function getTefilosByCategory(category: TefilaCategory): Tefila[] {
  return ALL_TEFILOS.filter((t) => t.category === category);
}

export function getTefilosForTime(
  time: "shacharis" | "mincha" | "maariv"
): Tefila[] {
  return ALL_TEFILOS.filter((t) => t.timeContext === time);
}
