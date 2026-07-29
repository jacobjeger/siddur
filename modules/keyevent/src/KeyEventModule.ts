import { requireOptionalNativeModule, type EventSubscription } from "expo-modules-core";
import type { KeyEvent } from "../../../src/hooks/useKeyHandler";

/**
 * Native hardware key events. Android only, and optional: on iOS or in any
 * build where the module is not linked this is `null` and the app degrades to
 * focus + OK + back, which is still operable.
 */
const KeyEventModule = requireOptionalNativeModule<{
  addListener: (
    event: "onKeyEvent",
    listener: (payload: KeyEvent) => void
  ) => EventSubscription;
}>("KeyEvent");

export default KeyEventModule;

/** Shape expected by `setKeyEventSource` in src/hooks/useKeyHandler.ts. */
export function subscribeToKeyEvents(
  emit: (event: KeyEvent) => void
): () => void {
  if (!KeyEventModule) return () => {};
  const subscription = KeyEventModule.addListener("onKeyEvent", emit);
  return () => subscription.remove();
}
