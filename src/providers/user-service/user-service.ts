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
  // newUser: User;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider) {
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

  saveUser(body: User) {
    // const header = new Headers({'Authorization' : this.authSvc.getToken()})
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.put(baseURL + '/users/' + body.volunteerKey, body, {headers: header}).subscribe(
        res => {
            console.log(res);
        },
        (err: HttpErrorResponse) => {
            // this.handleAngularJsonBug(err);
            console.log(err);
        }
      )
  }

//   private handleAngularJsonBug (error: HttpErrorResponse) {
//     const JsonParseError = 'Http failure during parsing for';
//     const matches = error.message.match(JsonParseError);
//     if (error.status === 200 && matches != null) {
//         return;
//     } else {
//         console.log('Error Occured', error)
//     }
// }

}
