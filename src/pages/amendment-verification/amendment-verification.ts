import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-amendment-verification',
  templateUrl: 'amendment-verification.html',
})
export class AmendmentVerificationPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Amendment Verification"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmendmentVerificationPage');
  }

}
