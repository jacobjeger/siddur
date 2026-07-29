import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { AppState } from "react-native";
import { getZmanimForDate } from "../services/zmanim/zmanimService";
import { useLocationStore } from "../stores/useLocationStore";
import { useSettingsStore } from "../stores/useSettingsStore";
import { getCurrentLocation } from "../services/location/locationService";
import { resolveInIsrael } from "../utils/geoRegion";
import { LUACH_PRESETS } from "../services/zmanim/luach";
import { useHydrated } from "./useHydrated";
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

/**
 * Key for the HALACHIC day, which turns over at nightfall rather than midnight.
 *
 * Keying the rollover on the civil date alone meant nothing recomputed between
 * tzeis and midnight, so an evening user kept seeing the previous Hebrew date
 * and the previous day's rules — on 14 Av the app still offered Tachanun at
 * Mincha well after Tu B'Av had begun.
 *
 * The tzeis must belong to the same civil day as `now`, or just after midnight
 * the previous evening's (now past) tzeis would mark the fresh day as already
 * nightfallen and roll the Hebrew date a day early until the next tick.
 */
function halachicDayKey(now: Date, tzeis: Date | null): string {
  const afterNightfall =
    tzeis && dayKey(tzeis) === dayKey(now) && now.getTime() >= tzeis.getTime();
  return `${dayKey(now)}${afterNightfall ? "|night" : ""}`;
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
  // Read by the rollover tick, which must not close over stale state.
  const tzeisRef = useRef<Date | null>(null);
  const hydrated = useHydrated();

  const manual = locationMode === "manual" ? manualLocation : null;
  // Changing location mode or the manual pin must re-resolve the location.
  const manualKey = manual ? `${manual.lat},${manual.lng},${manual.name}` : "";

  useEffect(() => {
    // Persisted settings decide whether we should be using a manual location at
    // all, so resolving before rehydration would prompt for GPS against default
    // settings and then have to redo it.
    if (!hydrated) return;

    const cached = useLocationStore.getState().location;

    // If the user picked a manual location, a cached GPS/fallback result is
    // stale (and vice versa).
    const matchesMode = manual
      ? cached?.source === "manual" &&
        cached.latitude === manual.lat &&
        cached.longitude === manual.lng
      : // A persisted "fallback" is NOT a usable cache: it means permission was
        // denied or GPS failed at the time. Retrying is cheap (the permission
        // check short-circuits) and without it, granting permission later left
        // the user pinned to the default location forever.
        cached?.source === "gps";

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
  }, [hydrated, location, manualKey, setLoading, setError]);

  // Roll over when the halachic date changes, so an app left open through the
  // evening does not keep showing the previous day's date and rules.
  useEffect(() => {
    if (date) return; // caller pinned an explicit date

    const check = () => {
      const key = halachicDayKey(new Date(), tzeisRef.current);
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
      const next = getZmanimForDate(location, date ?? new Date(), {
          // The user's choice always wins. Candle lighting is a community
          // minhag (18 vs 40 in Jerusalem), not a luach opinion, so gating it
          // on the luach made the Settings picker silently inert on six of the
          // seven presets — tapping "40 (Jer.)" changed nothing.
          candleLightingOffset,
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
        });
      tzeisRef.current = next.tzeis ?? null;
      setZmanim(next);
      setError(null);
    } catch (err) {
      // Previously this was a console.warn and the hook reported error: null,
      // so any failure was indistinguishable from a permanent loading state.
      tzeisRef.current = null;
      setZmanim(null);
      setError(
        err instanceof Error ? err.message : "Failed to calculate zmanim"
      );
    }
    // `today` is intentionally a dependency: it changes at nightfall as well
    // as at midnight, which is what makes the Hebrew date roll on time.
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
