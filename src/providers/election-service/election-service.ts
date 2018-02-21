import { ResponseObj } from './../../models/response-obj';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Election } from '../../models/election'
import { AuthServiceProvider } from '../auth-service/auth-service';
import * as config from '../../configuration/config';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class ElectionServiceProvider {

  // electionOfInterest._id: string;
  electionOfInterest: Election;
  elections: Election[];


  constructor(public http: HttpClient, private authSvc: AuthServiceProvider) {
    this.elections = this.getElections();
  }

  getElections() {
    return this.elections || JSON.parse(localStorage.getItem('elections'));
  }

  setElections() {
    if (this.electionOfInterest) {
      localStorage.setItem('electionOfInterest', JSON.stringify(this.electionOfInterest));
    }
    if (this.elections) {
      localStorage.setItem('elections', JSON.stringify(this.elections));
    }
    if (!this.electionOfInterest && !this.elections) {
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + '/elections/all', {headers: header})
      .subscribe((res: ResponseObj) => {
        this.elections = res.obj;
        localStorage.setItem('elections', JSON.stringify(res.obj));
        console.log('elections', this.elections)
        // return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

  getElectionOfInterest() {
    return this.electionOfInterest || JSON.parse(localStorage.getItem('electionOfInterest'));
  }

  setElectionOfInterest(passedElectionId) {
    this.electionOfInterest = this.getElectionFromId(passedElectionId);
    localStorage.setItem('electionOfInterest', JSON.stringify(this.electionOfInterest));
  }

  getElectionFromId(passedId): Election {
    this.elections.forEach((election) => {
      election._id === passedId ? this.electionOfInterest = election : null;
      return this.electionOfInterest;
    })
    return this.electionOfInterest;
  }

}
