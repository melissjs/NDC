import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObj } from './../../models/response-obj';
import { Auditor } from './../../models/auditor';
import { Audit } from './../../models/audit';
import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController } from 'ionic-angular';
import { AuditServiceProvider } from '../../providers/audit-service/audit-service';

@Component({
  selector: 'audit-stats',
  templateUrl: 'audit-stats.html'
})

export class AuditStatsComponent implements OnInit{

  audit: Audit;
  usersAuditId: string;
  auditOfInterestId: string;
  team: Auditor[];
  shiftSelected: boolean = false;
  volunteerCount: number;
  shiftsToFill: number;
  shiftsFilled: number;
  enterShifts: number[];

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public auditSvc: AuditServiceProvider) {
    this.volunteerCount = 0;
    this.shiftsToFill = 0;
    this.shiftsFilled = 0;
  }

  ngOnInit() {
    this.auditSvc.setAuditOfInterestStats()
    .subscribe((res: ResponseObj) => {
      this.audit = res.obj;
      console.log("AUDIT", this.audit)
      this.volunteerCount = this.audit.teamLength;
      this.shiftsToFill = 45 - this.audit.shifts;
      this.shiftsFilled = this.audit.shifts;
      this.auditOfInterestId = this.audit._id;
    }, 
  (err: HttpErrorResponse) => {
    console.error(err);
  })
  if (this.auditSvc.getAudit()) {
    this.usersAuditId = this.auditSvc.getAudit()._id;
  }
  }

  onInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'How are these numbers calculated?',
      subTitle: 'There are 45 individual shifts to fill at every station. These totals are based on the recommended number of volunteers per shift: 5 in the morning when it is less busy and 8 in each of the five following time blocks.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  onJoinAudit() {
    let alert = this.alertCtrl.create({
      title: 'Select shifts',
      inputs: [
        {
          type: 'checkbox',
          label: 'Early Morning',
          name: 'em',
          id: 'em',
          value: 'em',
          checked: false
        },
        {
          type: 'checkbox',
          label: 'Mid Morning',
          name: 'mm',
          id: 'mm',
          value: 'mm',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('alert data', data)
            this.navCtrl.push('JoinAuditPage');
          }
        }
      ]
    });
    alert.present();
  }

}