import { AlertController } from 'ionic-angular/components/alert/alert-controller';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auditSvc: AuditServiceProvider, private alertCtrl: AlertController) {
    this.pageTitle = 'Join Audit';
    this.auditor = true;
  }

  ngOnInit() {
  }

  onInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'What are auditor and lead roles?',
      subTitle: 'If you join an audit you are automatically an auditor. There are two lead roles positions per audit, you can apply to be a lead auditor if you want to be paid and take on more responsibility. You will be contacted if your request is approved.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}