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
      // Returns a promise; rejects harmlessly if already inactive.
      void Promise.resolve(deactivateKeepAwake(TAG)).catch(() => {});
    }

    return () => {
      void Promise.resolve(deactivateKeepAwake(TAG)).catch(() => {});
    };
  }, [keepScreenOn]);
}
