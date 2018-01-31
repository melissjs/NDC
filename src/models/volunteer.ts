export interface Volunteer {
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