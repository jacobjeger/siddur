# The 14 findings

All measurements are at 240 × 320 dp (≈296 dp usable viewport), derived from
the current code's own values.

---

## F1 — No focus states, anywhere · BLOCKING

Zero occurrences of `focusable`, `onFocus`, or any focus style across all nine
screens. Every interactive element is a `Pressable` or `TouchableOpacity`
styled only for `pressed`. On a d-pad phone the user has no cursor, so they
cannot see where they are and cannot commit to a press.

Everything else on this list is a matter of degree. This one makes the app
unusable without touch. Fix first — see `03-input-model.md`.

**Files:** all screens; the fix belongs in a new shared primitive.

---

## F2 — 56 % of the screen is chrome

`HebrewDateHeader` stacks up to five centred lines (110 dp: Hebrew date,
English date, parsha, special day, Omer), `LocationDisplay` adds 32 dp, the
system status band 24 dp — **166 dp before any content**, on a 296 dp
viewport. A fallback-location warning bar can add 33 dp more, for 199 dp,
leaving 97 dp of content.

Two of the five header lines are 13 px muted text nobody reads twice.
Centring is what forced five lines; left-aligning collapses them to two.

**Files:** `src/components/common/HebrewDateHeader.tsx`,
`LocationDisplay.tsx`
**Target:** 30 dp identity strip. See `04-screens.md` → Home.

---

## F3 — The primary action is 2.7 screenfuls down

*Start Davening* renders last in `(tabs)/index.tsx`, after the date header,
location bar, two info cards, four category rows and an "All Tefilos" row —
roughly 780 dp down. At 240 dp its bilingual label
(`Start Davening  התחל להתפלל`) also wraps inside the button. The one job of
the app is the hardest thing to reach.

**File:** `app/(tabs)/index.tsx:269`

---

## F4 — Two languages at the same size, in half the width

`Start Davening  התחל להתפלל`, `All Tefilos  כל התפילות`,
`Next Zman  הזמן הבא`, `Shacharis  שחרית` — English leads, Hebrew trails,
identical size, near-identical weight. At 240 dp these rows wrap or clip. For
a reader who knows the siddur cold, the English is the part to shrink.

**Files:** `(tabs)/index.tsx`, `siddur/browse.tsx`, `(tabs)/zmanim.tsx`

---

## F5 — Five labelled tabs on a 240 dp bar

48 dp per tab. "Minyanim" and "Calendar" at 10 px only just fit and truncate
with any font scaling. The bar also costs 44 dp of a 296 dp viewport — 15 %
spent on navigation the d-pad could do for free with ◀▶.

**File:** `app/(tabs)/_layout.tsx`
**Target:** 22 dp soft-key row with position dots.

---

## F6 — The reader shows 2½ lines of liturgy

Title block (≈101 dp: a 24 px שחרית repeat plus the jump chip) and a centred
section divider (40 dp) put the first line of text at **y ≈ 190**. At
`textSize 22` with `lineHeight 44`, two and a half lines are visible. This is
the core screen of the product.

**Files:** `app/siddur/[tefilaId].tsx`,
`src/components/common/SectionBody.tsx`
**Target:** 34 dp of chrome, ≥ 7 lines.

---

## F7 — You cannot find your place

62 sections in one `ScrollView`. The only index is a bottom sheet whose
trigger sits at the very top of the scroll — twenty sections in, the way back
is to scroll all the way up. In `daven.tsx` the trigger appears only above the
*first* tefila. No sticky heading, no progress, no prev/next, and no saved
position: reopen Shacharis and you are at Modeh Ani again. The sheet itself is
capped at 60 % — 192 dp, about four rows of a 30-entry index.

**Files:** `app/siddur/[tefilaId].tsx:100`, `app/siddur/daven.tsx:139`

---

## F8 — `textSize` scales by ± constants, so it breaks at both ends

Everything in the reader derives arithmetically from one number: title `+2`,
divider `−2`, translation `−2`, the jump chip and the סיום button `−6`,
rubrics `× 0.62`. Store default 22, range 16–32.

At the 16 pt floor the jump chip is 10 px and rubrics are 9.9 px —
unreadable at 143 ppi. At 32 pt the button label is 26 px, unlike every other
button in the app. Use one ratio scale.

