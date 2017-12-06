import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  pageTitle: string;

  constructor(public authSvc: AuthServiceProvider, public navCtrl: NavController, navParams: NavParams, public restSvc: RestServiceProvider) {
    this.pageTitle = "Democracy Counts"
  }

  onVolunteerClick(){
    this.navCtrl.push('VolunteerPage');
  }

  onDonateClick(){
    this.navCtrl.push('DonatePage');
  }

  onLoginOrRegisterClick(){
    this.navCtrl.push('LogInPage');
  }

}