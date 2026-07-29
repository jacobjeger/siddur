# Prayer text sources and licenses

The Hebrew text in `content/prayers/` is not original to this project. This file
records where each part came from and under what terms.

**This app is distributed free of charge with no advertising, no paid tier and
no in-app purchases.** That matters: it satisfies the non-commercial condition
on one of the sources below. If that ever changes, the Nusach Sefard text has to
be re-sourced first — see "If this app ever monetizes".

## Sources

| Source | Used for | License | Attribution required |
|---|---|---|---|
| **The Metsudah Siddur** (Avrohom Davis, 1981), via Sefaria | Nusach Ashkenaz Hebrew | **CC BY 4.0** | Yes — credit Metsudah, not Sefaria |
| **Daat Siddur Ashkenaz**, via Sefaria | Nusach Ashkenaz Hebrew | **Public Domain** | Not required |
| **Shaliehsaboo Siddur**, via Sefaria | Edot HaMizrach Hebrew | **CC0** | Not required |
| **Torat Emet 357**, via Sefaria | Nusach Sefard Hebrew | **CC BY-NC-SA 2.5** | Yes, plus non-commercial + ShareAlike |
| **Chabad.org** (Siddur Tehillat Hashem) | Ari / Chabad Hebrew | See note below | Yes |

Sefaria itself is a distributor, not the licensor. Sefaria's name and logo are
trademarked and are **not** licensed for use here.

## Notes per source

### Metsudah — CC BY, attribution is mandatory
Most of the existing Ashkenaz text matches the Metsudah edition byte-for-byte,
including its distinctive meteg placement. CC BY requires crediting the
originator. The correct credit is to **Avrohom Davis / the Metsudah Siddur**,
not to Sefaria.

### Torat Emet — non-commercial only
Sefaria labels this version "unknown", but the publisher's own copyright page
states CC BY-NC-SA 2.5 and says plainly:
`אין לעשות בתוכן מאגר זה או בחלק ממנו שימוש מסחרי` — no commercial use of this
database or any part of it. Usable here **only** because this app is free.
ShareAlike also applies to derivatives of that text.

### Ari / Chabad — do NOT use Sefaria's copy
Sefaria's "Weekday Siddur Chabad" versions are unattributed Wikisource imports
marked `unknown`. **Unknown is not permissive** — it means no stated permission,
which is the worst case to ship. Source Chabad text from Chabad.org's published
Siddur Tehillat Hashem instead, and check their terms before importing.

### Anything marked "unknown"
Treat as do-not-ship. That includes the Artscroll and Koren versions that appear
in Sefaria's version lists — those are almost certainly under copyright.

## English translations

There is currently **no English in the corpus at all**, so the `showEnglish`
setting has nothing to render. Two license-clean options exist:

- **Metsudah linear translation** — CC BY (attribution required)
- **Sefaria Community Translation** — CC0 (no conditions)

The archived `archive/dgjE2` git tag also carries English for 1,038 sections,
but its provenance was never recorded and would need checking before use.

## Where attribution appears in the app

Settings → About. Any build that ships Metsudah or Torat Emet text must credit
them there.

## If this app ever monetizes

The Torat Emet (Nusach Sefard) text becomes non-compliant immediately. Sections
sourced from it are tagged in the YAML so they can be found and replaced.
Ashkenaz (Metsudah CC BY + Daat PD) and Edot HaMizrach (Shaliehsaboo CC0) are
unaffected — CC BY and CC0 both permit commercial use with attribution.

## Psalm 92 (Shabbos Shir Shel Yom) — added 2026-07-29

- **Source:** Sefaria, `Psalms 92`, version **"Tanach with Nikkud"**
- **License:** **Public Domain**
- **Why this version:** a siddur prints the psalm vocalized but *without*
  ta'amei hamikra, which rules out "Tanach with Ta'amei Hamikra"; and
  "Miqra according to the Masorah" is CC-BY-SA, which would add a ShareAlike
  obligation for no benefit when a Public Domain vocalized text exists.
- **Verification:** the consonantal text was compared against a second,
  independent Sefaria version ("Tanach with Ta'amei Hamikra") and is identical —
  460 letters, byte for byte.
- **Recorded in the YAML** as `sourceRef`, naming the version and its license.
  This is the first section to record its version; `scripts/fetch-sefaria-refs.ts`
  still takes `versions[0]` blindly and records neither, which is why the rest of
  the corpus cannot substantiate its per-source license claims.

Two transformations were applied so the text matches the section it joins, both
documented in `scripts/add-psalm-92.ts`:

- **Ketiv/qere.** Sefaria writes verse 16 as `וְלֹא־עלתה [עַוְלָתָה] בּוֹ`. A siddur
  prints only the qere. The first attempt at stripping this **deleted `וְלֹא`**,
  because the character class included maqaf and so swallowed the maqaf-joined
  word before the ketiv — inverting the meaning of the verse. Caught by reading
  the output; the class now excludes U+05BE.
- **Orthography.** Sof pasuq to colon, the Divine Name to the corpus spelling
  (verified: the section now has exactly one standalone and one prefixed form),
  and holam haser on אֱלֺהִים to match the neighbouring psalms. The introductory
  line was **derived from Friday's by substitution** rather than retyped, so its
  shva-na markers are identical by construction.
