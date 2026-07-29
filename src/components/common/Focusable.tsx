import { forwardRef, useState, type ReactNode } from "react";
import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
  type PressableProps,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { radius, MIN_TOUCH_TARGET } from "../../theme/tokens";

/**
 * The one focusable primitive. Use it at every interaction site.
 *
 * The app ships on a d-pad clamshell and had **zero** focus states anywhere —
 * `focusable`, `hasTVPreferredFocus`, `onFocus` and `nextFocus` returned no
 * matches in any file. Without a cursor a d-pad user cannot see where they are,
 * so the app was operable by touch only.
 *
 * Do NOT add `focusable` ad hoc to existing Pressables. That is how the app
 * ended up with 99 hardcoded font sizes against 5 tokenised ones — a system
 * nobody is obliged to go through is not a system.
 *
 * Focus and selection are ORTHOGONAL and drawn differently. Focus is "the row I
 * am on"; selection is "the value that is set". `Chip` already carries
 * selection as a fill, so focus must not also be a fill or the two become
 * indistinguishable the moment a d-pad is in play.
 *
 * The ring is drawn by an OUTER wrapper, outside the caller's own box, so a
 * caller keeps full control of its border, radius and background. An earlier
 * version imposed its own border/radius on the pressable itself and fought
 * every component that styled its own container.
 */
export type FocusVariant = "ring" | "row";

export interface FocusableProps
  extends Omit<PressableProps, "style" | "children"> {
  /**
   * A render prop when the contents need to react to focus — a `row`-variant
   * row inverts its own Text colours, and only this component knows whether it
   * is focused.
   */
  children:
    | ReactNode
    | ((state: { focused: boolean; selected: boolean }) => ReactNode);
  /** `ring` outlines outside the box; `row` fills it (dense list rows). */
  variant?: FocusVariant;
  /**
   * Exactly one per screen, and it should be the screen's primary action.
   *
   * NOTE: verified on the F1 — `hasTVPreferredFocus` is a **no-op** on plain
   * Android RN (it is implemented for react-native-tvos). On mount nothing was
   * focused and the primary button took eight d-pad presses to reach. It is set
   * anyway because it costs nothing and is correct on TV builds, but "cold open
   * → OK → in the text" is met by `useKeyHandler`'s screen-level default
   * action, not by this prop.
   */
  autoFocus?: boolean;
  /** The value is currently set. Independent of focus. */
  selected?: boolean;
  /** Accepts Pressable's function form so `pressed`-aware callers still work. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  /** Opt out of the minimum height for genuinely dense rows. */
  dense?: boolean;
  /** Wrapper style, e.g. `flex: 1` that must apply outside the ring. */
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const Focusable = forwardRef<View, FocusableProps>(function Focusable(
  {
    children,
    variant = "ring",
    autoFocus = false,
    selected = false,
    style,
    dense = false,
    wrapperStyle,
    ...rest
  },
  ref
) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const showRing = focused && variant === "ring";
  const showFill = focused && variant === "row";

  return (
    <View
      style={[
        {
          // A transparent border at rest reserves the ring's space, so arriving
          // focus does not shift the layout by 2dp — which on a list reads as
          // the whole page twitching.
          borderWidth: 2,
          borderColor: showRing ? colors.accent : "transparent",
          borderRadius: radius.md + 2,
        },
        wrapperStyle,
      ]}
    >
      <Pressable
        ref={ref}
        // `focusable` is what puts the element into the d-pad traversal order.
        focusable
        hasTVPreferredFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityState={{ selected }}
        style={(state) => [
          !dense && { minHeight: MIN_TOUCH_TARGET, justifyContent: "center" },
          typeof style === "function" ? style(state) : style,
          showFill && { backgroundColor: colors.primary },
          // Selection is a left edge so it survives the row fill and can be read
          // at the same time as focus.
          selected && { borderLeftWidth: 3, borderLeftColor: colors.accent },
        ]}
        {...rest}
      >
        {typeof children === "function"
          ? children({ focused, selected })
          : children}
      </Pressable>
    </View>
  );
});
