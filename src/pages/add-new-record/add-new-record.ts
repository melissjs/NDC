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

export class AddNewRecordPage implements OnInit {

  pageTitle: string;
  currentVolunteer: User;

  constructor(private navCtrl: NavController, private recordservice: RecordServiceProvider, public authSvc: AuthServiceProvider, private userSvc: UserServiceProvider) {
    this.pageTitle = "Add New Record";
  }

  ngOnInit() {
    this.currentVolunteer = this.userSvc.getUser();
  }

  onSubmitVoterRecord() {
    this.navCtrl.push('VoteRecordPage')
  }

        onSubmitNonVoterRecord() {
                    var that = this;
                    // this.recordservice.setToNonVote(true);
                    // console.log('hello' + this.recordservice.getNonVoteBool());
      
                    try {
                        that.navCtrl.push('VoteRecordPage', {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

        }

        onSubmitAmendmentRecord() { 
          var that = this;
          try {
              that.navCtrl.push('AmendmentRecordPage', {
              })

          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          } 
}
          
        onSubmitAnomalyRecord() {
                    var that = this;
                    try {
                        that.navCtrl.push('AnomalyRecordPage', {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
        }

        onSubmitCERRecord() {

        }


} // class end 
