import { Volunteer } from './volunteer';
import { PollingLocation } from "./polling-location";

export interface Audit {
  election: string;
  pollingstation: PollingLocation;
  shifts: number[];
  team: Volunteer[]
}