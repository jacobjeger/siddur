import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Where you were up to.
 *
 * The audit calls this the single highest-value addition: it is what makes a
 * phone siddur behave like a physical one with a ribbon in it. Nothing was
 * persisted before — `sectionYPositions` was a `useRef`, discarded on unmount,
 * so closing the app lost your place entirely.
 */
export interface ReadingPosition {
  /** Scroll offset in dp. */
  offset: number;
  /** The section at the top of the viewport, for the Resume label. */
  sectionId: string;
  sectionTitle: string;
  sectionTitleHe: string;
  /** Epoch ms, so a stale position can be aged out. */
  savedAt: number;
}

export interface Bookmark {
  tefilaKey: string;
  sectionId: string;
  sectionTitleHe: string;
}

interface ReadingState {
  /** Keyed by tefila id, or by the comma-joined id list for a daven flow. */
  positions: Record<string, ReadingPosition>;
  /**
   * Keypad bookmarks, keyed by digit 1-9.
   *
   * Defined here even though nothing writes it until the numbered index lands,
   * so that feature does not force a second migration of an already-persisted
   * store.
   */
  bookmarks: Record<string, Bookmark>;

  savePosition: (key: string, position: ReadingPosition) => void;
  clearPosition: (key: string) => void;
  setBookmark: (digit: number, bookmark: Bookmark) => void;
}

/** Positions older than this are not offered as Resume. */
export const RESUME_MAX_AGE_MS = 18 * 60 * 60 * 1000;

export const useReadingStore = create<ReadingState>()(
  persist(
    (set) => ({
      positions: {},
      bookmarks: {},

      savePosition: (key, position) =>
        set((state) => ({ positions: { ...state.positions, [key]: position } })),

      clearPosition: (key) =>
        set((state) => {
          const next = { ...state.positions };
          delete next[key];
          return { positions: next };
        }),

      setBookmark: (digit, bookmark) =>
        set((state) => ({
          bookmarks: { ...state.bookmarks, [String(digit)]: bookmark },
        })),
    }),
    {
      name: "siddur-reading",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/**
 * The most recent position worth resuming, or null.
 *
 * Aged out after RESUME_MAX_AGE_MS: offering to resume yesterday's Shacharis
 * halfway through is worse than offering nothing, because the insertions it was
 * assembled with are no longer the ones for today.
 */
export function getResumable(
  positions: Record<string, ReadingPosition>,
  now = Date.now()
): { key: string; position: ReadingPosition } | null {
  let best: { key: string; position: ReadingPosition } | null = null;
  for (const [key, position] of Object.entries(positions)) {
    if (now - position.savedAt > RESUME_MAX_AGE_MS) continue;
    // Right at the top is not a position worth resuming.
    if (position.offset < 80) continue;
    if (!best || position.savedAt > best.position.savedAt) {
      best = { key, position };
    }
  }
  return best;
}
