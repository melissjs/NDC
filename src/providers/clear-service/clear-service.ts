import { ElectionServiceProvider } from './../election-service/election-service';
import { AuditServiceProvider } from './../audit-service/audit-service';
import { UserServiceProvider } from './../user-service/user-service';
import { ResumeRoleServiceProvider } from './../resume-role-service/resume-role-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClearServiceProvider {

  constructor(public http: HttpClient, private rrSvc: ResumeRoleServiceProvider, private userSvc: UserServiceProvider, private auditSvc: AuditServiceProvider, private electionSvc: ElectionServiceProvider) {
  }

  clearAllVars() {
    this.rrSvc.clearAllVars();
    this.userSvc.clearAllVars();
    this.auditSvc.clearAllVars();
    this.electionSvc.clearAllVars();
  }

}
