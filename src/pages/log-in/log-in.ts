import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteer} from '../../models/volunteer';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
    // inputs: ['Volunteer']
})

export class LogInPage {

  pageTitle: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private pollingstationservice: PollingStationServiceProvider, private volSvc: VolunteerServiceProvider, private restSvc: RestServiceProvider ) {
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
  
  