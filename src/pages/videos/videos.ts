import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Videos";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

}
