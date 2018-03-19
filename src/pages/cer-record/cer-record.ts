import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cer-record',
  templateUrl: 'cer-record.html',
})
export class CerRecordPage {

  pageTitle: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = 'CER Record';
  }

}
