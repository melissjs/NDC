import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { RecordServiceProvider } from '../../providers/record-service/record-service';

@IonicPage()
@Component({
  selector: 'page-morning-check-in',
  templateUrl: 'morning-check-in.html',
  // directives: [CheckLogin],
})

export class MorningCheckInPage implements OnInit {

  pageTitle: string;
  checkInForm: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private recordservice: RecordServiceProvider, private fb: FormBuilder, public authSvc: AuthServiceProvider) {
    this.pageTitle = "Morning Check In";
  }

  ngOnInit() {
    this.checkInForm = this.fb.group({  
      // 'enterFullNameCtrl': [this.fullName, Validators.compose([Validators.required])],
      // 'enterEmailAddressCtrl': [this.user.emailAddress, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExEmail)])],
      // 'enterSubjectCtrl': ['', Validators.required],
      // 'enterMessageCtrl': ['', Validators.required]
    });
  }

  onSubmit() {
  }

}



