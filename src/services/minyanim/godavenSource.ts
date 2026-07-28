import axios from "axios";
import { applyQuery } from "./fixtureSource";
import type {
  Minyan,
  MinyanQuery,
  MinyanSource,
  MinyanWithDistance,
} from "./types";

/**
 * GoDaven-backed source.
 *
 * NOT YET ACTIVE — the API contract has been requested but not received, so the
 * request/response shapes below are a placeholder. When the spec arrives, only
 * `toMinyan` and the two request builders should need to change; the UI talks
 * to MinyanSource and is unaffected.
 *
 * Enable by pointing GODAVEN_BASE_URL at the real host and switching the
 * provider in ./index.ts.
 */
const GODAVEN_BASE_URL = process.env.EXPO_PUBLIC_GODAVEN_URL ?? "";

const client = axios.create({
  baseURL: GODAVEN_BASE_URL,
  timeout: 10_000,
});

/** Shape is provisional until the real API contract lands. */
interface GodavenMinyanDto {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  nusach?: string;
  times?: { type: string; day?: string; time: string; note?: string }[];
  phone?: string;
  url?: string;
}

function toNusach(value: string | undefined): Minyan["nusach"] {
  switch ((value ?? "").toLowerCase()) {
    case "sefard":
      return "sefard";
    case "edot_hamizrach":
    case "sephardic":
      return "edot_hamizrach";
    case "ari":
    case "chabad":
      return "ari";
    default:
      return "ashkenaz";
  }
}

function toMinyan(dto: GodavenMinyanDto): Minyan {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address ?? "",
    latitude: dto.lat,
    longitude: dto.lng,
    nusach: toNusach(dto.nusach),
    times: (dto.times ?? []).map((t) => ({
      slot: (t.type as Minyan["times"][number]["slot"]) ?? "shacharis",
      dayScope: (t.day as Minyan["times"][number]["dayScope"]) ?? "weekday",
      time: t.time,
      note: t.note,
    })),
    phone: dto.phone,
    url: dto.url,
  };
}

export const godavenSource: MinyanSource = {
  id: "godaven",
  isLive: true,

  async search(query: MinyanQuery): Promise<MinyanWithDistance[]> {
    if (!GODAVEN_BASE_URL) {
      throw new Error("GoDaven API URL is not configured");
    }

    const { data } = await client.get<GodavenMinyanDto[]>("/minyanim", {
      params: {
        lat: query.near?.latitude,
        lng: query.near?.longitude,
        radius: query.radiusKm,
        q: query.search,
      },
    });

    // Re-apply the query locally so filtering and distance sorting behave
    // identically regardless of what the server supports.
    return applyQuery(data.map(toMinyan), query);
  },

  async getById(id: string): Promise<Minyan | null> {
    if (!GODAVEN_BASE_URL) {
      throw new Error("GoDaven API URL is not configured");
    }
    const { data } = await client.get<GodavenMinyanDto>(`/minyanim/${id}`);
    return data ? toMinyan(data) : null;
  },
};
