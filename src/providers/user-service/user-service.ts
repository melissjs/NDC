import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  user: User;

  constructor() {
  }

  setUser(passedUser: User) {
    this.user = passedUser;
    console.log('USERSERVICE', this.user)
  }

  getUser() {
    return this.user;
  }

  setNewUser(passedNewUser: User) {
    this.user = passedNewUser;
    console.log('USERSERVICE', this.user)
  }

  getNewUser() {
    return {
      volunteerKey: '',
      username: '',
      password: '',
      userRoles: [],
      firstName: '',
      lastName: '',
      emailAddress: '',
      exposeEmail: true,
      phoneNumber: '',
      exposePhoneNumber: true,
      age: null,
      exposeAge: true,
      sex: '',
      exposeSex: true,
      partyAffiliation: '',
      exposePartyAffiliation: true,
      auditKey: '',
      shifts: []
    }
  }

}
