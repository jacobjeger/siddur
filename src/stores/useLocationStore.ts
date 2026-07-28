import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserLocation } from "../services/location/types";

interface LocationState {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  setLocation: (location: UserLocation) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: null,
      loading: true,
      error: null,
      setLocation: (location) => set({ location, loading: false, error: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),
      clearLocation: () => set({ location: null, loading: true, error: null }),
    }),
    {
      name: "siddur-location",
      storage: createJSONStorage(() => AsyncStorage),
      // Only the resolved location is worth persisting; loading/error are
      // per-session. Persisting it avoids a permission prompt + full GPS
      // round-trip on every cold start.
      partialize: (state) => ({ location: state.location }),
      onRehydrateStorage: () => (state) => {
        // A cached location means we are not in a loading state at startup.
        if (state?.location) state.loading = false;
      },
    }
  )
);
