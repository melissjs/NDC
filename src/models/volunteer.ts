export interface Volunteer {
    volunteerKey: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    exposeEmail: boolean;
    phoneNumber: string;
    age: number;
    sex: string;
    partyAffiliation: string;
    shifts?: string[];
    associatedPollingStationKey?: string;
    } 
    
    