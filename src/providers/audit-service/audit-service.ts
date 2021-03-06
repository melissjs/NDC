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

  clearAllVars() {
    this.cachedDateTime = 0;
    this.auditOfInterest = undefined;
    this.audit = undefined;
    this.audits = [];
    this.auditTeam = [];
    this.auditOfInterestTeam = [];
  }

  sgetAudit(passedUserId) {  //what if no audit??
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + `/audits/user/${passedUserId}`, {headers: header})
      .map((res: ResponseObj) => {
        this.audit = res.obj;
        // console.log('fromSET AUDIT', this.audit)
        localStorage.setItem('auditLS', JSON.stringify(res.obj));
        if (this.audit){
          this.auditTeam = this.audit.team;
          localStorage.setItem('auditTeamLS', JSON.stringify(this.audit.team));
        }
        return res;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        return undefined;
      })
  }

  getAudit() {
    return this.audit || JSON.parse(localStorage.getItem('auditLS'))
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
        localStorage.setItem('auditOfInterestLS', JSON.stringify(res.obj));
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
    return this.auditOfInterest || JSON.parse(localStorage.getItem('auditOfInterestLS'))
  }

  getAuditTeam() {
    return this.auditTeam || JSON.parse(localStorage.getItem('auditTeamLS'))
  }

  getAuditorByShift(shiftNum) {
    return this.getAuditTeam().filter((auditor) => {
      return auditor.shifts.includes(shiftNum);
    })
  }

  leaveAudit() {
    // console.log('audddddd', this.audit)
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.delete(baseURL + `/audits/user/${this.userSvc.getUser().volunteerKey}`, {headers: header})
    .map((res: ResponseObj) => {
      this.audit = undefined;
      localStorage.removeItem('auditLS');
      // remove refs to users ps // IS THIS LIKE REDUX ACTION?
      this.pollingstationSvc.rmUsersPollingstation();
      // console.log('audddddd', this.audit)
      if (this.auditTeam){
        this.auditTeam = undefined;
        localStorage.removeItem('auditTeamLS'); // WHY NOT RM
      }
      this.userSvc.rmRole('auditor');
      return res;
    },
    (err: HttpErrorResponse) => {
      console.error(err);
    })
  }

  joinAudit() {
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.post(baseURL + `/audits/user/${this.userSvc.getUser().volunteerKey}`, {headers: header})
    .map((res: ResponseObj) => {
      this.audit = res.obj;
      localStorage.setItem('auditLS', JSON.stringify(this.audit));
      console.log('audddddd', this.audit)
      if (this.audit.team){
        this.auditTeam = this.audit.team;
        localStorage.setItem('auditTeamLS', JSON.stringify(this.auditTeam));
      }
      return res;
    },
    (err: HttpErrorResponse) => {
      console.error(err);
    })
  }


}

