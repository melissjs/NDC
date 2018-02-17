import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuditServiceProvider } from '../../providers/audit-service/audit-service';

@IonicPage()
@Component({
  selector: 'page-join-audit',
  templateUrl: 'join-audit.html',
})
export class JoinAuditPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auditSvc: AuditServiceProvider) {
  }

  ngOnInit() {
    // this.auditSvc.getAuditStats();
  }

}
