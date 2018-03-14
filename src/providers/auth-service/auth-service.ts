import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { User } from '../../models/user';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
// import { ClearServiceProvider } from '../clear-service/clear-service';
let baseURL = config.NDCS_BASE_URL;


@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient, @Inject(forwardRef(() => ClearServiceProvider)) private clearSvc: ClearServiceProvider) {
    this.clearSvc = clearSvc;
  }

  register(body: User) {
    return this.http.post(baseURL + '/users/add', body);
  }

  signin(body: User) {
    return this.http.post(baseURL + '/users/signin', body);
  }

  logout() {
    localStorage.clear();
    this.clearSvc.clearAllVars();
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      let token =  localStorage.getItem('token');
      var decoded = jwt_decode(token);
      let datetime = Math.floor(Date.now() / 1000);
      if (token && decoded.exp > datetime) {
        return true;
      }
      else {
        localStorage.clear();
        return false;
      }
    } else {
      localStorage.clear();
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  voidUser() {
    return {
      username: null,
      password: null
      // volunteerKey: null,
    }
  }

  reactivateUser(body: User) {
    return this.http.post(baseURL + '/users/reactivate', body);
  }

}

import { ClearServiceProvider } from '../clear-service/clear-service';