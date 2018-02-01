export interface Auditor {
  volunteerKey: string;
  firstName: string;
  lastName: string;
  userRoles: string[];
  emailAddress?: string;
  phoneNumber?: string;
  age?: number;
  sex?: string;
  shifts?: string[];
}
