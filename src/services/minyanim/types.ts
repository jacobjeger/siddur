import type { Nusach } from "../../stores/useSettingsStore";

export type TefilaSlot = "shacharis" | "mincha" | "maariv" | "selichos";

/** Which days a given minyan time applies to. */
export type DayScope = "weekday" | "shabbos" | "yom_tov" | "rosh_chodesh";

export interface MinyanTime {
  slot: TefilaSlot;
  dayScope: DayScope;
  /** Local wall-clock time at the shul, "HH:mm" in 24h form. */
  time: string;
  /** Optional free-text qualifier, e.g. "Sun only", "20 min before shkia". */
  note?: string;
}

export interface Minyan {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  nusach: Nusach;
  times: MinyanTime[];
  phone?: string;
  notes?: string;
  /** Upstream URL, e.g. the GoDaven listing. */
  url?: string;
}

export interface MinyanQuery {
  /** Free-text search over name and address. */
  search?: string;
  nusach?: Nusach | null;
  slot?: TefilaSlot | null;
  /** Origin for distance sorting. */
  near?: { latitude: number; longitude: number } | null;
  /** Maximum distance in kilometres. */
  radiusKm?: number;
}

/** A minyan with a computed distance from the query origin. */
export interface MinyanWithDistance extends Minyan {
  /** Kilometres from the query origin, or null when no origin was given. */
  distanceKm: number | null;
}

/**
 * The UI depends only on this interface. Swapping the fixture provider for the
 * GoDaven-backed one when the API lands should touch nothing else.
 */
export interface MinyanSource {
  readonly id: string;
  /** False when the source is a local placeholder rather than live data. */
  readonly isLive: boolean;
  search(query: MinyanQuery): Promise<MinyanWithDistance[]>;
  getById(id: string): Promise<Minyan | null>;
}
