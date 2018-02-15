import { ResponseObj } from './../../models/response-obj';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Election } from '../../models/election'
import { AuthServiceProvider } from '../auth-service/auth-service';
import * as config from '../../configuration/config';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class ElectionServiceProvider {

  election: Election;
  elections: Election[];

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider) {
  }

  getElections() {

  }

  setElections() {
    if (!this.election) {
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + '/pollingstations/all', {headers: header})
      .map((res: ResponseObj) => {
        this.elections = res.obj;
        localStorage.setItem('elections', JSON.stringify(res.obj));
        return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

  getElection() {

  }

  setElection() {

  }

}
