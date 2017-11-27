import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecordServiceProvider } from '../../providers/record-service/record-service';

@IonicPage()
@Component({
  selector: 'page-morning-check-in',
  templateUrl: 'morning-check-in.html',
  // directives: [CheckLogin],
})
export class MorningCheckInPage {
  pageTitle: string;
  constructor(private navCtrl: NavController, private navParams: NavParams, private recordservice: RecordServiceProvider) {
    this.pageTitle = "Morning Check In";
  }

  onSubmit() {
    console.log("no op for now");
  }

}



