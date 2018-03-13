import { Resume } from './../../models/resume';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResumeRoleServiceProvider {

  resume: Resume;

  constructor(public http: HttpClient) {
  }

}
