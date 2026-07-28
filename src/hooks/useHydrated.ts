import { useEffect, useState } from "react";
import { useSettingsStore } from "../stores/useSettingsStore";
import { useLocationStore } from "../stores/useLocationStore";

/**
 * Whether both persisted stores have finished rehydrating from AsyncStorage.
 *
 * Rehydration is asynchronous and always completes AFTER React's first effect
 * flush, so anything reading persisted state on mount sees defaults. That made
 * the location cache useless (a GPS round-trip and permission prompt on every
 * launch, which persisting was supposed to avoid) and, worse, made a
 * manual-location user get a permission prompt they had explicitly opted out
 * of, with zmanim briefly computed for the wrong city.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    () =>
      useSettingsStore.persist.hasHydrated() &&
      useLocationStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (hydrated) return;

    const check = () => {
      if (
        useSettingsStore.persist.hasHydrated() &&
        useLocationStore.persist.hasHydrated()
      ) {
        setHydrated(true);
      }
    };

    const unsubSettings = useSettingsStore.persist.onFinishHydration(check);
    const unsubLocation = useLocationStore.persist.onFinishHydration(check);
    check();

    return () => {
      unsubSettings();
      unsubLocation();
    };
  }, [hydrated]);

  return hydrated;
}
