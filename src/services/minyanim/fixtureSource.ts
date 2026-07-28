import { haversineKm } from "../../utils/distance";
import { FIXTURE_MINYANIM } from "./fixtureData";
import type {
  Minyan,
  MinyanQuery,
  MinyanSource,
  MinyanWithDistance,
} from "./types";

/**
 * Applies a MinyanQuery to an in-memory list. Shared with any future source
 * that returns unfiltered results (e.g. a cached offline snapshot).
 */
export function applyQuery(
  minyanim: Minyan[],
  query: MinyanQuery
): MinyanWithDistance[] {
  const search = query.search?.trim().toLowerCase();

  return minyanim
    .filter((m) => {
      if (query.nusach && m.nusach !== query.nusach) return false;
      if (query.slot && !m.times.some((t) => t.slot === query.slot)) {
        return false;
      }
      if (search) {
        const haystack = `${m.name} ${m.address}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    })
    .map((m) => ({
      ...m,
      distanceKm: query.near ? haversineKm(query.near, m) : null,
    }))
    .filter(
      (m) =>
        query.radiusKm == null ||
        m.distanceKm == null ||
        m.distanceKm <= query.radiusKm
    )
    .sort((a, b) => {
      if (a.distanceKm != null && b.distanceKm != null) {
        return a.distanceKm - b.distanceKm;
      }
      return a.name.localeCompare(b.name);
    });
}

export const fixtureSource: MinyanSource = {
  id: "fixture",
  isLive: false,

  async search(query: MinyanQuery): Promise<MinyanWithDistance[]> {
    return applyQuery(FIXTURE_MINYANIM, query);
  },

  async getById(id: string): Promise<Minyan | null> {
    return FIXTURE_MINYANIM.find((m) => m.id === id) ?? null;
  },
};
