import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import * as globals from '../../globals';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})

export class VolunteerPage {

  pageTitle: string;
  election: string;

  constructor(public authSvc: AuthServiceProvider, private navCtrl: NavController, navParams: NavParams, public restSvc: RestServiceProvider, private alertCtrl: AlertController) {
    this.pageTitle = "Volunteer";
  }

  onChooseElection() {
    let alert = this.alertCtrl.create({
      title: 'Select Election',
      inputs: [
        {
          type: 'checkbox',
          label: 'Midterm 2018',
          name: 'em',
          id: 'em',
          value: 'em',
          checked: false
        },
        {
          type: 'checkbox',
          label: 'General 2018',
          name: 'mm',
          id: 'mm',
          value: 'mm',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('alert data', data)
          }
        }
      ]
    });
    alert.present();
  }

  
  onRegister(){
    this.navCtrl.push('UnregisteredSignInPage');
  }
  
  onFindPolling(){
    this.navCtrl.push('FindPollingLocationPage');
  }
  
  onAddPolling(){
    this.navCtrl.push('AddPollingLocationPage');
  }

}