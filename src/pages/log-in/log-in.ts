import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})

export class LogInPage {

  pageTitle: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
    this.pageTitle = "User Login";
  }
  
  loggedIn(event) {
    if (event.error) {
      let alert = this.alertCtrl.create({
        title: event.error.title,
        subTitle: event.error.error.message,
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

}
  
  