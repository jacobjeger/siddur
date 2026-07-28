import { useEffect } from "react";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useSettingsStore } from "../stores/useSettingsStore";

const TAG = "siddur";

/**
 * Honors the keepScreenOn setting. expo-keep-awake was a dependency but
 * useKeepAwake was never called, so the toggle in Settings did nothing.
 */
export function useKeepScreenOn() {
  const keepScreenOn = useSettingsStore((s) => s.keepScreenOn);

  useEffect(() => {
    if (keepScreenOn) {
      activateKeepAwakeAsync(TAG).catch(() => {
        // Not supported on every platform (notably web); harmless.
      });
    } else {
      try {
        deactivateKeepAwake(TAG);
      } catch {
        // Already inactive.
      }
    }

    return () => {
      try {
        deactivateKeepAwake(TAG);
      } catch {
        // Already inactive.
      }
    };
  }, [keepScreenOn]);
}
