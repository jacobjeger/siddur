# Remaining prayer text to restore

Generated after the Sefaria and archive backfills. **131 of 174 sections are
filled**; the 43 below still carry `status: needs-text`.

These were not filled automatically for one of three reasons, and each needs a
person rather than a better heuristic:

1. **Birchas HaMazon (all 10).** The archive stores the whole bentching as a
   single 11.5k-character blob under one title. Its structure *is* detectable —
   consonant-only matching finds all ten anchors — but those anchors are
   **chasimos (bracha endings), not beginnings**, and the seasonal inserts
   (Retzei, Ya'aleh V'Yavo, Al HaNissim) sit *embedded inside* the brachos they
   belong to. Splitting on them automatically would risk shipping a mis-cut
   bracha, so it was deliberately left alone.

2. **Conditional inserts (13).** Mashiv HaRuach, V'Sein Tal U'Matar, Ya'aleh
   V'Yavo, Al HaNissim, Aneinu and friends. These are short phrases embedded in
   Amidah brachos rather than standalone sections in any source, so there is
   nothing to match against.

3. **No confident match.** Everything else scored below the 92% threshold. That
   threshold is deliberately strict — putting the wrong prayer under a heading
   is worse than leaving it blank.

Sources to draw from, in order of preference:
- `archive/2026-05-14-pre-xlsx/prayers/**` — full text, needs normalizing
  (`scripts/lib/hebrewText.ts` does this)
- Sefaria, via `npx tsx scripts/fetch-sefaria-refs.ts` once a correct
  `sourceRef` is filled in
- The `archive/dgjE2` tag, which additionally carries English translations for
  1,038 sections


### bedtime-shema-misc.yaml  (10 of 21 empty)

| section id | title | Hebrew |
|---|---|---|
| `bedtime-shema-misc-hamapil` | HaMapil | המפיל |
| `bedtime-shema-misc-bedtime-pesukim` | Bedtime Pesukim & Psalms | פסוקים |
| `bedtime-shema-misc-vidui-bedtime` | Vidui / Ribono Shel Olam Hareini Mochel | וידוי |
| `bedtime-shema-misc-havdala-pesukim` | Hinei Kel Yeshuasi (pesukim) | הנה קל ישועתי |
| `bedtime-shema-misc-havdala-brachos` | Havdala Brachos (4 brachos) | הבדלה |
| `bedtime-shema-misc-hallel-half` | Half Hallel | חצי הלל |
| `bedtime-shema-misc-kiddush-levana` | Kiddush Levana | קידוש לבנה |
| `bedtime-shema-misc-hatoras-nedarim` | Hatoras Nedarim | התרת נדרים |
| `bedtime-shema-misc-al-hamichya` | Al HaMichya / Me'ein Shalosh | מעין שלוש |
| `bedtime-shema-misc-bris-milah` | Bris Milah Brachos | ברית מילה |

### birchas-hamazon.yaml  (10 of 10 empty)

| section id | title | Hebrew |
|---|---|---|
| `birchas-hamazon-shir-hamaalos` | Shir HaMaalos (Psalm 126) | שיר המעלות |
| `birchas-hamazon-zimun` | Zimun (invitation) | זימון |
| `birchas-hamazon-bmz-01-hazan` | Bracha 1: HaZan | הזן |
| `birchas-hamazon-bmz-02-haaretz` | Bracha 2: Al HaAretz | על הארץ |
| `birchas-hamazon-bmz-03-yerushalayim` | Bracha 3: Bonei Yerushalayim | בונה ירושלים |
| `birchas-hamazon-bmz-04-hatov` | Bracha 4: HaTov V'HaMeitiv | הטוב והמטיב |
| `birchas-hamazon-bmz-harachamans` | HaRachaman prayers | הרחמן |
| `birchas-hamazon-bmz-retzei` | Retzei (Shabbos) | רצה |
| `birchas-hamazon-bmz-yaaleh-vyavo` | Ya'aleh V'Yavo | יעלה ויבא |
| `birchas-hamazon-bmz-al-hanissim` | Al HaNissim | על הניסים |

### maariv.yaml  (4 of 17 empty)

| section id | title | Hebrew |
|---|---|---|
| `maariv-amidah-maariv` | Shemoneh Esrei (same 19 brachos) | שמונה עשרה |
| `maariv-ata-chonantanu` | Ata Chonantanu | אתה חוננתנו |
| `maariv-vihi-noam` | Vihi Noam + Yoshev B'Seser (Psalm 91) | ויהי נועם |
| `maariv-vata-kadosh` | V'Ata Kadosh | ואתה קדוש |

