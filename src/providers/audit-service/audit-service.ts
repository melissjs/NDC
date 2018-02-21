import { Auditor } from './../../models/auditor';
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
  auditTeam: Auditor[];
  auditOfInterestTeam: Auditor[];

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider, private pollingstationSvc: PollingStationServiceProvider, private electionSvc: ElectionServiceProvider, private userSvc: UserServiceProvider) {
  }

  setAudit(passedUserId) {  //what if no audit??
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + `/audits/user/${passedUserId}`, {headers: header})
      .map((res: ResponseObj) => {
        this.audit = res.obj;
        console.log('fromSET AUDIT', this.audit)
        localStorage.setItem('audit', JSON.stringify(res.obj));
        if (this.audit){
          this.auditTeam = this.audit.team;
          localStorage.setItem('auditTeam', JSON.stringify(this.audit.team));
        }
        return res;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      })
  }

  getAudit() {
    return this.audit || JSON.parse(localStorage.getItem('audit'))
  }

  activeCache() {
    if (this.cachedDateTime === 0) {
      return false;
    }
    return (this.cachedDateTime + 60000 > Date.now()) ? true : false;
  }

  // getAudits() {
  //   console.log('FROM GET')
  //   return this.audits || JSON.parse(localStorage.getItem('audits'));
  // }

  setAuditOfInterestStats() {
      this.cachedDateTime = Date.now();
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + `/audits/election/${this.electionSvc.getElectionOfInterest()._id}/pollingstation/${this.pollingstationSvc.getStationOfInterest()._id}`, {headers: header})
      .map((res: ResponseObj) => {
        this.auditOfInterest = res.obj;
        localStorage.setItem('auditOfInterest', JSON.stringify(res.obj));
        // if (this.auditOfInterest.team){
        //   this.auditOfInterestTeam = this.auditOfInterest.team;
        //   localStorage.setItem('auditOfInterestTeam', JSON.stringify(this.auditOfInterest.team));
        // }
        return res;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      })
  }

  getAuditOfInterest() {
    return this.auditOfInterest || JSON.parse(localStorage.getItem('auditOfInterest'))
  }

  getAuditTeam() {
    return this.auditTeam || JSON.parse(localStorage.getItem('auditTeam'))
  }

  getAuditorByShift(shiftNum) {
    return this.getAuditTeam().filter((auditor) => {
      return auditor.shifts.includes(shiftNum);
    })
  }

  leaveAudit() {
    console.log('audddddd', this.audit)
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.delete(baseURL + `/audits/user/${this.userSvc.getUser().volunteerKey}`, {headers: header})
    .map((res: ResponseObj) => {
      this.audit = undefined;
      localStorage.removeItem('audit');
      console.log('audddddd', this.audit)
      if (this.auditTeam){
        this.auditTeam = undefined;
        localStorage.removeItem('auditTeam');
      }
      return res;
    },
    (err: HttpErrorResponse) => {
      console.error(err);
    })
  }


}

