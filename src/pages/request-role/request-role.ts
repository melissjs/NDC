import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-request-role',
  templateUrl: 'request-role.html',
  inputs: ['pageTitle']
})
export class RequestRolePage {

  pageTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = 'Request Role';
  }

}
