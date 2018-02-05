import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  user: User;
  // newUser: User;

  constructor() {
  }

  setUser(passedUser: User) {
    this.user = passedUser;
    localStorage.setItem('user', JSON.stringify(passedUser)); //needed for production?
    console.log('USERSERVICE', this.user)
  }

  getUser() {
    return this.user != undefined ? this.user : JSON.parse(localStorage.getItem('user'))
  }

  setNewUser(passedNewUser: User) {
    this.user = passedNewUser;
    console.log('USERSERVICE', passedNewUser)
    console.log('USERSERVICE', this.user)
  }

  getNewUser() {
    return {
      volunteerKey: '',
      username: '',
      password: '',
      userRoles: ['user'],
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
      otherPartyAffiliation: '',
      exposePartyAffiliation: true,
      auditKey: '',
      shifts: []
    }
  }

}
