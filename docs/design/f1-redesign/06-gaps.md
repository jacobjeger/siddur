# Gaps in the implementation plan

Written after the plan's two corrections were accepted. Ordered by severity.
Items 1 and 2 are content-model work the plan treats as styling work; 3–5 are
audit decisions that never became tasks.

---

## 1 · Rubrics have no type field — and are detected by a heuristic

**The plan says:** P2 #11, "Rubric register + 'choose one' brackets in
`SectionBody.tsx` — one register for both cue languages."

**The problem:** there is nothing in the data to key a bracket off. Checked:
`rubric` appears nowhere in `content/prayers/*.yaml`. Sections carry only
`instruction` (English) and `instructionHe` (Hebrew) as free strings
(`src/data/types.ts:11`), and inline rubrics are classified **at runtime by
inference**:

```
src/utils/sectionBlocks.ts:32
  "A Hebrew line carrying no nikkud is a rubric."
```

Two consequences:

**a) The heuristic's cost rises sharply under the redesign.** Today a
misclassified line is slightly muted and mostly survives being wrong. The
proposed register puts rubrics in a tinted panel with a 3 dp gold edge — so
unvocalized liturgy becomes a *box*, and a vocalized rubric becomes liturgy.
The comment at `sectionBlocks.ts:36` records one such bug already fixed (maqaf
counted as nikkud). **Do not strengthen the rubric styling while the
classification is inferred.** Either add an explicit block kind to the
content, or keep rubric styling weak until you do.

**b) "Choose one" cannot be built.** The cases my F9 named are encoded as
English prose in `instruction`:

| Section | `instruction` value |
|---|---|
| Birkas HaShanim | `"Winter: Dec 4/5 chutz laaretz or 7 Cheshvan EY through Pesach"` / `"Summer months"` |
| Torah brachos | `"Before: Asher Bachar Banu. After: Asher Nasan Lanu."` |
| Aseres Yemei Teshuva | `"Replaces bracha 3 ending"` / `"Replaces bracha 11 ending"` |
| Ahava Rabba | `"Ashkenaz: Ahava Rabba"` |
| Amidah close | `"Ashkenaz Shacharis: Sim Shalom. Mincha/Maariv: Shalom Rav"` |

These are variant selectors written for a human reading the YAML, not data.

**What's needed** (a schema change + `build:prayers` + generated types, not a
`SectionBody` change):

```yaml
blocks:
  - kind: cue          # short action: "ואומר שליח צבור חצי קדיש:"
  - kind: variant      # selects between texts — renders as the bracket
    group: birkas-hashanim
    when: { season: winter }
  - kind: note         # long-form halachic commentary
```

Scope this before P2 or #11 will be built as decoration over a guess.

## 2 · Conditional sections are prose, so "different today" is decorative

The audit's Home shows two gold delta lines and says each is a jump link into
the **assembled** text. The plan carries that forward. But assembly per-day
does not exist in the content layer:

- `"OMIT on days with no Tachanun"` — a string (Lamnatzeach)
- `"OMIT: Erev YK, Erev Pesach, Chol HaMoed Pesach"` — a string (Mizmor Shir)
- `"Rosh Chodesh only"`, `"Elul 1 through Shemini Atzeres"` — strings
- `"Sun:24 Mon:48 Tue:82 Wed:94 Thu:81 Fri:93"` — Shir Shel Yom's whole lookup
  table, as prose
- `"With 3+ men. With 10+: add Elokeinu."` — a quorum rule, as prose

Home and Calendar compute Tachanun / Hallel / insertions correctly from the day
rules. The **reader cannot act on any of it.** So on a day with no Tachanun the
app tells you so on Home and then renders Tachanun anyway, with a muted English
note asking you to omit it.

This is the largest functional gap in the plan, and it is invisible in it
because every stage is scoped to a screen. It needs the same `when:` field as
item 1 — do them together.

## 3 · "Hebrew leads, English glosses" never became a task

Decision 1 of the audit and finding F4 — the most pervasive change in the whole
document. The plan implies it inside #9 (Home) and #14 ("per `04-screens.md`"),
but there is no stage that says *invert the bilingual pairs app-wide*. Sites:

- `(tabs)/index.tsx` — category rows, "All Tefilos", CTA, card eyebrows
- `siddur/browse.tsx` — every row
- `(tabs)/zmanim.tsx` — 17 rows, English label over a muted Hebrew name
- `components/common/ui.tsx` — the shared row/card primitives that render the
  pairs
- `(tabs)/minyanim.tsx`, `(tabs)/settings.tsx` — labels

Without one stage and a checklist this lands on Home and nowhere else, and the
app ends up with two bilingual conventions instead of one. Make it explicit,
and put the pair in a single shared component so it cannot drift.

## 4 · The colour-semantics pass is missing

Plan #8 is a **contrast** pass only (`textMuted`, dark `primary`). Decision 3 —
*navy is structure, gold is now* — never becomes work. Left undone:

- *Start Davening* stays gold while סיום, ending the same flow, stays navy.
- Gold keeps doing seven jobs: countdown, card icons, switch tracks, event
  pills, CTA.
- The plan notes `accent` on `primaryLight` at 2.27:1 for insertion chips as a
  carried-over failure, but fixing that ratio without the semantic rule just
  produces a legible wrong colour.

Add a stage: one CTA colour, gold reserved for *now*, and a review rule.

## 5 · The Latin half of F14 is unaddressed

`_layout.tsx:51` loads Noto Serif Hebrew for Hebrew only; every Latin character
is platform-default Roboto at default weight. Plan #6 retunes *sizes* but never
assigns a Latin face or a pairing, so bilingual rows keep reading like a
translation table rather than a page. Decide the pairing and put it in
`tokens.ts` alongside the scale.

---

## Smaller, concrete

**6 · Retry is not focusable.** Plan #1 enumerates "13 interaction sites, plus
settings Chips and CalendarViews cells" — the loading / error / fallback states
are not in that count. Retry is the *only* action on its screen, so a d-pad
cannot reach it at all. It needs `autoFocus`. (The three states are otherwise
the app's best work — keep them.)

**7 · No "assembled for which day" indicator.** Plan #5 fixes
`getInsertionContext()` rebuilding on date change. Nothing shows the user which
day the text in front of them was built for. Add it to the running head.

**8 · Bookmark persistence isn't in the store shape.** #5 creates
`useReadingStore` for scroll offsets; #10 adds long-press bookmarks later,
which means a second migration of a persisted store. Define both keys in #5
and leave bookmarks unused until #10.

**9 · No acceptance pass for the stated goal.** "Operable with d-pad + OK +
back" and "in the text in under two seconds" are the two goals, and neither is
measured anywhere. Add a device checklist: navigate every screen with touch
disabled; time cold-open → first line of liturgy; confirm the focused element
is always on screen and never confusable with a selected one.

**10 · Dark mode parity.** Every value in the handoff is specified in light.
Plan #8 swaps dark `primary` and stops. Each redesigned screen needs a dark
pass — particularly the gold-on-dark "now" row and the focus ring on the
`primaryDeep` bands.

**11 · Empty sections collide with the numbered index.** Deferred as a content
question (correctly), but P2 #10 depends on it: keypad addresses must stay
stable whether or not a section has text, or the numbers move as content lands.
Decide the empty-section treatment *before* building the index, not after.
