import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-success-splash',
  templateUrl: 'success-splash.html',
})
export class SuccessSplashPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Registration Initiated"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessSplashPage');
  }

}