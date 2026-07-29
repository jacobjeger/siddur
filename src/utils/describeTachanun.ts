import type { Tachanun } from "./dayDavening";

/**
 * One line describing whether Tachanun is said.
 *
 * Tachanun is per-tefillah, not per-day: on erev Rosh Chodesh or erev Tu B'Av
 * it is said at Shacharis and omitted at Mincha. Rendering it as a bare
 * "Yes"/"No" told the user the wrong thing on exactly those afternoons.
 */
export function describeTachanun(tachanun: Tachanun): string {
  if (tachanun.shacharis && tachanun.mincha) return "Said";
  if (!tachanun.shacharis && !tachanun.mincha) {
    return tachanun.reason ? `Not said — ${tachanun.reason}` : "Not said";
  }
  // The mixed case is the whole point of the type, so name both tefillos
  // explicitly rather than leaving the user to infer which one is which.
  const said = tachanun.shacharis ? "Shacharis" : "Mincha";
  const omitted = tachanun.shacharis ? "Mincha" : "Shacharis";
  const why = tachanun.reason?.replace(/^Mincha only — /, "");
  return `${said} only — omitted at ${omitted}${why ? ` (${why})` : ""}`;
}
