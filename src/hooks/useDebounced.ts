import { useEffect, useState } from "react";

/**
 * Delay a rapidly-changing value.
 *
 * The minyanim search fed every keystroke straight into a react-query key,
 * producing a new source.search() per character.
 */
export function useDebounced<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
