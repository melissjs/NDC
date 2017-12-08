import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
import { User} from '../../models/user';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
// import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
// import { RestServiceProvider } from '../../providers/rest-service/rest-service';
// import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-unregistered-sign-in',
  templateUrl: 'unregistered-sign-in.html',
  //providers: [RestService]
})
export class UnregisteredSignInPage {
  pageTitle: string;
  newUser: User;

  constructor(private authSvc: AuthServiceProvider, private navCtrl: NavController, private navParams: NavParams) {
    this.pageTitle = "Register";
    this.newUser = (this.navParams.get('user') || this.authSvc.voidUser());
    console.log('user from unreg', this.newUser)
  }

  // onRegister() {
  //   // set user
  //   this.authSvc.register(this.newUser)
  //   .subscribe( 
  //     data => {
  //       console.log(data)
  //         // set volunteer
  //           // login user
  //     },
  //     error => console.log(error)
  //   );
  // }
}