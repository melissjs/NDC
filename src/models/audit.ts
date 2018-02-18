import { Auditor } from './auditor';

export interface Audit {
  _id?: string;
  electionId: string;
  pollingstationId: string;
  team?: Auditor[];
  teamLength: number;
  shifts: number;
}