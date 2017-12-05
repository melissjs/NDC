import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import * as config from '../../configuration/config';
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
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
