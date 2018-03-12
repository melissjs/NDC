import { AuthServiceProvider } from './../auth-service/auth-service';
import { User } from './../../models/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
let baseURL = config.NDCS_BASE_URL;


@Injectable()
export class UserServiceProvider {

  user: User;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider) {
  }

  setUser(passedUser: User) {
    this.user = passedUser;
    localStorage.setItem('user', JSON.stringify(passedUser));
    console.log('USERSERVICE', this.user)
  }

  setUserFromToken(passedToken) {
    var decoded = jwt_decode(passedToken);
    // console.log('decoded user:', decoded.user)
    this.user.volunteerKey = decoded.user._id;
    this.user.userRoles = decoded.user.activeRoles; 
    this.user.firstName = decoded.user.firstName;
    this.user.lastName = decoded.user.lastName;
    this.user.emailAddress = decoded.user.emailAddress;
    this.user.exposeEmail = decoded.user.exposeEmail;
    this.user.phoneNumber = decoded.user.phoneNumber;
    this.user.exposePhoneNumber = decoded.user.exposePhoneNumber;
    this.user.age = decoded.user.age;
    this.user.exposeAge = decoded.user.exposeAge;
    this.user.sex = decoded.user.sex;
    this.user.exposeSex = decoded.user.emailAddress;
    this.user.partyAffiliation = decoded.user.partyAffiliation;
    this.user.exposePartyAffiliation = decoded.user.exposePartyAffiliation;
    localStorage.setItem('user', JSON.stringify(this.user));
    // console.log('USERSERVICE FROM TOKEN', this.user)
  }

  getUser() {
    return this.user != undefined ? this.user : JSON.parse(localStorage.getItem('user'))
  }

  setNewUser(passedNewUser: User) {
    this.user = passedNewUser;
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
      auditKey: '', // really scheduleKey but audit is better name here
    }
  }

  saveUser(body: User) {
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.put(baseURL + '/users/' + body.volunteerKey, body, {headers: header})
    // .subscribe(
    //     res => {
    //         console.log(res);
    //     },
    //     (err: HttpErrorResponse) => {
    //         console.log(err);
    //     }
    //   )
  }

}
