import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';
import * as globals from '../../globals';
import { Resume } from '../../models/resume';
import { ResumeRoleServiceProvider } from '../../providers/resume-role-service/resume-role-service';
import { ResponseObj } from '../../models/response-obj';

@Component({
  selector: 'resume',
  templateUrl: 'resume.html'
})
export class ResumeComponent implements OnInit {

  pageTitle: string;
  resumeRoleForm: FormGroup;
  resume: Resume;

  constructor(private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private rrSvc: ResumeRoleServiceProvider) {
  }

  ngOnInit() {
    if (this.rrSvc.getResume()) {
      this.resume = this.rrSvc.getResume();
    }
    else {
      this.rrSvc.sgetResume()
      .subscribe((res: ResponseObj) => {
        this.resume = res.obj;
        console.log('from sget', res.obj)
      },
      (err: HttpErrorResponse) => {
        console.error('Error', err)
      })
    }

    this.resumeRoleForm = this.fb.group({
      'enterShortBioCtrl':  [''],
      'enterFacebookCtrl': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterTwitterCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterInstagramCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterLinkedInCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      'enterWebsiteCtrl': [''],
      'enterResumeCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      'enterAreasOfExpertiseCtrl': [''],
      'enterRelatedExperienceCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      'enterOtherLinksCtrl': [''],
      'enterRolesCtrl': ['', Validators.required],
      'enterReferencesCtrl': [''],
      'enterPreferredContactCtrl': ['', Validators.required]
    });
  }

  onSave() {
    console.log('SAVE');
  }

}
