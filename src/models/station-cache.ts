import { Pollingstation } from "./pollingstation";

export interface StationCache {
  cachedDateTime: number;
  stations: Pollingstation[];
}