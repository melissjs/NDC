import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
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
  // directives: [CheckLogin],
})
export class AddNewRecordPage {
  pageTitle: string;
  constructor(private navCtrl: NavController, private recordservice: RecordServiceProvider, public authSvc: AuthServiceProvider) {
    this.pageTitle = "Add New Record";
  
  }

      onSubmitVoterRecord() {
              var that = this;
              // this.recordservice.setToNonVote(false);

                    try {
                        that.navCtrl.push('VoteRecordPage', {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

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
          
        onSubmitAnomalyRecord() {
                    var that = this;
                    try {
                        that.navCtrl.push('AnomalyRecordPage', {
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


} // class end 
