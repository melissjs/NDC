import { ResumeRoleServiceProvider } from './../resume-role-service/resume-role-service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';

@Injectable()
// @Inject(forwardRef(() => ResumeRoleServiceProvider)) private rrSvc: ResumeRoleServiceProvider

export class ClearServiceProvider {

  constructor(public http: HttpClient, private rrSvc: ResumeRoleServiceProvider) {
  }

  clearAllVars() {
    // clear local vars with functions that reach into other service providers
    this.rrSvc.clearAllVars();
    console.log('done')
  }

}
