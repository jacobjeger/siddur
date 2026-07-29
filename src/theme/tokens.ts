/**
 * Design tokens.
 *
 * Before this, the app used 7 distinct borderRadius values, 10 font sizes and
 * 5 list-row paddings, with three near-identical Card components and three
 * near-identical Chip components defined in different screens. These are the
 * canonical values; prefer them over ad-hoc numbers.
 */

/**
 * The target device, measured — not assumed.
 *
 * The MegaLife F1's inner display reports 480 × 640 at density 204, i.e.
 * **376 × 502 dp**. The B2 reports an identical panel, so one layout serves
 * both. The design handoff in docs/design/f1-redesign assumed 240 × 320 dp and
 * is therefore out by ×1.57 on every constant; its ratios and ranking hold, its
 * absolute values do not.
 *
 * A subtlety that argues against compressing anything: `dumpsys display` gives
 * the panel's true density as ~283 ppi while Android buckets it at 204, so text
 * renders roughly **1.39× physically smaller** than its dp value suggests. Type
 * here should read generous on a desktop simulator to be legible on the device.
 *
 * If a future device differs, change these two numbers and nothing else.
 */
export const VIEWPORT = {
  width: 376,
  height: 502,
  /** Usable height after the ~24 dp system status bar. */
  usableHeight: 478,
} as const;

export const radius = {
  /** Chips, inputs, small buttons. */
  sm: 6,
  /** Cards, list items, primary buttons. */
  md: 10,
  /** Pill-shaped filter chips. */
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  xxl: 30,
} as const;

/** Horizontal page margin. 376dp cannot afford the old 16 on both sides plus card padding. */
export const gutter = 16;

/**
 * Six roles, one scale.
 *
 * The old scale had four distinct values (13/15/17/20) with `eyebrow` and
 * `caption` both 13, and 95% of the app's type bypassed it anyway: 99 hardcoded
 * `fontSize` literals against 5 that came from here, using 13 distinct sizes of
 * which 14, 16, 18, 19, 22 and 26 had no token at all. `title` and `heading`
 * had ZERO usages while their values were hardcoded 14 and 3 times.
 *
 * Sized for the measured 376 x 502 viewport (see VIEWPORT). Not scaled
 * mechanically from the handoff's 240dp figures: those x1.57 would give
 * 14/17/20/25/31/47, which is larger than the app's current 13-17 that reads
 * acceptably on the device. These sit between the two and want checking at both
 * ends on hardware.
 *
 * Floor is `micro` at 11. Below that nothing is legible on this panel, whose
 * true density is ~283ppi against Android's 204 bucket.
 */
export const typeScale = {
  /** Uppercase eyebrows and soft-key legends. Needs letterSpacing to read. */
  micro: 11,
  /** English gloss, metadata, distances. */
  caption: 13,
  /** List rows and values. */
  body: 15,
  /** Tefila and section names in lists. */
  title: 18,
  /** Screen identity — dates, screen titles. */
  display: 24,
  /** The one thing on Home. */
  hero: 34,

  /** @deprecated Use `micro`. Kept so existing call sites still compile. */
  eyebrow: 11,
  /** @deprecated Use `display`. */
  heading: 24,
} as const;

/**
 * Minimum touch target. Several controls were 18–33pt, which is below every
 * platform guideline; anything interactive should reach this.
 */
export const MIN_TOUCH_TARGET = 44;

/** Standard hitSlop to bring a small icon button up to MIN_TOUCH_TARGET. */
export function hitSlopFor(size: number) {
  const pad = Math.max(0, Math.round((MIN_TOUCH_TARGET - size) / 2));
  return { top: pad, bottom: pad, left: pad, right: pad };
}
