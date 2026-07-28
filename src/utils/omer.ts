import type { Nusach } from "../stores/useSettingsStore";
import { OMER_ASHKENAZ } from "./omerTable";

/**
 * The counting formula for a given day of the Omer, per nusach.
 *
 * Derived from the verified Ashkenaz text by the documented differences, rather
 * than generated from Hebrew number grammar. The differences are:
 *
 *   Ashkenaz        …בָּעֹמֶר   at the end
 *   Sefard          …לָעֹמֶר    at the end
 *   Ari / Chabad    …לָעוֹמֶר   at the end (plene spelling)
 *   Edot HaMizrach   לָעֹמֶר immediately after the day count, weeks after
 *
 * Halachic note: Shulchan Aruch OC 489:1 prints (בעומר); Mishnah Berura 489:8
 * observes that most poskim have לעומר and that either way it is only
 * lechatchila. Which one an Ashkenazi user expects is a community question, so
 * the Ashkenaz default follows the siddur this corpus came from.
 */

const BA_OMER = "בָּעֹֽמֶר";
const LA_OMER = "לָעֹֽמֶר";
const LA_OMER_PLENE = "לָעוֹמֶר";

/** The "…שֶׁהֵם" clause introduces the week breakdown, from day 7 onward. */
const WEEKS_CLAUSE = "שֶׁהֵם";

/**
 * Hebrew points can be stored in different combining orders that render
 * identically — the archive writes dagesh before kamatz, most keyboards write
 * kamatz before dagesh. Naive `String.replace` silently fails across that
 * difference, so everything here compares NFC-normalized.
 */
const nfc = (value: string) => value.normalize("NFC");

export function getOmerText(day: number, nusach: Nusach): string {
  if (day < 1 || day > 49) return "";

  const ashkenaz = nfc(OMER_ASHKENAZ[day - 1] ?? "");
  if (!ashkenaz) return "";

  switch (nusach) {
    case "ashkenaz":
      return ashkenaz;
    case "sefard":
      return ashkenaz.replace(nfc(BA_OMER), nfc(LA_OMER));
    case "ari":
      return ashkenaz.replace(nfc(BA_OMER), nfc(LA_OMER_PLENE));
    case "edot_hamizrach":
      return toEdotHaMizrach(ashkenaz);
    default:
      return ashkenaz;
  }
}

/**
 * Edot HaMizrach place לָעֹמֶר directly after the day count, with the week
 * breakdown following:
 *   Ashkenaz        הַיּוֹם שְׁמוֹנָה יָמִים שֶׁהֵם שָׁבוּעַ אֶחָד וְיוֹם אֶחָד בָּעֹמֶר
 *   Edot HaMizrach  הַיּוֹם שְׁמוֹנָה יָמִים לָעֹמֶר, שֶׁהֵם שָׁבוּעַ אֶחָד וְיוֹם אֶחָד
 *
 * Flagged for native review in docs/unverified-rules.md — the vowelization and
 * exact punctuation should be confirmed against the intended printed siddur.
 */
function toEdotHaMizrach(ashkenaz: string): string {
  const withoutBaOmer = ashkenaz
    .replace(nfc(BA_OMER), "")
    .replace(/\s+:/, ":")
    .trim();

  const clauseAt = withoutBaOmer.indexOf(nfc(WEEKS_CLAUSE));
  if (clauseAt === -1) {
    // Days 1–6 have no week breakdown; the word simply moves to the end.
    return withoutBaOmer.replace(/:?$/, "") + ` ${LA_OMER}:`;
  }

  const dayPart = withoutBaOmer.slice(0, clauseAt).trim();
  const weekPart = withoutBaOmer.slice(clauseAt).replace(/:?$/, "").trim();
  return `${dayPart} ${LA_OMER}, ${weekPart}:`;
}

export interface OmerInfo {
  day: number;
  text: string;
  week: number;
  dayOfWeek: number;
}

export function getOmerInfo(day: number, nusach: Nusach): OmerInfo | null {
  if (day < 1 || day > 49) return null;
  return {
    day,
    text: getOmerText(day, nusach),
    week: Math.floor((day - 1) / 7) + 1,
    dayOfWeek: ((day - 1) % 7) + 1,
  };
}
