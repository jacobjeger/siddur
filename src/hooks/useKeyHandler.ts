import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";

/**
 * Screen-root key handling for the F1's d-pad, soft keys and numeric keypad.
 *
 * ## What Android gives us for free, and what it does not
 *
 * Verified on the device, not assumed:
 *
 * - **▲▼◀▶ focus traversal** — native, once elements are `focusable`. The
 *   `Focusable` primitive is what turns this on; nothing here is needed for it.
 * - **OK on a focused element** — native; Android dispatches the click.
 * - **Hardware back** — `BackHandler`, wired below.
 *
 * Everything else in the handoff's input model needs the *raw* key event, and
 * React Native 0.83 core exposes no API for it: `TVEventHandler` ships only in
 * react-native-tvos, and `android/` here is prebuild-generated and gitignored,
 * so a hand-written Activity override would be erased on the next prebuild.
 *
 * Needing a native key-event module, and therefore not yet live:
 *
 * - OK while **nothing** is focused (the "flip open, press OK, you are in the
 *   text" path — `hasTVPreferredFocus` is a no-op outside tvOS).
 * - ◀▶ meaning *section* in the reader and *tab* elsewhere, rather than moving
 *   focus.
 * - Digits 1–9 as index jumps, and hold-to-bookmark.
 * - The two soft keys.
 *
 * Rather than pretend, this hook takes those bindings now and routes them
 * through a pluggable source. `setKeyEventSource` is the single seam a native
 * module plugs into; until one is installed those bindings are inert and the
 * screens that declare them degrade to focus + OK, which is usable.
 */
export interface ScreenVerbs {
  left?: { label: string; action: () => void };
  right?: { label: string; action: () => void };
}

export type KeyName =
  | "left"
  | "right"
  | "up"
  | "down"
  | "select"
  | "softLeft"
  | "softRight"
  | `digit${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

export interface KeyEvent {
  key: KeyName;
  longPress?: boolean;
}

type Listener = (event: KeyEvent) => void;

const listeners = new Set<Listener>();
let sourceDetach: (() => void) | null = null;

/**
 * Install a raw key-event source (a native module). Call once at app start.
 * Returns a detach function. With no source installed, every binding below
 * that depends on raw keys simply never fires.
 */
export function setKeyEventSource(
  subscribe: (emit: (event: KeyEvent) => void) => () => void
): () => void {
  sourceDetach?.();
  sourceDetach = subscribe((event) => {
    // Deliver newest-first: the topmost screen registered last and should win,
    // so a modal's binding takes precedence over the screen beneath it.
    const current = [...listeners].reverse();
    for (const listener of current) listener(event);
  });
  return () => {
    sourceDetach?.();
    sourceDetach = null;
  };
}

/** Whether a raw key source is installed — for rendering soft-key legends. */
export function hasKeyEventSource(): boolean {
  return sourceDetach !== null;
}

export interface KeyHandlerOptions {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  /** OK pressed while nothing on screen holds focus. */
  defaultAction?: () => void;
  onDigit?: (digit: number) => void;
  onDigitLongPress?: (digit: number) => void;
  /** Hardware back. Return true if handled. */
  onBack?: () => boolean;
  verbs?: ScreenVerbs;
  /** Skip registration while a modal is up, so bindings do not double-fire. */
  enabled?: boolean;
}

export function useKeyHandler(options: KeyHandlerOptions) {
  const { enabled = true } = options;

  // Registered once, but must always see the latest callbacks — the zmanim
  // countdown re-renders every second and would otherwise drive stale closures.
  const latest = useRef(options);
  latest.current = options;

  useEffect(() => {
    if (!enabled) return;

    const listener: Listener = ({ key, longPress }) => {
      const current = latest.current;
      if (key.startsWith("digit")) {
        const digit = Number(key.slice(5));
        if (longPress) current.onDigitLongPress?.(digit);
        else current.onDigit?.(digit);
        return;
      }
      switch (key) {
        case "left":
          current.onLeft?.();
          break;
        case "right":
          current.onRight?.();
          break;
        case "up":
          current.onUp?.();
          break;
        case "down":
          current.onDown?.();
          break;
        case "select":
          current.defaultAction?.();
          break;
        case "softLeft":
          current.verbs?.left?.action();
          break;
        case "softRight":
          current.verbs?.right?.action();
          break;
      }
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () =>
      latest.current.onBack ? latest.current.onBack() : false
    );
    return () => sub.remove();
  }, [enabled]);
}
