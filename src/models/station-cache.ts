import { Pollingstation } from "./pollingstation";

export interface StationCache {
  electionId: {
    cachedDateTime: number;
    stations: Pollingstation[];
  }
} 


