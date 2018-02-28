import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuditServiceProvider } from '../../providers/audit-service/audit-service';

@IonicPage()
@Component({
  selector: 'page-join-audit',
  templateUrl: 'join-audit.html',
})
export class JoinAuditPage implements OnInit {

  pageTitle: string;
  em: boolean;
  lm: boolean;
  ea: boolean;
  la: boolean;
  ee: boolean;
  le: boolean;
  lead: boolean;
  auditor: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auditSvc: AuditServiceProvider) {
    // this.em = false;
    // this.lm = false;
    // this.ea = false;
    // this.la = false;
    // this.ee = false;
    // this.le = false;
  }

  ngOnInit() {
  }

}