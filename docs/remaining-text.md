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

Related: the UI (`app/siddur/[tefilaId].tsx`) renders only `section.text` and
does not display `instruction` or `instructionHe` at all, so rubrics are
currently invisible rather than misleading. Rendering them — visually distinct
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
