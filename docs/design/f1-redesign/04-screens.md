# Screens

Every screen below is specified at 240 × 320 dp with a 24 dp system status bar
(≈296 dp usable). Values are final — see `02-design-tokens.md` for the token
names they correspond to.

Common furniture, on every screen unless noted:

- **Identity strip**, 30 dp, `primaryDeep #16323f`, `padding 4/10/5`.
  Left: Hebrew title/date, `NotoSerifHebrew 700`, 14–15 px, `direction rtl`.
  Right: 9.5 px `rgba(255,255,255,0.75)` metadata, right-aligned, ≤ 2 lines.
- **Soft-key row**, 22 dp, `primaryDeep`, `padding 0/8`, `space-between`.
  Left and right: `micro` 9 px `#e8d5b7`, uppercase, `letterSpacing 0.1em`.
  Centre: four 5 dp position dots (active `#b8860b`, rest
  `rgba(255,255,255,0.35)`), or screen-specific content.
- Content between them scrolls only where stated.

---

## 1 · Home (Siddur tab) — `app/(tabs)/index.tsx`

**Purpose:** put the user in the text. Nothing below the fold.

### Now
166 dp of chrome, two info cards, four category rows, "All Tefilos", then the
CTA at ~780 dp. 2.7 screenfuls. Findings F2, F3, F4, F5.

### Proposed layout

```
┌──────────────────────────────┐
│ status bar               24  │
│ identity strip           30  │
├──────────────────────────────┤
│                              │
│  HERO  (flex:1, centred)     │
│   eyebrow  NOW               │
│   שַׁחֲרִית          30px     │
│                 sof zman ⟶   │
│   [ הַתְחֵל  · Start ]  48    │
│   [ הַמְשֵׁךְ · Resume ] 34    │
│   ▌ No Tachanun · Half Hallel│
│   ▌ Ya'aleh V'Yavo · Barchi  │
│                              │
├──────────────────────────────┤
│ INDEX    ● ○ ○ ○      MORE 22│
└──────────────────────────────┘
```

### Components

**Identity strip** — replaces `HebrewDateHeader` + `LocationDisplay` entirely.
- Left: `א׳ בֶּאֱלוּל` — 15 px, 700, white, rtl, `lineHeight 1.1`.
- Right, two lines, 9.5 px: `Fri 14 Aug · Shoftim` / `Lakewood NJ`.
- Nothing centred. Centring is what forced five lines.
- Tap → Calendar. Tap the place → location settings.
- If location is a fallback, the place name takes a gold dot marker; do **not**
  add a third band (see States below).

**Hero** — `flex:1`, `justifyContent:center`, `padding 0/10`, `gap 8`.
- Row, `align:flex-end`, `space-between`:
  - Left: eyebrow `NOW` (`micro`, `#8a6a12`), then `שַׁחֲרִית` 30 px 700
    `#2c1810` rtl `lineHeight 1.02`.
  - Right, right-aligned, `paddingBottom 2`: `SOF ZMAN TEFILA` 8.5 px
    `#6f5b45` uppercase; `9:44` 15 px 700 tabular; `in 14 min` 10 px 700
    `#8a6a12`.
  - Which tefila is "now" and which deadline is shown both come from the
    existing zmanim service and time context — the same data the current
    next-zman card uses.
- **Primary, 48 dp**, `primary #1b3a4b`, `radius 6`, **`autoFocus`** with the
  gold ring. Content, centred, `gap 8`: `הַתְחֵל` 18 px 700 white rtl; a 1 dp
  `rgba(255,255,255,0.3)` divider 18 dp tall; `Start` / `Modeh Ani` 10 px
  two-line `rgba(255,255,255,0.85)`.
- **Secondary, 34 dp**, `#f1e9da`, `radius 6`: `הַמְשֵׁךְ` 15 px 700 `primary`
  rtl + `Resume · Ashrei` 10 px `#6f5b45`. Hidden when no saved position
  exists.
- **Today's deltas** — two rows, `gap 3`, each a 3 × 12 dp gold bar +
  11.5 px `#2c1810`. Only what changes davening. Line 1: Tachanun / Hallel.
  Line 2: insertions. Each row is a jump link into the assembled text, so the
  information *does* something. Replaces both info cards and all the chips —
  the chips were visually identical to the *selectable* `Chip` (F13).

**Soft keys:** `INDEX` / `MORE`, dots `● ○ ○ ○`.
Mincha, Maariv and Brachos live one press away under `INDEX`. Three of the
four categories hold exactly one tefila, so today's folder rows spend 212 dp
hiding nothing.

**Result:** 166 dp of chrome → 30. Everything on one screen. Cold open → OK →
in the text.

---

