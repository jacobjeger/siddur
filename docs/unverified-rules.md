# Tefillah rules needing human review

The day-rules in `src/utils/tefillahRules.ts` are sourced where they could be
sourced. This file lists what could **not** be established confidently, so a
knowledgeable person can settle it rather than have a guess quietly ship.

**Nothing in this file should be treated as authoritative until reviewed.**

Rules are implemented for all four nuschaos (Ashkenaz, Sefard, Edot HaMizrach,
Ari/Chabad), with Ashkenaz the best-sourced. Where a rule below is unresolved,
the code implements the best-sourced reading and this file records the doubt.

---

## Not researched at all — implemented from general knowledge only

| Rule | What is unknown |
|---|---|
| **Yizkor** | Whether Sephardim say Yizkor or Hashkava instead; Chabad practice; the custom of leaving the room. The *dates* are solid and region-aware — Israel gets 21 Nissan / 6 Sivan, the Diaspora 22 / 7 — but the per-nusach practice is not. |
| **Special Shabbosos** | Whether Sephardim read a different haftarah for Parah / Shkalim / HaChodesh, and which nuschaos say yotzros or piyutim. Only *detection* of which Shabbos it is has been verified. |
| **Eruv Tavshilin** | The full case matrix (Israel vs Diaspora, which yamim tovim, the Friday-alone case, Rosh Hashana) and any bracha-text variation. Currently implemented as simply "erev Yom Tov falling on Wednesday". |
| **Bedikas Chometz** | The two Kol Chamira texts. The date logic, including the shift to Thursday night when 14 Nissan is Shabbos, is implemented and verified. |
| **Pirkei Avos** | The Ashkenaz chapter cycle when the season runs long — the doubling convention is **not** implemented, chapters simply cycle 1–6. Also unverified: Chabad practice, and whether the Israel/Diaspora Shabbos count differs. The Sephardic Pesach→Shavuos-only window is implemented but unconfirmed. |

---

## Researched but genuinely disputed — do not settle from one source

### Avinu Malkeinu on public fast days
Wikipedia states Sephardic and Western Ashkenazic rites say it *only* during the
Ten Days; Halachipedia says "many have the custom" on fasts without splitting by
rite. **These conflict.** Needs a Sephardic posek source (Yalkut Yosef / Chazon
Ovadia). Currently: said on fasts for all nuschaos except Edot HaMizrach.

### Avinu Malkeinu on Shabbos
Ashkenazic rite never says it on Shabbos; Sephardim largely do, often skipping
the sin-mentioning lines. Confirmed from a primary text
(`Siddur Edot HaMizrach, Shabbat Mincha` carries the rubric
"בשבת שובה אומרים כאן אבינו מלכינו"). Currently implemented that way, but the
scope — every Shabbos, or only Shabbos Shuva — is unclear.

### Chabad on fast days
The custom **changed**. The older Chabad practice (like the Gra) was to omit
Avinu Malkeinu on a fast; current practice is to say it. Decide which is being
modelled.

### Av HaRachamim — the Sefirah / Shabbos Mevorchim interaction
Some sources say it *is* said on Shabbos Mevorchim during Sefirah because of the
gezeiros of תתנ"ו; Chabad says it only on Shabbos Mevorchim **Sivan**. Shabbos
Mevorchim Iyar falls in Nissan, where it is omitted anyway, which may reconcile
these or may not. **Currently: omitted on all Shabbos Mevorchim, with no Sefirah
exception.**

Also unverified: whether Sephardim and Nusach Sefard say Av HaRachamim at all.
Currently: not said for Edot HaMizrach, said for the other three.

> **Naming trap, already handled in code:** there are two different prayers
> called Av HaRachamim — `אב הרחמים היטיבה` said when the ark is opened, and
> `אב הרחמים שוכן מרומים`, the Shabbos memorial. Only the latter is modelled.
> Do not conflate them when wiring text.

### Chabad's Tzidkascha verse order
Unverified. Following the Ari it is probably `כהררי אל` first, but the Tehillat
Hashem text was not obtained. Currently: Chabad grouped with the Tehillim order.

