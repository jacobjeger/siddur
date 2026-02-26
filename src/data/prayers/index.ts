import type { Tefila, TefilaCategory } from "../types";
import { modehAni } from "./modehAni";
import {
  birchosShachar,
  pesukeiDezimra,
  shemaShacharis,
  shemonehEsrei,
} from "./shacharis";
import { ashrei, shemonehEsreiMincha } from "./mincha";
import { shemaMaariv, shemonehEsreiMaariv } from "./maariv";
import { birkasHamazon, bedtimeShema, travelersPrayer } from "./blessings";

export const ALL_TEFILOS: Tefila[] = [
  modehAni,
  birchosShachar,
  pesukeiDezimra,
  shemaShacharis,
  shemonehEsrei,
  ashrei,
  shemonehEsreiMincha,
  shemaMaariv,
  shemonehEsreiMaariv,
  birkasHamazon,
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
