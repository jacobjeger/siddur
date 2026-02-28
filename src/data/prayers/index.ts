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
  chatziKaddishMincha,
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
import { megillasEsther } from "./megillah";
import { megillasEichah } from "./eichah";
import { shirHaShirim, megillasRuth, megillasKoheles } from "./megillas";
import { psalms1to25 } from "./psalms1to25";
import { psalms26to50 } from "./psalms26to50";
import { psalms51to75 } from "./psalms51to75";
import { psalms76to100 } from "./psalms76to100";
import { psalms101to125 } from "./psalms101to125";
import { psalms126to150 } from "./psalms126to150";
import {
  petichatEliyahu,
  hannasPrayer,
  thirteenPrinciples,
  tenRemembrances,
  kaveh,
  vidui,
  beitYaakov,
} from "./edotHaMizrach";
import { tikunChatzos } from "./tikunChatzos";
import {
  parshasHaMon,
  igeresHaRamban,
  tefilasHaShelah,
  prayerForLivelihood,
} from "./miscPrayers";
import { allPirkeiAvos } from "./pirkeiAvos";

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
  chatziKaddishMincha,
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
  // Megillas
  megillasEsther,
  megillasEichah,
  shirHaShirim,
  megillasRuth,
  megillasKoheles,
  // Edot HaMizrach
  petichatEliyahu,
  hannasPrayer,
  thirteenPrinciples,
  tenRemembrances,
  kaveh,
  vidui,
  beitYaakov,
  // Tikun Chatzos
  tikunChatzos,
  // Miscellaneous Prayers & Segulos
  parshasHaMon,
  igeresHaRamban,
  tefilasHaShelah,
  prayerForLivelihood,
  // Pirkei Avos (6 chapters)
  ...allPirkeiAvos,
  // Tehillim (150 Psalms)
  ...psalms1to25,
  ...psalms26to50,
  ...psalms51to75,
  ...psalms76to100,
  ...psalms101to125,
  ...psalms126to150,
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
