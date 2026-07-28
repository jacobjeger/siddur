declare module "tz-lookup" {
  /** Returns the IANA timezone name for a coordinate pair. */
  export default function tzlookup(lat: number, lon: number): string;
}
