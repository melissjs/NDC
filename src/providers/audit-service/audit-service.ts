import { Election } from './../../models/election';
import { ElectionServiceProvider } from './../election-service/election-service';
import { ResponseObj } from './../../models/response-obj';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
import { Audit } from '../../models/audit';
import { PollingStationServiceProvider } from '../polling-station-service/polling-station-service';
import { UserServiceProvider } from '../user-service/user-service';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class AuditServiceProvider {

  cachedDateTime: number;
  auditOfInterest: Audit;
  audit: Audit;
  audits: Audit[];

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider, private pollingstationSvc: PollingStationServiceProvider, private electionSvc: ElectionServiceProvider, private userSvc: UserServiceProvider) {
  }

  getUsersActiveAudit(passedUserAuditId) {

  }

  activeCache() {
    if (this.cachedDateTime === 0) {
      return false;
    }
    return (this.cachedDateTime + 60000 > Date.now()) ? true : false;
  }

  getAudits() {
    console.log('FROM GET')
    return this.audits || JSON.parse(localStorage.getItem('audits'));
  }

  getAuditStats(passedElection, passedPollingStation) {
    console.log('FROM SET')
      this.cachedDateTime = Date.now();
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + `/audits/${this.electionSvc.getElectionOfInterestId}/${this.pollingstationSvc.getStationOfInterest().pollingstationKey}`, {headers: header})
      .map((res: ResponseObj) => {
        this.audit = res.obj;
        localStorage.setItem('stations', JSON.stringify(res.obj));
        return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
  }


}

