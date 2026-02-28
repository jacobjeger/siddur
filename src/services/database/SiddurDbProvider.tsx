import React, { createContext, useContext, useEffect, useState } from "react";
import { initSiddurDb } from "./siddurDb";

interface SiddurDbState {
  isReady: boolean;
  error: string | null;
}

const SiddurDbContext = createContext<SiddurDbState>({
  isReady: false,
  error: null,
});

/**
 * Provider component that initializes the siddur SQLite database.
 * Wrap your app root with this. Children won't render until the DB is ready.
 */
export function SiddurDbProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SiddurDbState>({
    isReady: false,
    error: null,
  });

  useEffect(() => {
    initSiddurDb()
      .then(() => setState({ isReady: true, error: null }))
      .catch((err) =>
        setState({ isReady: false, error: String(err?.message ?? err) })
      );
  }, []);

  return (
    <SiddurDbContext.Provider value={state}>
      {children}
    </SiddurDbContext.Provider>
  );
}

/**
 * Hook to check if the siddur database is ready.
 */
export function useSiddurDb(): SiddurDbState {
  return useContext(SiddurDbContext);
}
