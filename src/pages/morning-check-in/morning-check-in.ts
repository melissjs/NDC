import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecordServiceProvider } from '../../providers/record-service/record-service';

@Component({
  selector: 'page-morning-check-in',
  templateUrl: 'morning-check-in.html',
  // directives: [CheckLogin],
})
export class MorningCheckInPage {

  constructor(private navCtrl: NavController, private navParams: NavParams, private recordservice: RecordServiceProvider) {
  }

  onSubmit() {
    console.log("no op for now");
  }

}



