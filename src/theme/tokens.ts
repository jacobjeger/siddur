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
  sm: 8,
  /** Cards, list items, primary buttons. */
  md: 12,
  /** Pill-shaped filter chips. */
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
} as const;

export const type = {
  /** Eyebrow / uppercase section label. */
  eyebrow: 13,
  /** Secondary and helper text. */
  caption: 13,
  /** Default body and list rows. */
  body: 15,
  /** Emphasised row, list item title. */
  title: 17,
  /** Card / screen heading. */
  heading: 20,
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