### mincha.yaml  (2 of 6 empty)

| section id | title | Hebrew |
|---|---|---|
| `mincha-amidah-mincha` | Shemoneh Esrei (same 19 brachos) | שמונה עשרה |
| `mincha-tachanun-mincha` | Tachanun (short only) | תחנון |

### shacharis.yaml  (17 of 120 empty)

| section id | title | Hebrew |
|---|---|---|
| `shacharis-korbanos-intro` | Korbanos (intro section) | קרבנות |
| `shacharis-amidah-10-galuyos` | 10. Kibutz Galuyos | קבוץ גלויות |
| `shacharis-insert-mashiv-haruach` | Mashiv HaRuach (winter) | משיב הרוח |
| `shacharis-insert-vsein-tal` | V Sein Tal U Matar | ותן טל ומטר |
| `shacharis-insert-vsein-bracha` | V Sein Bracha | ותן ברכה |
| `shacharis-insert-yaaleh-vyavo` | Yaaleh V Yavo | יעלה ויבוא |
| `shacharis-insert-al-hanissim-chanukah` | Al HaNissim (Chanukah) | על הניסים - חנוכה |
| `shacharis-insert-al-hanissim-purim` | Al HaNissim (Purim) | על הניסים - פורים |
| `shacharis-insert-zachreinu` | Zachreinu L Chaim | זכרנו לחיים |
| `shacharis-insert-mi-chamocha` | Mi Chamocha | מי כמוך |
| `shacharis-insert-hamelech-hakadosh` | HaMelech HaKadosh | המלך הקדוש |
| `shacharis-insert-uchesov` | U Chesov L Chaim | וכתוב לחיים |
| `shacharis-insert-bsefer` | B Sefer Chaim | בספר חיים |
| `shacharis-insert-aneinu` | Aneinu | עננו |
| `shacharis-insert-nachem` | Nachem | נחם |
| `shacharis-el-erech-apayim-torah` | El Erech Apayim (before Torah) | אל ארך אפיים |
| `shacharis-yehi-ratzon-after-torah` | Yehi Ratzon (after Torah reading) | יהי רצון |
---

## Known structural gap: speaker roles

`shacharis-amidah-kedusha` carried eight rubric lines, most of them speaker
labels (`קהל וחזן`, `שליח ציבור`) that alternate with the liturgy to show who
says which line. Moving them to `instructionHe` classifies them correctly — they
were previously rendering as if they were part of the prayer — but it **loses
the interleaving**, because `text` and `instructionHe` are two flat fields.

Doing this properly needs a speaker/role concept on the section model
(`{ role: "chazan" | "kahal" | "all", text }[]`) rather than one Hebrew blob.
That affects Kedusha, Barchu, Kaddish and the Torah service. Worth doing before
those are used for actual davening.

renders rubrics inline (see src/utils/sectionBlocks.ts) rather than misleading. Rendering them — visually distinct
from liturgy — is the other half of this.

---

## Mincha and Maariv model the Amidah as one section

