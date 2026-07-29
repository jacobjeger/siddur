# Implementation plan

Ordered so that each stage is verifiable on device before the next begins.
Do not start P1 until every P0 box is checked — P1 is a large refactor and it
is not reviewable without focus states to test it with.

---

## P0 — nothing ships without these

### 1. The focus system
**New:** `src/components/common/Focusable.tsx` — see `03-input-model.md`.
**Touches:** every screen; replace `Pressable` / `TouchableOpacity` at
interaction sites.

- `variant="ring"` (2 dp `#b8860b`, offset 2) and `variant="row"` (fill
  `primary`).
- `selected` as a 3 dp gold left edge, orthogonal to focus.
- Exactly one `autoFocus` per screen, and it is the primary action.

**Done when:** you can operate every screen with d-pad + OK + back only, and
the focused element is always visible and never confusable with a selected one.

### 2. Key bindings
**New:** a `useKeyHandler` screen-root hook.
**Touches:** all nine screens; `app/(tabs)/_layout.tsx`.

▲▼ focus/scroll · ◀▶ section-or-tab · OK activate · soft L/R screen verbs ·
1–9 jump · long-press digit bookmark. Each screen declares its two verbs as
data so the legend row can't drift from the bindings.

### 3. Soft-key row replaces the tab bar
**Touches:** `app/(tabs)/_layout.tsx`, plus a shared `<SoftKeys>` component.

22 dp `primaryDeep`, left/right legends + four position dots. Removes 22 dp
and fixes the truncating 10 px labels (F5). Tabs move to ◀▶.

### 4. Reader chrome: 190 dp → 34 dp
**Touches:** `app/siddur/[tefilaId].tsx`, `app/siddur/daven.tsx`.

Sticky running head with tefila + **`group` from YAML** + `n/62` + a 2 dp gold
progress rule. Delete the repeated title block, the in-content jump chip and
the centred section dividers. Section titles become right-aligned. Add the
section pager to the soft-key centre.

**Done when:** ≥ 7 lines of liturgy visible at the default size.

### 5. Saved reading position + Resume
**Touches:** `src/stores/` (new slice or store), `[tefilaId].tsx`,
`(tabs)/index.tsx`.

Persist scroll offset per tefila; expose it as *Resume · <section>* on Home.
Also rebuild `getInsertionContext()` on date change instead of memoising at
mount.

---

## P1 — the system

### 6. Retune `tokens.ts` for 240 dp, and make screens consume it
**Touches:** `src/theme/tokens.ts` + all nine screens +
`src/components/common/ui.tsx`.

Type 9/11/13/16/20/30; space 2/4/8/12/20; gutter 10; radius sm 4 / md 6; row
heights per `02-design-tokens.md`. Then remove every hardcoded font size,
padding and radius from screen files — that removal *is* the task (F14).
Either use `hitSlopFor()` or delete it.

**Suggested guard:** a lint rule or review checklist item banning numeric
`fontSize` / `borderRadius` literals in `app/**`.

### 7. Ratio-based reader scale
**Touches:** `SectionBody.tsx`, `[tefilaId].tsx`, `useSettingsStore.ts`.

`reader: 15…26, default 18`; every reader value a ratio (F8). Migrate the
persisted `textSize` (old range 16–32, default 22) — clamp existing values
into the new range on read so nobody's setting resets silently.

**Done when:** at 15 nothing is under 11 px; at 26 nothing bursts its row; UI
chrome does not scale with it.

### 8. Contrast and density pass
**Touches:** `src/hooks/useTheme.ts` + screens.

`textMuted #8b7355 → #6f5b45`; dark `primary #c4a265 → #7fa8bd`; nothing under
11 px; drop 1 dp hairline card borders and 12 dp radii in favour of value and
space (F10, F11).

### 9. Home rebuilt as one fixed screen
**Touches:** `(tabs)/index.tsx`, `HebrewDateHeader.tsx`,
`LocationDisplay.tsx`.

30 dp identity strip; hero with 48 dp `autoFocus` primary + 34 dp Resume; two
gold-ruled delta lines. Delete both info cards, the four category rows and the
"All Tefilos" row. Fold the fallback-location warning into the strip as a gold
marker.

**Done when:** nothing below the fold at 296 dp; cold open → OK → in the text.

---

## P2 — the payoff

### 10. Numbered index + keypad jumps + bookmarks
**New screen**, replacing both TOC modals in `[tefilaId].tsx` and
`daven.tsx`.

### 11. Rubric register + "choose one" brackets
**Touches:** `SectionBody.tsx`.
One register for both cue languages; promote text-selecting cues to a labelled
bracket (F9).

### 12. Zmanim as a single-line list
**Touches:** `(tabs)/zmanim.tsx`, `src/utils/constants.ts` (gloss only where
the Hebrew isn't self-evident).
22 dp rows, passed/next states, one gold row, `REFRESH` soft key. Delete the
duplicate next-zman card.

### 13. Minyanim sorted soonest-nearest
**Touches:** `(tabs)/minyanim.tsx`, `src/services/minyanim/*`.
Group by slot, sort by time then distance, time leads. Replace search + seven
chips with a `FILTER` picker; add `CALL` (F12).

### 14. Minyan detail, Browse, Calendar, Settings
Per `04-screens.md`. Calendar: two ranked zones, cut Week, fix the
`hebrew.englishDate` mislabel. Settings: 30 dp value rows + full-screen
pickers, licences behind About.

### 15. The outer display
1.44″ screen: next zman + countdown while closed. Nobody else has that. Scope
separately once P0–P1 are on device.

---

## Not designed — decide with the user first

- **43 sections with no text.** How should an empty section read in the reader
  and in the index?
- **`siddur/daven.tsx`** — assembling several tefilos into one scroll needs a
  different answer at 296 dp than on a slab (the current flow shows the jump
  chip only above the first tefila).
- **Translations.** The gloss line is the slot; no UI specified.
- **The real logical viewport.** Confirm before locking constants.

---

## Suggested commit sequence

```
1  feat(a11y): Focusable primitive with ring/row variants
2  feat(a11y): screen-root key handler, d-pad + soft keys + digits
3  refactor(nav): soft-key row replaces 5-tab bar
4  feat(reader): sticky running head, group tier, progress rule
5  feat(reader): persist reading position; Resume on Home
6  refactor(theme): retune tokens for 240dp; consume in all screens
7  refactor(reader): ratio-based type scale, migrate textSize
8  fix(a11y): contrast pass; drop hairlines and large radii
9  refactor(home): single fixed screen, hero + deltas
10 feat(reader): numbered index, keypad jumps, bookmarks
…
```

Stages 1–5 are the ones that change whether the app is usable. 6–9 are what
make it feel designed. 10+ are what make it better than a printed siddur on
this specific phone.
