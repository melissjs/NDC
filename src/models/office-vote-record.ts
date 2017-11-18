import {Candidate} from './candidate';

export interface OfficeVoteRecord {
voteRecordKey: string;
electOfficeKey: string;
success: boolean;
// rm candidate, use candidateValue
candidate: string;
levelOfSupport?: string;
// new move
firstChoice?: string;
secondChoice?: string;
thirdChoice?: string;
}