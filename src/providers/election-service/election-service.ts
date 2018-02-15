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
    return this.elections || JSON.parse(localStorage.getItem('elections'));
  }

  setElections() {
    if (!this.election) {
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + '/elections/all', {headers: header})
      .map((res: ResponseObj) => {
        this.elections = res.obj;
        localStorage.setItem('elections', JSON.stringify(res.obj));
        console.log('elections', this.elections)
        return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

  getElectionId() {
    return this.election || JSON.parse(localStorage.getItem('election'));
  }

  setElectionId(passedElectionId) {
    this.election = passedElectionId;
    localStorage.setItem('election', JSON.stringify(passedElectionId));

  }

}
