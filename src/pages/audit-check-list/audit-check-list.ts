import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-audit-check-list',
  templateUrl: 'audit-check-list.html',
})
export class AuditCheckListPage {
  pageTitle: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageTitle = "Audit Checklist"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuditCheckListPage');
  }

}

