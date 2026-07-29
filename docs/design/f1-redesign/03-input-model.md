# Input model — build this first

Finding F1 is blocking: the codebase has **zero** focus states. Until this
exists, nothing else in the redesign is verifiable, because the d-pad is the
F1's primary input.

---

## Bindings

| Control | Should do | Today |
|---|---|---|
| **▲ ▼** | Reader: scroll by **line**, snapped, so nothing is ever half-cut. Lists: move focus one row, auto-scrolling to keep it in view. | Free-pixel `ScrollView` fling; no focus concept, so "which row" is undefined |
| **◀ ▶** | Reader: previous / next **section**. Everywhere else: previous / next **tab**. This is how you leave a screen without hunting for a tab bar. | Unbound. Tabs reachable only by touching a 48 × 40 dp target |
| **OK** | Activate the focused thing. On Home with nothing focused: **start davening**. The default action must never require aiming. | Nothing is focused on mount, so OK does nothing |
| **Soft L / R** | The two verbs of the current screen, labelled on screen directly above the physical keys — `INDEX`/`BACK`, `FILTER`/`CALL`, `SIZE`/`BACK`. A flip-phone user reads the corners. | No soft-key row exists |
| **1 – 9** | Direct jumps: number the index, let the keypad address it. Long-press sets a bookmark. | Unused |
| **Keypad text** | Avoid. "Beis Medrash" is ~20 T9 presses. | Minyanim's primary filter is a free-text `TextInput` |
| **Refresh** | Needs a keyed equivalent — soft-key `REFRESH`, or refresh on focus. | `RefreshControl` on Zmanim/Calendar/Minyanim, gesture-only |
| **Hardware back** | Dismiss sheet, then leave screen. | ✅ already correct — `onRequestClose` wired on both TOC modals |

---

## The focus primitive

Build **one** primitive and use it everywhere. Do not add `focusable` ad hoc
to existing `Pressable`s — that reproduces F14 in a new dimension.

```jsx
// src/components/common/Focusable.tsx
<Focusable
  onPress={fn}
  variant="ring" | "row"     // ring = outline; row = fill (lists)
  autoFocus                  // exactly one per screen
  selected={bool}            // gold left edge, independent of focus
/>
```

Requirements:

- `focusable`, `hasTVPreferredFocus` for the initial element, and an
  `onFocus`/`onBlur` pair driving the visual state.
- `variant="ring"`: 2 dp `#b8860b` outline, 2 dp offset, `radius.md`.
- `variant="row"`: fill `primary`, text → `surface`, no outline. Used for
  34 dp list rows where an outline inside a 10 dp gutter looks cramped.
- `selected` renders a 3 dp gold left edge and is **orthogonal** to focus, so
  a d-pad user can tell "the row I'm on" from "the value that's set". Today
  selection is carried by fill colour alone, which the focus fill would
  collide with.
- Never below the 34 dp row height / 48 dp action height in
  `02-design-tokens.md`.

## Focus order

Reading order, top to bottom, left to right — with two rules:

1. **One `autoFocus` per screen**, and it is the screen's primary action:
   Home → *Start*; error state → *Retry*; index → the current section;
   Settings → the first row. On Home this is what makes "flip open, press OK,
   you're in the text" true, and it is the two-second path.
2. Focus never enters the soft-key row. Those are physical keys, not
   focusable widgets; the on-screen labels are legends.

## Screen-level key handling

Register handlers at the screen root, not per-element:

```js
// pseudocode — screen root
useKeyHandler({
  left:  () => prevSection() ?? prevTab(),
  right: () => nextSection() ?? nextTab(),
  softLeft:  screen.verbs.left,
  softRight: screen.verbs.right,
  digit: (n) => jumpToIndexed(n),
  digitLongPress: (n) => setBookmark(n),
});
```

Every screen declares its two soft-key verbs as data, so the 22 dp legend row
renders itself and cannot drift out of sync with the bindings.

## Snapped scrolling in the reader

▲▼ move by one line height (`reader × 1.7`), not by a fling velocity. A line
of liturgy must never be cut in half by the running head or the soft-key row.
Use `scrollTo` with a computed offset; keep `scrollEventThrottle` low enough
that the running head's `group` and the `n/62` counter stay accurate.

Do **not** use `scrollIntoView`-style helpers; compute offsets from measured
section positions (the reader already measures sections for its TOC).

## Position dots

The soft-key row centre carries four dots showing which of the four sections
(Siddur · Calendar · Zmanim · Minyanim) you are in — the replacement for the
5-tab bar's labels. In the reader, the centre instead names the next section,
because ◀▶ means "section" there rather than "tab".

## Verification

- Unplug touch mentally: can you reach every action with d-pad + OK + soft
  keys + back?
- Cold open → OK → in the text, zero d-pad presses.
- Tab through every screen: is the focused element always visible on screen
  and always distinguishable from a selected one?