## 2 · The reader — `app/siddur/[tefilaId].tsx`, `SectionBody.tsx`

**Purpose:** the whole product. Everything else is a wrapper.

### Now
190 dp before a word of liturgy (48 dp navigator header + 101 dp title block
with a repeated שחרית and a ~30 dp jump chip + 40 dp centred divider), then
2½ lines at `textSize 22 / lineHeight 44`. Findings F6, F7, F8, F9.

### Proposed layout

```
┌──────────────────────────────┐
│ SHACHARIS · BIRCHOS HATORAH  │  running head 34 dp
│ בִּרְכוֹת הַתּוֹרָה        11/62 │  (incl. 2 dp progress rule)
├──────────────────────────────┤
│ בִּרְכוֹת הַתּוֹרָה        21px │  section title, right-aligned
│ ▏קודם שלומד תורה יברך   14px │  rubric panel
│ ▏Say before learning    11px │
│ בָּרוּךְ אַתָּה יְהֹוָה … 18/31 │  liturgy, 7 lines
│ …                            │
├──────────────────────────────┤
│ INDEX  ◀ בָּרוּךְ שֶׁאָמַר ▶  SIZE│
└──────────────────────────────┘
```

### Components

**Running head, 34 dp**, `primaryDeep`, sticky.
- Eyebrow 8 px uppercase `rgba(255,255,255,0.6)`:
  `Shacharis · Birchos Hatorah` — tefila name + **the YAML's `group` field**,
  which has never been rendered (F9 / audit note). This is the tier that makes
  62 sections navigable.
- Below it, the group in Hebrew: 13 px 700 white rtl.
- Right: `11/62` 9 px tabular `rgba(255,255,255,0.7)`.
- Bottom edge: 2 dp rule, track `rgba(255,255,255,0.18)`, fill
  `#d9a93a` at scroll %.
- Replaces both the navigator header *and* the title block. The tefila name is
  now permanently visible instead of being said twice and then scrolling away.

**Section title** — `reader × 1.15` (21 px at default), 700, **right-aligned**
like the text it introduces. Centred rule-dividers are gone: 40 dp each, and
they gave all 62 sections equal weight.

**Rubric panel** — its own register, unmistakably not liturgy:
`marginVertical 6`, `padding 4/8/4/0`, `borderRightWidth 3` `#c9a227`,
background `#f3ead6`. Hebrew cue `reader × 0.8` `#5c4033` rtl right-aligned;
English gloss 10–11 px `#6f5b45` beneath it. One register for both kinds of
cue, replacing today's accidental italic-Roboto-vs-Noto split.

**Cues that select a text** get promoted to a labelled bracket — a
`#c9a227` 1 dp box, `radius 6`, with a gold header bar reading `CHOOSE ONE`
(`micro`, `#3a2b08`) and the nusach on the right. Birkas HaShanim must never
read as one run-on paragraph.

**Liturgy** — `reader` px, `lineHeight reader × 1.7`, `#2c1810`, rtl,
right-aligned. **Opening words bold** so a reader can re-find the line after
looking up. Paragraph gap `reader × 0.45`. Measure caps at ~34 characters
where width allows.

**Soft keys:** `INDEX` / `SIZE`. Centre names the next section
(`◀ בָּרוּךְ שֶׁאָמַר ▶`) so you always know what's coming — ◀▶ move by
section here, not by tab.

**Behaviour**
- ▲▼ scroll by one line height, snapped.
- Scroll position **persisted per tefila** (AsyncStorage via the settings
  store, or a sibling store), surfaced as *Resume* on Home. This is the single
  highest-value addition in the audit: it is what makes a phone siddur behave
  like a physical one with a ribbon in it.
- Show which day the insertions were assembled for; rebuild on date change
  (`getInsertionContext()` is currently memoised at mount).
- `SIZE` opens the reader-scale picker with a live preview.

**Result:** 34 dp of chrome, 7 lines of liturgy.

---

## 3 · The index (new screen)

**Purpose:** replace the 192 dp bottom sheet (60 % cap ≈ four rows of a
30-entry list) with a full screen you can address by number.

- Identity strip: `שַׁחֲרִית` left; right `PRESS A NUMBER` (`micro`).
- Grouped by the YAML `group` field. Group eyebrow: `micro` 8.5 px `#b8860b`
  uppercase, `padding 6/10/3`.
- Rows **30 dp**, `padding 0/10`, `gap 8`:
  - Gutter: the keypad address — 12 px 700 `#8a6a12`, `width 12`.
  - Hebrew section name, `title` 15 px, rtl, right-aligned, `flex:1`.
  - Current section carries a 3 × 14 dp gold mark at the right.
- Focused row: `variant="row"` — fill `primary`, number `#e8d5b7`, text white.
  `autoFocus` lands on the current section.