**Files:** `[tefilaId].tsx`, `SectionBody.tsx`, `stores/useSettingsStore.ts`

---

## F9 — Rubrics are treated as noise

A rubric renders at 0.62 × body, muted, same face, same right alignment, no
rule, no indent. But some rubrics *choose between two texts* — Birkas
HaShanim, summer or winter. A cue that decides what you say cannot look like a
footnote. Print siddurim give instructions a second face for exactly this
reason. Worse, the English cue is italic Roboto at `× 0.6` and the Hebrew cue
is Noto Serif at `× 0.62`, so the two kinds of instruction have two accidental
styles and both read as damaged body text.

**File:** `src/components/common/SectionBody.tsx:30`

---

## F10 — 1 dp hairlines on cream, at 143 ppi

The whole layout is held together by `#d4c5a9` 1 dp borders on `#fff9f0` —
about a 1.4:1 value step. On a low-density LCD that reads as a smudge, not a
line. Structure at this size has to come from **value and space**, not rules
and 12 dp radii.

**Files:** `src/hooks/useTheme.ts` + every screen

---

## F11 — `textMuted` fails AA — and carries the licences

Light `#8b7355` on `#fff9f0` is ≈ **4.0:1**, used at 12–13 px for rubrics,
captions, zman Hebrew names, the inactive tab tint, and the whole About
block. On a rugged outdoor screen this is the first thing to disappear in
sunlight — and the attribution you are contractually obliged to display is
the least legible text in the app.

**Fix:** `#8b7355` → `#6f5b45` (≈ 5.4:1), nothing below 11 px.
**Files:** `src/hooks/useTheme.ts`, `app/(tabs)/settings.tsx:126`

---

## F12 — Minyanim shows `times[0]`, not the next minyan

With no slot filter the row renders whatever is first in the array — weekday
Shacharis 6:45 at nine at night. No sort, no "soonest", no map. Distance is
glued onto the nusach line with a middot. The shul name — which a traveler
does not know — is the largest text; the time is the smallest.

Above the list: a location bar, a 45 dp sample-data card, a search field and a
44 dp chip row = **197 dp of chrome**, and the chip row scrolls horizontally
on a device with no horizontal gesture worth trusting. The third chip is
already clipped. Free-text search is the primary filter on a phone where
typing "Beis Medrash" is ~20 T9 presses.

**File:** `app/(tabs)/minyanim.tsx:213`

---

## F13 — "What's different today" is answered in four places

Home's Today card (chips), Calendar's Today card (icon rows), Calendar's
Insertions card (chips again), and Calendar's Details card (label/value rows).
Four shapes, one fact.

The Details card can run eleven flat rows — 11 × 41 dp = **451 dp**, one and a
half screenfuls — in which "is there Tachanun today" weighs exactly the same
as the Molad. One row is mislabelled: *Hebrew date* prints
`hebrew.englishDate`.

The insertion chips are a second problem: same shape, fill and border as the
*selectable* `Chip` used on Minyanim and Settings, but these are static
labels. One form telling two different lies.

**Files:** `(tabs)/index.tsx:99`, `(tabs)/calendar.tsx:216–330`
(mislabel at `calendar.tsx:281`)

---

## F14 — `tokens.ts` exists; the screens ignore it

The token file declares five type sizes. The screens render at 10, 12, 12.9,
13, 13.6, 14, 15, 16, 17, 18, 20, 24 and 26 px. Radii are hardcoded 8 and 12
next to `radius.md`. `hitSlopFor()` is exported and never called. Only `Card`
and `Chip` consume the system — and `Card`'s 16 dp padding plus a 13 px
uppercase eyebrow is 45 dp of overhead per card on a 296 dp screen.

There is also no typographic identity above the Hebrew: Noto Serif Hebrew is
loaded for Hebrew only (`_layout.tsx:51`), so every Latin character is
platform-default Roboto at default weights, and bilingual pairs read like a
translation table rather than a page.

**File:** `src/theme/tokens.ts`

---

## One state that does not exist

`getInsertionContext()` is memoised at mount. Leave the app open overnight and
yesterday's insertions are still assembled into the text with nothing saying
so. The reader should show which day it was built for, and rebuild on date
change.
