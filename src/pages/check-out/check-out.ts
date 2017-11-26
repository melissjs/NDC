import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Check Out";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

}
