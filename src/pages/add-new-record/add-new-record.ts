import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/user';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-new-record',
  templateUrl: 'add-new-record.html',
})

export class AddNewRecordPage {

  pageTitle: string;
  currentVolunteer: User;

  constructor(private navCtrl: NavController, public authSvc: AuthServiceProvider, private userSvc: UserServiceProvider) {
    this.pageTitle = "Add New Record";
    this.currentVolunteer = this.userSvc.getUser();
  }

  onSubmitAffidavitRecord() {
    this.navCtrl.push('AffidavitPage')
  }

  onSubmitVoterRecord() {
    this.navCtrl.push('VoteRecordPage')
  }

  onSubmitNonVoterRecord() {
    this.navCtrl.push('VoteRecordPage')
  }

  onSubmitAmendmentRecord() { 
    this.navCtrl.push('AmendmentRecordPage')
  }
  
  onSubmitAnomalyRecord() {
    this.navCtrl.push('AnomalyRecordPage')
  }

  onSubmitCERRecord() {
    this.navCtrl.push('CerRecordPage')
  }

}
