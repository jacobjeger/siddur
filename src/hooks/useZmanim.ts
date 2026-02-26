import { useState, useEffect } from "react";
import { getZmanimForDate } from "../services/zmanim/zmanimService";
import { useLocationStore } from "../stores/useLocationStore";
import { getCurrentLocation } from "../services/location/locationService";
import type { ZmanimData } from "../services/zmanim/types";

interface UseZmanimResult {
  zmanim: ZmanimData | null;
  loading: boolean;
  error: string | null;
}

export function useZmanim(date?: Date): UseZmanimResult {
  const { location, setLocation, setLoading, setError } = useLocationStore();
  const [zmanim, setZmanim] = useState<ZmanimData | null>(null);

  // Fetch location on first use
  useEffect(() => {
    if (location) return;

    let mounted = true;
    setLoading(true);

    getCurrentLocation().then((loc) => {
      if (mounted) {
        setLocation(loc);
      }
    }).catch((err) => {
      if (mounted) {
        setError(err instanceof Error ? err.message : "Failed to get location");
      }
    });

    return () => { mounted = false; };
  }, [location, setLocation, setLoading, setError]);

  // Calculate zmanim when location is available
  useEffect(() => {
    if (!location) return;

    try {
      const zmanimData = getZmanimForDate(location, date ?? new Date());
      setZmanim(zmanimData);
    } catch (err) {
      console.warn("Zmanim calculation error:", err);
    }
  }, [location, date]);

  return {
    zmanim,
    loading: !location,
    error: null,
  };
}
