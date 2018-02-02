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

}
