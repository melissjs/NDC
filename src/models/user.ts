export interface User {
  volunteerKey?: string;
  username: string;
  password: string;
  userRoles: string[];
  firstName: string;
  lastName: string;
  emailAddress: string;
  exposeEmail: boolean;
  phoneNumber: string;
  exposePhoneNumber: boolean;
  age: number;
  exposeAge: boolean;
  sex: string;
  exposeSex: boolean;
  partyAffiliation: string;
  otherPartyAffiliation?: string;
  exposePartyAffiliation: boolean;
  // auditKey?: string;
  // shifts?: number[]
  }