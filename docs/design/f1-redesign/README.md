# Handoff: Siddur app redesign for the MegaLife F1

## Overview

The siddur app (Expo / React Native, expo-router) is currently laid out for a
412 × 892 dp touch slab. It ships on the **MegaLife F1** — a rugged kosher
clamshell with a **2.8″ QVGA inner screen (≈240 × 320 dp)**, a d-pad, and a
numeric keypad. On that device the current Siddur tab spends **56 % of the
viewport on chrome**, the primary action (*Start Davening*) sits **2.7
screenfuls down**, and the reader shows **2½ lines of liturgy**. There are
**zero focus states in the codebase**, so the d-pad — the phone's primary
input — cannot drive the app at all.

This package documents a redesign that treats the F1 as *a book with five
buttons* rather than a small phone: fixed screens instead of long scrolls, one
decision per screen, d-pad navigation with visible focus, soft-key verbs, and
keypad jumps.

The user's stated priority: **flip open, text on screen, under two seconds.**
Primary users are a frum daily davener who knows the siddur cold, and a
traveler who needs zmanim and a minyan fast.

## About the design files

`Design Audit.dc.html` in this bundle is a **design reference created in
HTML** — an annotated audit document containing before/after screen
recreations at 240 × 320. It is **not production code to copy**. Every
"Now" frame is the real codebase's own values reflowed to the F1 viewport
(so the crops show honestly what fits); every "Proposed" frame is a target
design.

The task is to **implement these designs in the existing Expo / React Native
codebase**, using its established patterns: `expo-router` file routes,
`react-native` primitives, the `useTheme()` hook, `src/theme/tokens.ts`,
zustand stores, and the existing `src/components/common/*` primitives. Do not
introduce a web renderer, a CSS framework, or new state libraries. The HTML is
a specification of layout, hierarchy, type and colour — translate it into RN
`StyleSheet` / inline style objects.

Open the HTML in a browser to see the full annotated audit (14 findings, the
input-model table, the token system, and every screen before/after).

## Fidelity

**High-fidelity.** Colours, type sizes, row heights and dp measurements in
this README are final and should be matched. Two caveats:

1. **The 240 × 320 dp figure is an assumption** derived from the F1's QVGA
   2.8″ panel and its Cat S22–derived chassis. Confirm against a real device
   before locking layout constants. If the real logical viewport differs,
   every dp number here scales proportionally — keep the *ratios* and the
   *ranking*, adjust the constants. Put the real numbers in one place
   (`tokens.ts`) so this is a one-file change.
2. Assume **~296 dp of usable app viewport** (320 minus a 24 dp system status
   bar). All "fits on one screen" claims below are against 296 dp.

## Target platform constraints

| Property | Value | Consequence |
|---|---|---|
| Inner display | 2.8″ IPS, QVGA, ≈143 ppi | 1 dp hairlines and 12 dp radii read as smudges; nothing below 11 px is legible |
| Logical viewport | ≈240 × 320 dp (296 usable) | No cards, no 16 dp gutters, no stacked header bands |
| Input | Touch **and** d-pad + numeric keypad + 2 soft keys + hardware back | Focus states are mandatory; text entry is T9 and must be avoidable |
| Outer display | 1.44″ | Future: next zman + countdown while closed (P2) |
| OS | Android 13 (Mega OS) | Standard RN key handling applies |

Touch still works and the F1 is touch-capable — but a 5.7 mm list row on a
2.8″ screen is a thumb-sized target on a phone held in a closed fist. Design
for the d-pad first; touch is the fallback, inverting today's assumption.

## The three decisions the redesign rests on

1. **Hebrew leads, English glosses.** Hebrew at display size in Noto Serif
   Hebrew; English at caption size beneath or beside it, never at equal
   weight. Halves row width, restores the feel of a siddur, and leaves a slot
   for translation later (the gloss line grows into a paragraph). Today's
   `English  עברית` pairs at identical size wrap or clip at 240 dp.
2. **One screen, one primary action.** Home's job is to put you in the text.
   Everything else is subordinate. Home and every settings screen must fit in
   296 dp with nothing below the fold; only the reader and the zmanim list
   scroll, and both scroll in snapped increments.
