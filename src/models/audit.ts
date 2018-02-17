import { Volunteer } from './volunteer';
import { PollingLocation } from "./polling-location";

export interface Audit {
  election: string;
  pollingstation: PollingLocation;
  team?: Volunteer[];
  teamLength: number;
  shifts: number;
}