import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit, Input } from '@angular/core';
import * as globals from '../../globals';
import { Resume } from '../../models/resume';
import { ResponseObj } from '../../models/response-obj';

@Component({
  selector: 'resume',
  templateUrl: 'resume.html',
  inputs: ['resume', 'pageTitle']
})
export class ResumeComponent implements OnInit {

  pageTitle: string;
  resumeRoleForm: FormGroup;
  resume: Resume;

  constructor(private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.resumeRoleForm = this.fb.group({
      'enterShortBioCtrl':  [this.resume.shortBio],
      'enterFacebookCtrl': [this.resume.facebook],
      'enterTwitterCtrl': [this.resume.twitter],
      'enterInstagramCtrl': [this.resume.instagram],
      'enterLinkedInCtrl': [this.resume.linkedin],
      'enterWebsiteCtrl': [this.resume.website],
      'enterResumeCtrl': [this.resume.resume],
      'enterAreasOfExpertiseCtrl': [this.resume.areasOfExpertise],
      'enterRelatedExperienceCtrl': [this.resume.relatedExperience],
      'enterOtherLinksCtrl': [this.resume.otherLinks],
      // 'enterRolesCtrl': ['', Validators.required],
      'enterReferencesCtrl': [this.resume.references],
      'enterPreferredContactCtrl': [this.resume.preferredContact]
    });
  }

  onSave() {
    console.log('SAVE');
  }

}
