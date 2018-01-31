export interface User {
  username: string;
  password: string;
  userRoles: string[];
  volunteerKey: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  exposeEmail: boolean;
  exposePhoneNumber: boolean;
  age: number;
  sex: string;
  partyAffiliation: string;
  }