import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/user';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { VoteRecordPage } from '../vote-record/vote-record';
// import { AmendmentRecordPage } from '../amendment-record/amendment-record';
// import { AnomalyRecordPage } from '../anomaly-record/anomaly-record';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
// import {CheckLogin } from '../../components/check-login/check-login';

@IonicPage()
@Component({
  selector: 'page-add-new-record',
  templateUrl: 'add-new-record.html',
})

export class AddNewRecordPage {

  pageTitle: string;

  constructor(private navCtrl: NavController, private recordservice: RecordServiceProvider, public authSvc: AuthServiceProvider, private userSvc: UserServiceProvider) {
    this.pageTitle = "Add New Record";
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
    this.navCtrl.push('CERRecordPage')
  }

}
