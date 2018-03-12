import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  pageTitle: string;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Profile";
    this.user = this.navParams.get('passedUser');
  }

}
