import { ResponseObj } from './../../models/response-obj';
import { UserServiceProvider } from './../user-service/user-service';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { Resume } from './../../models/resume';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from '../../configuration/config';
let baseURL = config.NDCS_BASE_URL;


@Injectable()
export class ResumeRoleServiceProvider {

  resume: Resume;
  newResume: Resume;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider) {
  }

  clearAllVars() {
    this.resume = undefined;
    this.newResume = undefined;
    console.log('this.resume  after clear', this.resume )
  }

  getNewResume() {
    return this.newResume = {
      userId: '',
      shortBio: '',
      preferredContact: [''],
      references: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      website: '',
      resume: '',
      areasOfExpertise: [''],
      relatedExperience: '',
      otherLinks: '',
    }
  }

  getResume() {
    if (this.resume) {
      return this.resume;
    }
    else if (localStorage.getItem('resumeLS')) {
      this.resume = JSON.parse(localStorage.getItem('resumeLS'));
      return this.resume;
    }
    else {
      return undefined
    }
  }

  sgetResume() {
    console.log('from sget')
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.get(baseURL + '/resumes/user/' + this.userSvc.getUser().volunteerKey, {headers: header})
    .map((res: ResponseObj)  => {
        console.log(res);
        this.resume = res.obj;
        localStorage.setItem('resumeLS', JSON.stringify(res.obj));
        return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        return err;
      })
  }

}
