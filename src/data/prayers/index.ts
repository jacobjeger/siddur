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
import {
  chatziKaddish,
  kaddishShalem,
  kaddishYasom,
  kaddishDRabbanan,
} from "./kaddish";
import { fullHallel, halfHallel } from "./hallel";
import { musafRoshChodesh } from "./roshChodesh";
import { chanukahCandles, hanerosHalalu, maozTzur } from "./chanukah";
import { avinuMalkeinu, selichos } from "./fastDays";
import { sefirasHaOmer } from "./omer";
import { havdala, vayitenLecha } from "./havdala";
import { kiddushLevana, hatarasNedarim, eruvTavshilin } from "./special";
import {
  shevaBrachos,
  brisMilah,
  pidyonHaben,
  marriageBlessings,
} from "./lifecycle";
import { torahReadingWeekday, mondayThursdayTachanun } from "./torahReading";
import { hoshanot, lulav, sukkah } from "./hoshanot";
import { musafCholHamoedSukkos, musafCholHamoedPesach } from "./musaf";

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
  // Kaddish
  chatziKaddish,
  kaddishShalem,
  kaddishYasom,
  kaddishDRabbanan,
  // Hallel
  fullHallel,
  halfHallel,
  // Rosh Chodesh
  musafRoshChodesh,
  // Holidays
  chanukahCandles,
  hanerosHalalu,
  maozTzur,
  sefirasHaOmer,
  avinuMalkeinu,
  selichos,
  eruvTavshilin,
  // Motzaei Shabbos
  havdala,
  vayitenLecha,
  // Special
  kiddushLevana,
  hatarasNedarim,
  // Torah Reading
  torahReadingWeekday,
  mondayThursdayTachanun,
  // Lifecycle
  shevaBrachos,
  brisMilah,
  pidyonHaben,
  marriageBlessings,
  // Chol HaMoed / Sukkos
  hoshanot,
  lulav,
  sukkah,
  musafCholHamoedSukkos,
  musafCholHamoedPesach,
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
