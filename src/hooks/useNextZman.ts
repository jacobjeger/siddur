import { useState, useEffect, useRef } from "react";
import { useZmanim } from "./useZmanim";
import { ZMAN_NAMES } from "../utils/constants";

interface NextZmanInfo {
  key: string;
  time: Date;
}

interface UseNextZmanResult {
  nextZman: NextZmanInfo | null;
  countdown: number; // milliseconds until next zman
}

export function useNextZman(): UseNextZmanResult {
  const { zmanim } = useZmanim();
  const [nextZman, setNextZman] = useState<NextZmanInfo | null>(null);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!zmanim) return;

    function findNext() {
      const now = Date.now();
      const entries = Object.entries(zmanim!).filter(
        ([_, value]) => value != null && (value as Date).getTime() > now
      ) as [string, Date][];

      entries.sort((a, b) => a[1].getTime() - b[1].getTime());

      if (entries.length > 0) {
        const [key, time] = entries[0];
        setNextZman({ key, time });
        setCountdown(time.getTime() - now);
      } else {
        setNextZman(null);
        setCountdown(0);
      }
    }

    findNext();

    // Update countdown: every second if < 60s, every minute otherwise
    function tick() {
      if (!nextZman) return;
      const remaining = nextZman.time.getTime() - Date.now();
      if (remaining <= 0) {
        findNext();
      } else {
        setCountdown(remaining);
      }
    }

    // Start with minute interval, switch to second when close
    if (intervalRef.current) clearInterval(intervalRef.current);

    const interval = countdown > 60000 ? 60000 : 1000;
    intervalRef.current = setInterval(tick, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [zmanim, nextZman?.key]);

  return { nextZman, countdown };
}
