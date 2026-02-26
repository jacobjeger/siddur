const HEBREW_ONES = [
  "",
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
];
const HEBREW_TENS = [
  "",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
];
const HEBREW_HUNDREDS = [
  "",
  "ק",
  "ר",
  "ש",
  "ת",
  "תק",
  "תר",
  "תש",
  "תת",
  "תתק",
];

/**
 * Convert a number (1-999) to Hebrew numeral representation.
 * Used for sefira count, Hebrew dates, etc.
 */
export function toHebrewNumeral(n: number): string {
  if (n <= 0 || n > 999) return String(n);

  const hundreds = Math.floor(n / 100);
  const tens = Math.floor((n % 100) / 10);
  const ones = n % 10;

  // Special cases for 15 and 16 (avoid spelling God's name)
  if (tens === 1 && ones === 5) {
    return HEBREW_HUNDREDS[hundreds] + "ט״ו";
  }
  if (tens === 1 && ones === 6) {
    return HEBREW_HUNDREDS[hundreds] + "ט״ז";
  }

  let result = HEBREW_HUNDREDS[hundreds] + HEBREW_TENS[tens] + HEBREW_ONES[ones];

  // Add geresh (׳) for single letter, gershayim (״) before last letter for multiple
  if (result.length === 1) {
    result += "׳";
  } else if (result.length > 1) {
    result = result.slice(0, -1) + "״" + result.slice(-1);
  }

  return result;
}
