import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-end',
  templateUrl: 'end.html',
})
export class EndPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "End";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndPage');
  }

}
