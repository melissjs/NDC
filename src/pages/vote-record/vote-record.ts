import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vote-record',
  templateUrl: 'vote-record.html',
})
export class VoteRecordPage {
  pageTitle: string;
  constructor(private navCtrl: NavController) {
    this.pageTitle = "Vote Record";
    }
  
  
        onSubmit() {
          var that = this;
          try {
              that.navCtrl.push('AffidavitPage', {
              })
  
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
      }
  
  
  }
  