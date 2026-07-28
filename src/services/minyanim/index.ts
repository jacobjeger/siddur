import { fixtureSource } from "./fixtureSource";
import { godavenSource } from "./godavenSource";
import type { MinyanSource } from "./types";

export * from "./types";
export { fixtureSource } from "./fixtureSource";
export { godavenSource } from "./godavenSource";

/**
 * The active minyan source.
 *
 * Falls back to local fixture data until the GoDaven API URL is configured.
 * Flipping this over is the only change needed once the API contract arrives.
 */
export function getMinyanSource(): MinyanSource {
  return process.env.EXPO_PUBLIC_GODAVEN_URL ? godavenSource : fixtureSource;
}
