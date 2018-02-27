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
    // display reactivation confirmation alert
    if (event.error.title === "Account inactive") {
        let alert = this.alertCtrl.create({
          title: event.error.title,
          message: event.error.error.message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Reactivate',
              handler: () => {
                console.log('Buy clicked');
                this.navCtrl.setRoot('HomePage');
              }
            }
          ]
        });
        alert.present();
    }
    // display error from server
    else if (event.error) {
      let alert = this.alertCtrl.create({
        title: event.error.title,
        subTitle: event.error.error.message,
        buttons: ['Dismiss']
      });
      alert.present();
    } 
    // logged in successfully, move on
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

}
  
  