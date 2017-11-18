export interface VoteRecord {
    voteRecordKey: string;
    volunteerKey: string;
    generalSuccess: boolean;
    generalCouldNotVoteReason?: string;
    generalCastBy?: string;
    primarySuccess?: boolean;
    primaryCouldNotVoteReason?: string;
    primaryCastBy?: string;
    primaryVotePollingLocation?: string;
    // add yourOfficialPollingLocation
    // depreciate these
    presFirst?: string;
    presSecond?: string;
    presThird?: string;
    }  