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
    // this.resume = this.rrSvc.getNewResume();
    if (this.rrSvc.getResume()) {
      this.resume = this.rrSvc.getResume();
      console.log('from gettttttttt', this.resume);
    }
    else {
      this.rrSvc.sgetResume()
      .subscribe((res) => {
        this.resume = res;
        console.log('from sgetttttttttt', res);
      },
      (err: HttpErrorResponse) => {
        console.error('Error', err)
      })
    }
    
    this.resumeRoleForm = this.fb.group({
      'enterShortBioCtrl':  [this.resume.shortBio],
      'enterFacebookCtrl': [this.resume.facebook, Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterTwitterCtrl': [this.resume.twitter, Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterInstagramCtrl': [this.resume.instagram, Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterLinkedInCtrl': [this.resume.linkedin, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      'enterWebsiteCtrl': [this.resume.website],
      'enterResumeCtrl': [this.resume.resume, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      'enterAreasOfExpertiseCtrl': [this.resume.areasOfExpertise],
      'enterRelatedExperienceCtrl': [this.resume.relatedExperience, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      'enterOtherLinksCtrl': [this.resume.otherLinks],
      'enterRolesCtrl': ['', Validators.required],
      'enterReferencesCtrl': [this.resume.references],
      'enterPreferredContactCtrl': [this.resume.preferredContact, Validators.required]
    });
  }

  onSave() {
    console.log('SAVE');
  }

}
