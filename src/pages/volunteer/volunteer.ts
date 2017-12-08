import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})

export class VolunteerPage {

  pageTitle: string;

  constructor(public authSvc: AuthServiceProvider, private navCtrl: NavController, navParams: NavParams, public restSvc: RestServiceProvider) {
    this.pageTitle = "Volunteer";
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