- Soft keys: `JUMP` / `BACK`, centre `HOLD = BOOKMARK`.

**Why it matters:** press 4 and you are in Birchos HaTorah — no aiming, no
scrolling, eyes-free once you know your own siddur. This is the affordance a
touchscreen cannot give you, and the argument for building *on* this phone
rather than apologising for it.

---

## 4 · Zmanim — `app/(tabs)/zmanim.tsx`

### Now
278 dp of header (four-line date block + location bar + a second, differently
styled next-zman card on `primaryLight` whose title wraps at 240 dp), then
55 dp rows because the Hebrew name sits on a second line, left-aligned under
an English label, in failing-contrast `textMuted`. One of 17 zmanim visible;
the full list is 1213 dp. Nothing marks what has passed.

### Proposed

- Identity strip: `זְמַנִּים` left; right, two lines:
  `NEXT · 14 MIN` (`micro`, `#d9a93a`) / `Tefila MGA 9:44` 10 px tabular.
  The duplicate card becomes this slot — one next-zman treatment in the app,
  not two.
- Section eyebrows `MORNING` / `AFTERNOON` / `EVENING`: `micro` `#6f5b45` +
  hairline, `padding 6/0/2`.
- **Rows 22 dp, single line**, `gap 8`:
  - 5 dp state dot: passed = 1 dp `#6f5b45` outline; upcoming = filled
    `#d4c5a9`; candle-lighting = filled `#c9a227`.
  - Hebrew name `title` 14 px rtl, `flex:1`. English gloss 12 px `#6f5b45`
    **only where the Hebrew is not self-evident** (Alos, Misheyakir, Sunrise,
    Chatzos, Candles) — not on the סוף זמן rows.
  - Time 13 px tabular, right.
- **Passed zmanim: `opacity 0.42`** and no marker.
- **The next zman is the one gold row**: 30 dp, `#fdf4e0`, 3 dp
  `#c9a227` left edge, name 14 px 700, `IN 14 MIN` (`micro`, `#8a6a12`)
  beneath, time 15 px 700.
- Soft keys: `LUACH` / `REFRESH` — `RefreshControl` is gesture-only and this
  phone has no gesture worth relying on.

**Result:** 12 of 17 zmanim on the first screen; the whole day is one scan.

---

## 5 · Minyanim — `app/(tabs)/minyanim.tsx`

### Now
197 dp of chrome (location bar + 45 dp sample-data card + search field + 44 dp
chip row, third chip already clipped), 1½ results visible, every row printing
`times[0]` so it says "Shacharis 6:45" at nine at night. Finding F12.

### Proposed

- Identity strip: `מִנְיָנִים` left; right two lines
  `Mincha · nearest first` / `Lakewood NJ · 3 mi`.
- Sample-data notice: **one 14 dp line**, `warnBg`, 9 px — not a 45 dp card.
  Keep it until GoDaven is live; it is honest and cheap.
- Grouped by slot (`MINCHA`, `MAARIV`), **sorted soonest, then nearest**.
- **Rows 38 dp**, `gap 8`:
  - Left, `width 40`: time 16 px 700 tabular `lineHeight 1.1`; below it
    `IN 4H` 8 px 700 `#8a6a12`.
  - Right, `flex:1`, `minWidth 0`: shul name 12 px 600; then
    `Sefard · 2.1 mi · Ocean Ave` 9.5 px `#6f5b45`.
  - **The time leads and it is the *next* time.** Today the shul name — which
    a traveler does not know — is largest and the time is smallest.
- Focused row: `variant="row"`.
- Soft keys: `FILTER` / `CALL`. Search + seven chips collapse into `FILTER`
  (a full-screen picker: slot, nusach, radius). `CALL` is what a traveler
  wants next and it is free — the phone is a phone.

## 6 · Minyan detail — `app/minyan/[minyanId].tsx`

### Now
22 px title, muted subtitle, 46 dp bordered address row, optional phone row,
then one card per day-scope at 14 dp padding. Two facts and one time visible;
the screen's whole purpose starts below the fold.

### Proposed
- Identity strip carries name (13 px 700) and
  `Ashkenaz · 0.4 mi · Forest Ave` (9.5 px).
- `NEXT · TODAY` eyebrow, then the next minyan as the gold row (30 dp,
  `#fdf4e0`, gold left edge, `in 4h`, time 14 px 700).
- Then `WEEKDAYS` / `SHABBOS` groups, 24 dp rows: label left 12.5 px, time
  13 px 600 tabular right.
- Soft keys: `DIRECTIONS` / `CALL` — the two things you do here, one keypress
  each instead of hunting for a 46 dp row.

---

