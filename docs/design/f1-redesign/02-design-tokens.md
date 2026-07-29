# Design tokens for 240 × 320

Retune `src/theme/tokens.ts` to these values, then make **every screen consume
it**. No hardcoded font sizes, radii or paddings in screen files — that is
finding F14, and it is why the existing token file had no effect.

---

## Type — one ratio, six roles

UI type. Hebrew uses `NotoSerifHebrew`; Latin uses the platform sans.

| Role | Size | Weight | Use |
|---|---|---|---|
| `micro` | 9 | 700, `letterSpacing 0.14em`, uppercase | Soft-key labels, eyebrow rules |
| `caption` | 11 | 400 | English gloss, metadata, distances |
| `body` | 13 | 400 / 600 | List rows, values |
| `title` | 16 | 400 Hebrew | Tefila / section names in lists |
| `display` | 20 | 700 Hebrew | Screen identity (dates, screen titles) |
| `hero` | 30 | 700 Hebrew | The one thing on Home |

**Floor: 11 px.** Nothing smaller renders legibly at 143 ppi. The current
build has 10 px tab labels, 9.9 px rubrics at minimum text size, and a 12–13 px
muted licence block — all below the floor.

Latin uppercase eyebrows use `micro` with `letterSpacing`; that letterspacing
is what makes 9 px legible as a label rather than as text.

### Reader type — a separate, user-set ratio scale

The liturgy scale is independent of the UI scale and is the only thing
`textSize` controls.

```
reader: 15…26, default 18        (was 16…32, default 22)
```

Everything in the reader is a **ratio** of `reader`, never `± constant`
(finding F8):

| Element | Ratio | At default 18 |
|---|---|---|
| liturgy | `× 1.0` | 18 |
| line height | `× 1.7` | 31 |
| section title | `× 1.15` | 21 |
| rubric Hebrew | `× 0.8` | 14 |
| rubric English gloss | `× 0.56`, floor 11 | 11 |
| paragraph gap | `× 0.45` | 8 |

At 18/31 the reader shows **7 lines** per screen instead of 2½. Verify both
ends of the range: at 15 nothing falls under 11 px; at 26 nothing bursts its
row. UI chrome (soft keys, running head) does **not** scale with `reader` —
that is the bug in the current σיום button.

---

## Space

```
space: 2 · 4 · 8 · 12 · 20        (was 4 · 8 · 12 · 16 · 24 · 32)
gutter: 10                        (was 16)
```

240 dp cannot afford 32 dp of horizontal margin. 10 dp gutters give 220 dp of
content width.

## Radius

```
radius: { sm: 4, md: 6 }          (was sm 8, md 12, plus hardcoded 8 and 12)
```

Only two things still need a radius: the primary button and the focus ring.
**No cards.** Full-bleed bands separated by an 8 dp gap and a value change.
Drop 1 dp hairline borders on tint entirely (finding F10) — at 143 ppi
`#d4c5a9` on `#fff9f0` is a smudge. Structure comes from value and space.

## Row heights & targets

| Element | Height | Note |
|---|---|---|
| Primary action | **48** | The one thing a user aims at with a thumb |
| Soft-key row | **22** | Fixed, bottom, replaces the 44 dp tab bar |
| Identity strip | **30** | Fixed, top, replaces the 166 dp header stack |
| Reader running head | **34** | Includes a 2 dp progress rule |
| List row (d-pad) | **34** | Settings, index, browse |
| Dense list row | **22** | Zmanim, calendar facts |
| Minyan row | **38** | Two lines: time + name/meta |
| Section eyebrow | **~14** | `micro` + hairline, `padding 6/2` |

The 44 dp minimum assumes touch-only. Here 34 dp rows are the d-pad's
business; only the hero button and the soft keys must reach 48. Delete
`hitSlopFor()` or start using it.

---

## Colour

Two colours, two jobs, no exceptions.

### Light

| Token | Value | Job |
|---|---|---|
| `primary` | `#1b3a4b` | Structure, focus ring, **the single CTA fill** |
| `primaryDeep` | `#16323f` | Header / soft-key bars |
| `accent` | `#b8860b` | **`now` only** — next zman, today's deltas, your place |
| `accentBright` | `#c9a227` | Gold edge rules, "choose one" brackets |
| `accentSoft` | `#fdf4e0` | Fill behind the single "now" row |
| `bg` | `#faf6ef` | Page |
| `surface` | `#fff9f0` | Raised band (sparingly — no cards) |
| `text` | `#2c1810` | Body |
| `textMuted` | **`#6f5b45`** | was `#8b7355` (4.0:1 → 5.4:1) — finding F11 |
| `line` | `#d4c5a9` | Hairlines under eyebrows only, never as a card border |
| `warnBg` | `#e8d5b7` | Fallback-location / sample-data notices |

### Dark

| Token | Value | Note |
|---|---|---|
| `primary` | **`#7fa8bd`** | was `#c4a265` — collided with the accent |
| `accent` | `#d4a843` | unchanged |

Current dark `primary #c4a265` and `accent #d4a843` are ~12° apart at the same
lightness, so the two-colour system collapses into one. `#7fa8bd` restores the
navy/gold opposition in dark mode.

### The rule to enforce in review

> If it is gold, it is telling you about **now**. If it is navy, it is
> structure or something you can act on.

Consequence to accept: *Start Davening* becomes navy. Today it is the only
gold button in the app, while σיום — ending the same flow — is navy.

### Contrast floors

- Body and values: ≥ 7:1
- Muted / captions: ≥ 4.5:1 (this is what forces `#6f5b45`)
- Never carry meaning by fill colour alone — with a focus ring in play, fill
  must distinguish *selected* from *focused* (see `03-input-model.md`).

---

## Focus ring

One definition, used by every focusable element:

```
focusRing: { color: '#b8860b', width: 2, offset: 2, radius: radius.md }
```

On dark bands (soft keys, header) the ring stays gold. For **full-row** focus
in lists, fill the row `primary` and set its text to `surface` instead of
drawing a ring — see the index and Settings screens in `04-screens.md`.

Selected-but-not-focused must remain distinguishable: use a gold left edge
(3 dp) for selection and the navy fill for focus. Never the same signal twice.
