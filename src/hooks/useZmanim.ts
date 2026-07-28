import { useState, useEffect, useMemo, useCallback } from "react";
import { AppState } from "react-native";
import { getZmanimForDate } from "../services/zmanim/zmanimService";
import { useLocationStore } from "../stores/useLocationStore";
import { useSettingsStore } from "../stores/useSettingsStore";
import { getCurrentLocation } from "../services/location/locationService";
import { resolveInIsrael } from "../utils/geoRegion";
import { LUACH_PRESETS } from "../services/zmanim/luach";
import type { ZmanimData } from "../services/zmanim/types";

interface UseZmanimResult {
  zmanim: ZmanimData | null;
  loading: boolean;
  error: string | null;
  /** Re-resolve the location and recompute. Drives pull-to-refresh. */
  refresh: () => void;
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
  const { location, loading, error, setLoading, setError } = useLocationStore();
  const {
    candleLightingOffset,
    havdalaMethod,
    inIsrael,
    locationMode,
    manualLocation,
    alosMethod,
    tzeisMethod,
    useElevation,
    luachId,
  } = useSettingsStore();
  const [zmanim, setZmanim] = useState<ZmanimData | null>(null);
  const [today, setToday] = useState(() => dayKey(new Date()));

  const manual = locationMode === "manual" ? manualLocation : null;
  // Changing location mode or the manual pin must re-resolve the location.
  const manualKey = manual ? `${manual.lat},${manual.lng},${manual.name}` : "";

  useEffect(() => {
    const cached = useLocationStore.getState().location;

    // If the user picked a manual location, a cached GPS/fallback result is
    // stale (and vice versa).
    const matchesMode = manual
      ? cached?.source === "manual" &&
        cached.latitude === manual.lat &&
        cached.longitude === manual.lng
      : cached?.source !== "manual";

    if (cached && matchesMode) return;
    if (inFlightLocation) return;

    setLoading(true);
    inFlightLocation = getCurrentLocation(manual)
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
    // `manual` is captured via manualKey to keep the dep list stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, manualKey, setLoading, setError]);

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

  const luach = LUACH_PRESETS[luachId] ?? LUACH_PRESETS.standard;

  useEffect(() => {
    if (!location) return;

    try {
      setZmanim(
        getZmanimForDate(location, date ?? new Date(), {
          // A named luach owns these; "custom" defers to the individual
          // pickers so the previous behaviour is still reachable.
          candleLightingOffset:
            luach.id === "custom" ? candleLightingOffset : luach.candleLightingOffset,
          havdalaMethod,
          inIsrael: effectiveInIsrael,
          alosMethod: luach.alos ?? alosMethod,
          tzeisMethod: luach.tzeis ?? tzeisMethod,
          // ROY uses elevation in Eretz Yisrael and mishor (sea level)
          // outside it, so the region decides rather than the preset.
          useElevation:
            luach.id === "custom"
              ? useElevation
              : luach.id === "roy"
                ? effectiveInIsrael
                : luach.useElevation,
          luach,
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
    alosMethod,
    tzeisMethod,
    useElevation,
    luach,
    setError,
  ]);

  const refresh = useCallback(() => {
    inFlightLocation = null;
    useLocationStore.getState().clearLocation();
  }, []);

  return {
    zmanim,
    loading: loading && !location,
    error,
    refresh,
  };
}
