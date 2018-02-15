import { Auditor } from './../../models/auditor';
import { Audit } from './../../models/audit';
import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'audit-stats',
  templateUrl: 'audit-stats.html'
})

export class AuditStatsComponent implements OnInit{

  audit: Audit;
  team: Auditor[];
  shiftSelected: boolean = false;
  volunteerCount: number;
  shiftsToFill: number;
  shiftsFilled: number;
  enterShifts: number[];

  constructor(private alertCtrl: AlertController) {
    this.volunteerCount = 0;
    this.shiftsToFill = 0;
    this.shiftsFilled = 0;
  }

  ngOnInit() {
    
  }

    // onJoinAudit() {
  //   this.navCtrl.push('JoinAuditPage');
  // }

  // onInfoAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'How are these numbers calculated?',
  //     subTitle: 'There are 45 individual shifts to fill at every station. These totals are based on the recommended number of volunteers per shift: 5 in the morning when it is less busy and 8 in each of the five following time blocks.',
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  // }

  // onJoinAudit() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Select shifts',
  //     inputs: [
  //       {
  //         type: 'checkbox',
  //         label: 'Early Morning',
  //         name: 'em',
  //         id: 'em',
  //         value: 'em',
  //         checked: false
  //       },
  //       {
  //         type: 'checkbox',
  //         label: 'Mid Morning',
  //         name: 'mm',
  //         id: 'mm',
  //         value: 'mm',
  //         checked: false
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: data => {
  //           console.log('alert data', data)
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

}
