import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  pageTitle: string;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.pageTitle = "About"
  }
}