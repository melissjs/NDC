import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Check In";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

}