## 7 · All Tefilos — `app/siddur/browse.tsx`

### Now
Three of eight categories hold one tefila; four hold none. Each still gets a
32 dp uppercase header plus a bordered group, so three visible rows cost
250 dp — and empty categories are silently filtered out, so the screen's
length changes as content lands.

### Proposed
- Identity strip: `סִידּוּר` + `PRESS A NUMBER`.
- **Drop the category tier at this size.** List the tefilos, numbered, rows
  34 dp: gutter number 12 px 700; Hebrew `title` 16 px rtl `flex:1`; English
  gloss 10 px `#6f5b45` right.
- **Empty categories stay visible at `opacity 0.4` marked `soon`.** Honest,
  keeps numbering stable as content lands, and answers "does this have
  Tehillim yet" without a support email.
- Focused row `variant="row"`; soft keys `OPEN` / `BACK`.

## 8 · Calendar — `app/(tabs)/calendar.tsx`

### Now
74 dp centred date block + location bar + 50 dp four-way view switcher + seven
`Card`s at 45 dp overhead each. One card visible. The Details card runs up to
eleven flat rows (451 dp) where "Tachanun" weighs the same as "Molad".
`Hebrew date` prints `hebrew.englishDate` (`calendar.tsx:281`). Finding F13.

### Proposed — two ranked zones
- Identity strip: `א׳ בֶּאֱלוּל` + `Fri 14 Aug · Shoftim` /
  `Rosh Chodesh Elul`.
- **`AFFECTS DAVENING`** — gold eyebrow, four 24 dp rows, each with a 3 × 13 dp
  gold bar: Tachanun / Hallel / Insertions / Shir Shel Yom. Label 12 px left,
  value 12 px 600 right. These four facts are why a davener opens this tab.
  This is the *same data Home shows* — make one of them canonical and have the
  other link to it, rather than a third and fourth rendering (F13).
- **`SHABBOS`** — candle lighting, havdala; 24 dp rows, times 13 px 700
  tabular.
- **`REFERENCE`** — one 26 dp row, `Daf Yomi · Molad · Upcoming` + chevron,
  opening a sub-screen. Everything non-davening lives behind it.
- Fix the `hebrew.englishDate` mislabel.
- **Cut Week.** Month and Agenda are the two a 240 dp grid can hold (34 dp
  cells). The switcher becomes the `MONTH` soft key, removing a fourth
  navigation layer nested inside a tab bar.

## 9 · Settings — `app/(tabs)/settings.tsx` + `prayerSettings` / `zmanimSettings`

### Now
Thirteen cards, each with a 13 px uppercase eyebrow, a subtitle, and a
wrapping row of 44 dp chips. Nusach's four chips wrap to four rows at 240 dp —
**one setting fills the viewport**. Total ~1400 dp, five screenfuls. Luach
alone has seven chips. Selection is carried by fill colour only, so with a
focus ring in play a d-pad user cannot tell *focused* from *selected*.

### Proposed
- Keep the **Prayer / Zmanim / App grouping** — that IA is right.
- Switch the form to **30 dp value rows**: label 12.5 px left, current value
  12.5 px `#6f5b45` right, chevron. OK opens a **full-screen single-choice
  picker**.
- Nusach becomes one row: `Nusach · Ashkenaz`. Candles and Havdala pair into
  one row: `Candles · Havdala   18 min · 8.5°`.
- Nine rows on one screen instead of one card.
- Text size keeps a **live preview inside its picker** — there the preview *is*
  the control.
- About + licences move behind an `About` row, set at 11 px `#6f5b45`.
  Attribution you are obliged to display must not be the least legible text in
  the app (F11).
- Soft keys: `CHANGE` / `BACK`.

---

## States

The current loading, error and fallback-location states are **the app's best
work** — keep them in substance.

- **Loading** (`LoadingSpinner` + `zmanim.tsx`): keeps the header and location
  bar rather than swapping the whole tab, so nothing jumps on cold load.
  Correct. Just reflow to the 30 dp identity strip.
- **Error**: names the failure and offers Retry. **Fix:** Retry must be
  focusable and `autoFocus` — it is the only action on screen and a d-pad
  currently cannot reach it.
- **Fallback location**: refuses to present a default as real. **Fix:** on the
  F1 the banner pushes a 166 dp header to 199 dp, leaving 97 dp of content.
  Fold it into the identity strip as a gold "default location" marker on the
  place name, tappable — not a third stacked band.
- **Missing (new):** the reader has no loading or missing-content state above
  the section level, and no indication of which day's insertions are built in.
  Add both.
- **Empty (new):** 43 sections have no text yet. Decide with the user how a
  section with no content should read in the reader and in the index — an
  honest "not yet" beats a silent gap. Not designed here.