Conditional insertions (Ya'aleh V'Yavo, Al HaNissim, Aneinu, Tal U'Matar) target
individual Amidah brachos. Shacharis has 19+ per-bracha sections, so they attach
correctly there.

**Mincha and Maariv each have a single `*-amidah-*` section for the entire
Amidah**, so there is nothing at bracha granularity to attach to. Fixing the
section matcher — which was separately broken, stripping an `se-` prefix no id
has used since the XLSX migration — does not change this. Both of those sections
are also currently empty.

So when Mincha and Maariv text lands, it needs to be split per bracha (matching
the Shacharis ids, minus the service prefix) or insertions will silently never
appear in those services.

---

## Sections that are present but incomplete

These are not empty, so they do not show the "not yet available" placeholder and
do not appear in the empty-section count. They read as finished text and are
not, which makes them more dangerous than the blank ones.

1. **`shacharis-amidah-birchas-kohanim`** — the first line ends
   `שֶׁתְּהֵא הַבְּרָכָה הַזּאת לכהנים: שֶׁצִּוִּיתָנו`, cut off mid-phrase. The section
   carries two variants of the Yehi Ratzon, one for the kohanim
   (`שֶׁצִּוִּיתָנוּ לְבָרֵךְ`) and one for the kahal (`שֶׁצִּוִּיתָ לְבָרֵךְ`). The kahal
   variant is complete; the kohanim variant is truncated after two words, and
   its `לכהנים:` cue is embedded mid-line rather than on its own line, so it
   also renders as liturgy rather than as a rubric.

2. **`maariv-baruch-hashem-lolam`** — 234 characters, four pesukim, ending at
   `וְיִמָּלֵא כְבודו אֶת כָּל הָאָרֶץ. אָמֵן וְאָמֵן`. The full Ashkenaz
   ברוך ה' לעולם is eighteen pesukim and concludes with a bracha
   (`בָּרוּךְ אַתָּה יְהֹוָה הַמּוֹלֵךְ בִּכְבוֹדוֹ`). Note this passage is omitted
   entirely in Eretz Yisrael and by several nuschaos, so restoring it is a
   nusach decision, not only a text one.

3. **`bedtime-shema-misc-hashkiveinu-bedtime`** — the Maariv chasima was removed
   (see below), but whether Hashkiveinu belongs in Krias Shema al hamitah at
   all, and in which nusach, is still unsettled. Carries a `needsReview` field.

## Content errors already corrected

Fixed in `scripts/fix-wrong-content.ts`; recorded here because each shipped to a
device and may need a second look by someone qualified.

- **`bedtime-shema-misc-hashkiveinu-bedtime`** was a byte-identical copy of
  `maariv-hashkiveinu`, concluding bracha included. Hashkiveinu ends with
  `שׁוֹמֵר עַמּוֹ יִשְׂרָאֵל לָעַד` only in Maariv, where it forms the geulah arichta.
  The copied `instructionHe` was the Tur explaining that very point about
  Maariv, which is what gave the duplication away. Chasima and note removed.
- **`bedtime-shema-misc-hallel-full`** was titled "Full Hallel (Psalms 113-118)"
  but contained only the bracha `לִקְרֹא אֶת הַהַלֵּל` — a bracha with no Hallel
  after it. Cleared to `needs-text` so the placeholder shows instead.
- **`shacharis-insert-hamelech-hamishpat`** was an insertion holding the whole
  Hashiveinu bracha, duplicating `shacharis-amidah-11-mishpat`. Reduced to the
  inserted words, `הַמֶּֽלֶךְ הַמִּשְׁפָּט`.

---

## Corrections after the full audit (2026-07-28)

Several statements earlier in this document were written before the rubric work
landed and are no longer true. Recorded rather than silently edited, because a
doc that quietly rewrites its own history is not trustworthy either.

- The claim that the UI "does not display `instruction` or `instructionHe` at
  all, so rubrics are currently invisible" was **false** by the time it was
  written: `app/siddur/[tefilaId].tsx` and `app/siddur/daven.tsx` both pass
  them, and rubrics now render inline via `src/utils/sectionBlocks.ts`.
- The claim that moving `shacharis-amidah-kedusha`'s lines to `instructionHe`
  "loses the interleaving" describes a state that no longer exists — that
  section carries six rubric lines inline and an empty `instructionHe`.
- `shacharis-amidah-birchas-kohanim`'s `לכהנים:` cue is no longer embedded
  mid-line; `scripts/split-leading-cues.ts` moved it. The **truncation** of the
  kohanim variant of the Yehi Ratzon is still real and still open.
- The section count is **172 of 174**, not 131 of 174: two byte-identical
  duplicate sections were removed (see scripts/fix-audit-content.ts).
- The figure of "English translations for 1,038 sections" in `archive/dgjE2`
  could not be substantiated — the tag has 522 `translation:` keys over 766
  section ids. Treat the number as unverified.

## Still missing, and not inventable from any source here

- **Psalm 92** (`מִזְמוֹר שִׁיר לְיוֹם הַשַּׁבָּת`). Shir Shel Yom carries six of seven
  days. The psalm is absent from the current corpus AND from the pre-xlsx
  archive, so it cannot be restored by remapping — it needs a text source.
  `src/utils/tefillahRules.ts` correctly reports psalm 92 for Shabbos, so the
  Calendar tab names a psalm whose text the Siddur tab cannot show.
- **Av HaRachamim (the Shabbos memorial**, `אב הרחמים שוכן מרומים`). The corpus
  holds only the ark-opening `אב הרחמים הוא ירחם`; the section has been retitled
  to match what it actually contains.
- **Aneinu.** The only conditional insertion whose text is genuinely not in the
  corpus. It belongs inside Shomea Tefilla on a fast day. It must be added to
  the YAML in position with its cue — not appended at runtime, which is what
  the old assembler did, and which placed it after the chasima.
