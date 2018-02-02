export interface User {
  username: string;
  password: string;
  userRoles: string[];
  volunteerKey: string; //remove?
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
  exposePartyAffiliation: boolean;
  }