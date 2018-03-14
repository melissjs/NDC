import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
let baseURL = config.NDCS_BASE_URL;


@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {}

  register(body: User) {
    return this.http.post(baseURL + '/users/add', body);
  }

  signin(body: User) {
    return this.http.post(baseURL + '/users/signin', body);
  }

  logout() {
    localStorage.clear();
    // clear local vars with functions that reach into other service providers
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
