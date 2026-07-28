import { useState, useEffect, useMemo } from "react";
import { AppState } from "react-native";
import { getZmanimForDate } from "../services/zmanim/zmanimService";
import { useLocationStore } from "../stores/useLocationStore";
import { useSettingsStore } from "../stores/useSettingsStore";
import { getCurrentLocation } from "../services/location/locationService";
import { resolveInIsrael } from "../utils/geoRegion";
import type { ZmanimData } from "../services/zmanim/types";

interface UseZmanimResult {
  zmanim: ZmanimData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Several screens mount more than one consumer of this hook (the home screen
 * mounts useHebrewDate and useNextZman, each of which calls it). Without this
 * guard each instance fired its own permission request and GPS round-trip on
 * cold start.
 */
let inFlightLocation: Promise<void> | null = null;

/** Local-day key, so the effect re-runs when the civil date changes. */
function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function useZmanim(date?: Date): UseZmanimResult {
  const { location, loading, error, setLocation, setLoading, setError } =
    useLocationStore();
  const { candleLightingOffset, havdalaMethod, inIsrael } = useSettingsStore();
  const [zmanim, setZmanim] = useState<ZmanimData | null>(null);
  const [today, setToday] = useState(() => dayKey(new Date()));

  // Fetch location once, shared across all hook instances.
  useEffect(() => {
    if (location) return;

    if (inFlightLocation) return;

    setLoading(true);
    inFlightLocation = getCurrentLocation()
      .then((loc) => {
        useLocationStore.getState().setLocation(loc);
      })
      .catch((err: unknown) => {
        useLocationStore
          .getState()
          .setError(
            err instanceof Error ? err.message : "Failed to get location"
          );
      })
      .finally(() => {
        inFlightLocation = null;
      });
  }, [location, setLocation, setLoading, setError]);

  // Roll over when the civil date changes, so an app left open overnight does
  // not keep showing yesterday's zmanim.
  useEffect(() => {
    if (date) return; // caller pinned an explicit date

    const check = () => {
      const key = dayKey(new Date());
      setToday((prev) => (prev === key ? prev : key));
    };

    const interval = setInterval(check, 60_000);
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });

    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [date]);

  const effectiveInIsrael = useMemo(
    () => resolveInIsrael(inIsrael, location),
    [inIsrael, location]
  );

  useEffect(() => {
    if (!location) return;

    try {
      setZmanim(
        getZmanimForDate(location, date ?? new Date(), {
          candleLightingOffset,
          havdalaMethod,
          inIsrael: effectiveInIsrael,
        })
      );
      setError(null);
    } catch (err) {
      // Previously this was a console.warn and the hook reported error: null,
      // so any failure was indistinguishable from a permanent loading state.
      setZmanim(null);
      setError(
        err instanceof Error ? err.message : "Failed to calculate zmanim"
      );
    }
    // `today` is intentionally a dependency: it changes at midnight.
  }, [
    location,
    date,
    today,
    candleLightingOffset,
    havdalaMethod,
    effectiveInIsrael,
    setError,
  ]);

  return {
    zmanim,
    loading: loading && !location,
    error,
  };
}
