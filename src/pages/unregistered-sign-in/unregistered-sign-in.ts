import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { SuccessSplashPage } from '../success-splash/success-splash';
// import { Volunteer} from '../../models/volunteer';
// // Services
// import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
// import { RestServiceProvider } from '../../providers/rest-service/rest-service';
// // Globals
// import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-unregistered-sign-in',
  templateUrl: 'unregistered-sign-in.html',
  //providers: [RestService]
})
export class UnregisteredSignInPage {
  pageTitle: string;
  constructor() {
    this.pageTitle = "Register";
  }
}