### Bircas HaChodesh for Ashkenaz, Sefard and Chabad
Only Edot HaMizrach was sourced from a primary text. Open: whether the molad is
publicly announced in each rite (the Edot HaMizrach siddur says only "some have
the custom"), whether Yehi Ratzon comes before or after Mi She'asa Nissim, and
the Chabad standing custom. The Edot HaMizrach text also has **four** Yehi Ratzon
paragraphs *before* Mi She'asa Nissim, structurally unlike the single Ashkenaz
one that follows it.

### Tachanun windows
Three windows from Halachipedia contradict widespread practice and were **not**
coded from it:
- Ashkenaz Sivan window given as RC Sivan → Isru Chag Shavuos (7/8 Sivan);
  common practice runs through **12 Sivan**. Code uses 12 Sivan.
- Ashkenaz post-Yom-Kippur window given as ending 24 Tishrei; many communities
  go through Rosh Chodesh Cheshvan. Code uses "9 Tishrei onward".
- Pesach Sheni absent from the Ashkenaz list, though many Ashkenazim do omit
  Tachanun on 14 Iyar. Code omits it.

### Yom Kippur Katan
Skipped in **Tishrei, Cheshvan, Teves and Nissan** — note this is what the
sources give, and it contradicts the Iyar that was initially assumed. Also
unverified: the erev-Rosh-Chodesh-on-Shabbos/Friday pushback, and which
nuschaos actually observe it (it may be primarily Chassidic/kabbalistic rather
than Ashkenaz-mainstream). Currently taken straight from the library predicate.

### Chabad's Shir Shel Yom on Yom Tov
Rosh Chodesh is confirmed (weekday psalm plus Barchi Nafshi) and the Beis Yaakov
omission on Musaf days is confirmed, but **what Chabad does on Yom Tov is not**.

### Minhag ha-Gra / Eretz Yisrael — the multi-day cycles are NOT implemented

The Gra's system, where the special-day psalm **replaces** the weekday psalm
rather than being added to it, is implemented for the single-day cases:
Rosh Chodesh (104), Rosh Hashana (81), Yom Kippur (32), Shemini Atzeres (12),
Simchas Torah (8), Chanukah (30), Purim (22).

**The multi-day cycles for Pesach and Succos are deliberately omitted**, because
the day-by-day assignment could not be confidently sourced. The sources give
Pesach as 114, 78, 80, 105, 135, 66, 18 (with 136 for the last day in chu"l) and
Succos as 76, 42, 29, 50, 94:16–23, 94:1–15, 81, 82 — but which psalm maps to
which day, and how that interacts with Chol HaMoed and the Israel/Diaspora day
count, is not established. On those days the code currently falls back to the
weekday psalm.

Also unverified for this minhag:
- The precedence rules. Implemented as Rosh Chodesh displacing everything, and
  Shabbos keeping Ps 92. The sources say "Rosh Chodesh pushes off Shabbos and
  Chanukah; Shabbos pushes off Chanukah, Yom Tov and Chol HaMoed", which is not
  obviously the same thing.
- Whether the Gra's practice on Chanukah and Purim also omits the introductory
  Beis Yaakov paragraph.
- Whether following the Gra for Shir Shel Yom implies the Eretz Yisrael L'Dovid
  end date. They are currently coupled — selecting the Gra minhag ends L'Dovid
  at Hoshana Rabba — which may be too strong an inference.

### Edot HaMizrach special-day psalms — replace or supplement?
The siddur rubric just says "בחנוכה אומרים" without saying whether the weekday
psalm is still said. The Ben Ish Chai instituted a split for Rosh Chodesh and
Chol HaMoed (weekday psalm after Shacharis, festival psalm after Musaf); whether
that extends to Chanukah, Purim and fasts is unclear. **Currently: only the
weekday psalm plus Barchi Nafshi on Rosh Chodesh is implemented — the
special-day psalm systems are not.**

---

## Zmanim: Rabbi Ovadiah Yosef luach — the extreme-latitude floor is omitted

The ROY luach (`src/services/zmanim/royZmanim.ts`) is implemented and verified
against the documented figures — Jerusalem gives alos 83.6 minutes before netz on
28 Jul 2026, and Brooklyn stretches to 98.0, which is the latitude adjustment
working as described.

**The extreme-latitude backstop is deliberately NOT implemented.** The reference
implementation applies `max(seasonal, 98.5°-offset)` to alos and tzeis. Taken
literally at ordinary latitudes that is wrong: in Jerusalem the 8.5° point is
35.6 minutes before netz while 72 zmaniyos minutes is 83.6, so "the later of the
two" clamps every normal location to 35.6 and silently discards the shitah. This
was caught during verification.

Since the intended semantics could not be established, no floor is applied. That
is correct wherever the seasonal calculation is well-behaved, but **times at far
northern latitudes are unguarded** and should be checked before the app is used
there.

Also not implemented for this luach:
- The three plag opinions (Halacha Berurah, Yalkut Yosef, Maamar Mordechai) —
  only one plag is produced.
- The multi-stringency motzaei Shabbos resolution with 5-minute rounding.
- Visible sunrise (netz amiti / ChaiTables) — this needs a ~40 GB terrain
  dataset and is out of scope permanently. The reference apps download it rather
  than computing it.

## Sefiras HaOmer text — needs a native reviewer

This is the best-sourced item here and still wants confirmation, because it is
text people will read aloud rather than a flag.

The 49 Ashkenaz forms are transcribed verbatim from this project's own archived
siddur and verified 49/49. The other three are **derived** from them:

| Nusach | Form | Confidence |
|---|---|---|
| Ashkenaz | `…בָּעֹמֶר` at the end | Transcribed |
| Sefard | `…לָעֹמֶר` at the end | Derived |
| Ari / Chabad | `…לָעוֹמֶר` (plene) at the end | Derived |
| Edot HaMizrach | `לָעֹמֶר` after the day count, weeks after | **Derived + restructured — check this one first** |

Two things to settle:

1. **`בעומר` vs `לעומר` for Ashkenaz.** Shulchan Aruch OC 489:1 prints `(בעומר)`;
   Mishnah Berura 489:8 says most poskim have `לעומר` and that either way it is
   only *lechatchila*. Metsudah and Artscroll print `בעומר`; other Ashkenaz
   siddurim print `לעומר`. Which one your users expect is a community question,
   not a textual one. The code follows the siddur this corpus came from.
2. **The Edot HaMizrach word order and punctuation.** The restructure is
   mechanical — it moves `לָעֹמֶר` ahead of the `שֶׁהֵם` clause and inserts a comma.
   Vowelization and punctuation should be checked against the intended printed
   siddur.

---

## How to clear an item

Fix the rule in `src/utils/tefillahRules.ts`, cite the source in the doc comment
next to it, and delete the entry here. The rule sweeps in the verification step
should be extended to cover whatever was just settled.
