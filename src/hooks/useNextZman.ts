import { useState, useEffect, useRef } from "react";
import { useZmanim } from "./useZmanim";
import { ZMAN_ORDER, type ZmanKey } from "../services/zmanim/types";

interface NextZmanInfo {
  key: ZmanKey;
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
  const nextRef = useRef<NextZmanInfo | null>(null);

  useEffect(() => {
    if (!zmanim) {
      setNextZman(null);
      setCountdown(0);
      nextRef.current = null;
      return;
    }

    function findNext() {
      const now = Date.now();
      const upcoming = ZMAN_ORDER.map(({ key }) => ({
        key,
        time: zmanim![key],
      }))
        .filter(
          (entry): entry is NextZmanInfo =>
            entry.time != null && entry.time.getTime() > now
        )
        .sort((a, b) => a.time.getTime() - b.time.getTime());

      const next = upcoming[0] ?? null;
      nextRef.current = next;
      setNextZman(next);
      setCountdown(next ? next.time.getTime() - now : 0);
      return next;
    }

    findNext();

    // Re-evaluate on a 1s cadence only when the next zman is close; otherwise
    // 1/minute is plenty. Previously the interval was chosen from `countdown`
    // state, which is 0 on the first run, so it always ran at 1s.
    let timer: ReturnType<typeof setTimeout>;

    function schedule() {
      const remaining = nextRef.current
        ? nextRef.current.time.getTime() - Date.now()
        : 0;
      const delay = remaining > 60_000 ? 60_000 : 1_000;

      timer = setTimeout(() => {
        const current = nextRef.current;
        if (!current || current.time.getTime() - Date.now() <= 0) {
          findNext();
        } else {
          setCountdown(current.time.getTime() - Date.now());
        }
        schedule();
      }, delay);
    }

    schedule();

    return () => clearTimeout(timer);
  }, [zmanim]);

  return { nextZman, countdown };
}