3. **Navy is structure, gold is *now*.** Gold means exactly one thing: the
   current moment (next zman, today's insertions, your place in the tefila).
   Navy carries every interactive and structural element including the single
   CTA fill. One consequence to accept: *Start Davening* becomes navy. Today
   it is the only gold button in the app while its own counterpart — סיום,
   ending the same flow — is navy.

## Documents in this bundle

| File | Contents |
|---|---|
| `README.md` | This file — start here |
| `01-findings.md` | The 14 audit findings with file/line references and measurements |
| `02-design-tokens.md` | Full token set for 240 dp, with the current values they replace |
| `03-input-model.md` | D-pad / soft-key / keypad bindings and the focus system to build |
| `04-screens.md` | Every screen: layout, components, exact values, states |
| `05-implementation-plan.md` | P0 / P1 / P2 ordered work, with the files each touches |
| `Design Audit.dc.html` | The visual audit — before/after frames, annotated |
| `assets/` | Noto Serif Hebrew (already in the app at `src/assets/fonts/`) |

`support.js` is a runtime for the HTML document only. It is not part of the
app and should not be copied into the codebase.

## Reading order for implementation

1. `03-input-model.md` — build the focus system first. Nothing else is
   verifiable without it, and it is the one blocking defect.
2. `02-design-tokens.md` — retune `src/theme/tokens.ts`, then make screens
   actually consume it.
3. `04-screens.md` — screen by screen, in the P0/P1/P2 order from
   `05-implementation-plan.md`.

## Codebase orientation

```
app/
  _layout.tsx              Stack + font loading (Noto Serif Hebrew, Hebrew only)
  (tabs)/_layout.tsx       5 labelled tabs  → becomes a soft-key row
  (tabs)/index.tsx         Siddur/home      → §05 in the audit
  (tabs)/zmanim.tsx        17 zmanim        → §07
  (tabs)/minyanim.tsx      search + 7 chips → §07
  (tabs)/calendar.tsx      7 cards, 4 views → §09
  (tabs)/settings.tsx      13 cards         → §09
  siddur/[tefilaId].tsx    the reader       → §06  ← the product
  siddur/daven.tsx         multi-tefila flow
  siddur/browse.tsx        All Tefilos      → §09
  minyan/[minyanId].tsx    minyan detail    → §09
src/
  theme/tokens.ts          exists, largely unused by screens
  hooks/useTheme.ts        light/dark colour objects
  components/common/       ui.tsx (Card, Chip, Button), HebrewText,
                           SectionBody, HebrewDateHeader, LocationDisplay,
                           LoadingSpinner
  components/settings/     prayerSettings, zmanimSettings
  components/calendar/     CalendarViews (ViewSwitcher, month/week/agenda)
  stores/useSettingsStore  zustand + AsyncStorage persist
  services/zmanim, minyanim
content/
  categories.yaml          8 categories
  prayers/*.yaml           section text; carries unused `group` + `sourceRef`
```

Content is authored in YAML and compiled by `npm run build:prayers` into
`src/data/generated/`. **Do not hand-edit generated files.** Two YAML fields
the UI has never rendered — `group` and `sourceRef` — are load-bearing in this
redesign (`group` becomes the reader's running head and index tier).

## What the current build already gets right — keep it

Do not regress these while redesigning:

- **Loading, error and fallback-location states.** The loading state keeps the
  header and location bar rather than swapping the whole tab, so nothing jumps
  on cold load. The error state names the failure and offers Retry. The
  fallback banner refuses to present a default location as real. All three are
  correct instincts; they need only the two fixes in `04-screens.md`.
- **Hardware back closes the TOC modals** (`onRequestClose` is wired on both).
- **The Prayer / Zmanim / App grouping in Settings** is the right information
  architecture. Only the *form* changes (cards → value rows).
- **`tokens.ts` as a concept.** The file is right; it is sized for the wrong
  phone and the screens ignore it.
- **Bidi-safe Hebrew rendering** in `HebrewText` / `SectionBody`.

## Definition of done

- [ ] Every interactive element is focusable and shows a visible focus ring.
- [ ] The app is fully operable with d-pad + OK + soft keys + back, touch
      never required.
- [ ] From a cold open, **OK** starts davening — zero d-pad presses, no aiming.
- [ ] Home fits 296 dp with nothing below the fold.
- [ ] The reader shows ≥ 7 lines of liturgy at the default text size.
- [ ] Reading position survives app restart, and Home offers *Resume*.
- [ ] The keypad jumps to indexed sections; holding a number sets a bookmark.
- [ ] No text below 11 px anywhere; `textMuted` ≥ 4.5:1 on its background.
- [ ] Every screen's type, spacing and radii come from `tokens.ts` — no
      hardcoded font sizes or radii in screen files.
- [ ] Reader type holds proportion at both ends of its range (15 pt and 26 pt).

## Open questions for the user — do not guess

1. **Confirm the real logical viewport** of the F1 inner display (see
   Fidelity). Every constant depends on it.
2. **43 sections still have no text**, and `siddur/daven.tsx` assembles
   several tefilos into one scroll. Both are content-shape questions rather
   than layout ones, and at 296 dp they need a different answer than on a
   slab. Not designed here.
3. **Translations.** The user's answer was "not sure yet — design so it can
   slot in later." The gloss-line pattern in decision 1 is that slot; no
   translation UI is specified.
4. **Which Hebrew keyboard / T9 behaviour** the F1 exposes, if any text entry
   survives at all (the redesign removes the only text input).
