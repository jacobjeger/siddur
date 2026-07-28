import { useQuery } from "@tanstack/react-query";
import { getMinyanSource } from "../services/minyanim";
import { useLocationStore } from "../stores/useLocationStore";
import type { MinyanQuery } from "../services/minyanim/types";

export function useMinyanim(query: Omit<MinyanQuery, "near">) {
  const location = useLocationStore((s) => s.location);
  const source = getMinyanSource();

  const near = location
    ? { latitude: location.latitude, longitude: location.longitude }
    : null;

  const result = useQuery({
    queryKey: [
      "minyanim",
      source.id,
      query.search ?? "",
      query.nusach ?? "",
      query.slot ?? "",
      near?.latitude ?? null,
      near?.longitude ?? null,
    ],
    queryFn: () => source.search({ ...query, near }),
    staleTime: 5 * 60_000,
  });

  return { ...result, isLive: source.isLive };
}

export function useMinyan(id: string | undefined) {
  const source = getMinyanSource();

  return useQuery({
    queryKey: ["minyan", source.id, id],
    queryFn: () => (id ? source.getById(id) : null),
    enabled: Boolean(id),
  });
}
