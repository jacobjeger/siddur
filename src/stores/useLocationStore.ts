import { create } from "zustand";
import type { UserLocation } from "../services/location/types";

interface LocationState {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  setLocation: (location: UserLocation) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  loading: true,
  error: null,
  setLocation: (location) => set({ location, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));
