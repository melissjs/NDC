import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObj } from './../../models/response-obj';
import { Auditor } from './../../models/auditor';
import { Audit } from './../../models/audit';
import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController } from 'ionic-angular';
import { AuditServiceProvider } from '../../providers/audit-service/audit-service';
import { ElectionServiceProvider } from '../../providers/election-service/election-service';

@Component({
  selector: 'audit-stats',
  templateUrl: 'audit-stats.html'
})

export class AuditStatsComponent implements OnInit{

  audit: Audit;
  auditOfInterestId: string;
  team: Auditor[];
  shiftSelected: boolean = false;
  volunteerCount: number;
  shiftsToFill: number;
  shiftsFilled: number;
  enterShifts: number[];
  buttonText: string;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public auditSvc: AuditServiceProvider, private electionSvc: ElectionServiceProvider) {
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
      this.setButtonVars();
    }, 
    (err: HttpErrorResponse) => {
      console.error(err);
    })
  }

  setButtonVars() {
    if (this.electionSvc.getElectionOfInterest()){
      if (this.auditSvc.getAudit() &&  this.auditSvc.getAudit()._id === this.auditSvc.getAuditOfInterest()._id) {
          this.buttonText = 'Leave Audit'
      } 
      else {
        this.buttonText = 'Join Audit'
      }
    }
    else {
      this.buttonText = undefined;
    }
  }

  onAuditAction() {
    if (this.buttonText === 'Join Audit') {
      this.onJoinAudit();
    }
    else if (this.buttonText === "Leave Audit") {
      this.onLeaveAudit();
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
    this.navCtrl.push('JoinAuditPage');
  }

  onLeaveAudit() {
    this.auditSvc.leaveAudit()
    .subscribe((res: ResponseObj) => {
      this.setButtonVars();
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }

}