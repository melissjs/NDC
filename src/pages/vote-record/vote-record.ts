import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vote-record',
  templateUrl: 'vote-record.html',
})
export class VoteRecordPage {


  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;
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
  