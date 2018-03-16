import { Resume } from './../../models/resume';
import { ResumeRoleServiceProvider } from './../../providers/resume-role-service/resume-role-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObj } from './../../models/response-obj';
import { Pollingstation } from './../../models/pollingstation';
import { AuditServiceProvider } from './../../providers/audit-service/audit-service';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// Models
import { Volunteer} from '../../models/volunteer';
// Globals
import * as globals from '../../globals';
// Components
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
import { ChangePasswordComponent } from '../../components/change-password/change-password';
// Providers
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';

@IonicPage()
@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})

export class AccountSettingsPage implements OnInit {
  pageTitle: string;
  changeForm: FormGroup;
  currentVolunteer: User; 
  exposedYesOrNo: string;
  currentTempVolunteer: User;
  thisTempStation: Pollingstation;
  thisTempStationPrecint: string;
  printedShifts: string;
  fullVolunteerKeyList: string[];
  fullVolunteerList: Volunteer[];
  wasTouched: boolean;
  resetPasscode: boolean;
  loggedIn: boolean;
  passChange: boolean;
  loggingout: boolean;
  pollingstation: Pollingstation;
  usersPollingstation: Pollingstation;
  auditToggle: boolean;
  roleToggle: boolean;
  resumeToggle: boolean;
  profileToggle: boolean;
  accountToggle: boolean;
  resume: Resume;
  active: boolean;
  inactive: boolean;
  deleted: boolean;
  status: string;


  constructor(public authSvc: AuthServiceProvider, public userSvc: UserServiceProvider,  private navCtrl: NavController, private navParams: NavParams, private volunteerservice: VolunteerServiceProvider, public psSvc: PollingStationServiceProvider, public fb: FormBuilder, private alertCtrl: AlertController, public restSvc: RestServiceProvider, public auditSvc: AuditServiceProvider, private rrSvc: ResumeRoleServiceProvider) {
    this.pageTitle = "Account Settings";
    this.resetPasscode = false;
    this.passChange = false;
    this.volunteerservice.associatedVolunteerArray = [];
    this.loggingout = false;
    this.auditToggle = false;
    this.roleToggle = false;
    this.profileToggle = false;
    this.resumeToggle = false;
    this.accountToggle = false;
    this.active = true;
    this.inactive = false;
    this.deleted = false;
  }

  ngOnInit(){
    this.status = 'active';
    //POLLINGSTATION
    if (this.auditSvc.getAudit()) {
      this.usersPollingstation = this.psSvc.getUsersPollingstation() || this.psSvc.getPollingStationByKey(this.auditSvc.getAudit().pollingstationId);
      if (!this.usersPollingstation) {
        this.psSvc.sgetUsersPollingStationByKey(this.auditSvc.getAudit().pollingstationId)
        .subscribe((res: any) => {
          this.usersPollingstation = res;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        })
      }
    }

    // RESUME
    if (this.rrSvc.getResume()) {
      this.resume = this.rrSvc.getResume();
      console.log('from gettttttttt', this.resume);
    }
    else {
      this.rrSvc.sgetResume()
      .subscribe((res) => {
        this.resume = res;
        console.log('from sgetttttttttt', res);
        this.resume ? null : this.resume = this.rrSvc.getNewResume();
      },
      (err: HttpErrorResponse) => {
        console.error('Error', err)
      })
    }
  }

onClickLogin() {
  this.navCtrl.setRoot('LogInPage');
}

onClickRegister(){
  this.navCtrl.push('UnregisteredSignInPage');
}

onClickReset(){
  this.navCtrl.push('ResetPasswordPage');
}

onLogout() {
}

// toggle accordian functionality

toggleRole() {
  this.roleToggle = !this.roleToggle;
}

toggleAudit() {
  this.auditToggle = !this.auditToggle;
}

toggleResume() {
  this.resumeToggle = !this.resumeToggle;
}

toggleProfile() {
  this.profileToggle = !this.profileToggle;
}

toggleAccount() {
  this.accountToggle = !this.accountToggle;
}

viewProfile(passedUser) {
  this.navCtrl.push('ProfilePage', { passedUser: passedUser });
}

deactivateAccount() {
  console.log('deactivate')
}

deleteAccount() {
  console.log('delete')
}

changeStatus() {
  console.log('change status')
}

  // askShifts(){
  //     let confirm = this.alertCtrl.create({
  //         title: 'Would you like to cancel your shifts?',
  //         message: 'If you want to change times or stations, head over to the polling station pages.',
  //         buttons: [
  //             {
  //                 text: 'Cancel',
  //                 handler: () => {
  //                     if (this.currentTempVolunteer) {
  //                         console.log('Disagree clicked' + this.currentTempVolunteer.shifts);
  //                     } else {
  //                         console.log('how did we get here?? account settings no volunteer!');
  //                     }
  //                 }
  //             },
  //             {
  //                 text: 'Delete',
  //                 handler: () => {
                      
  //                     //this.volunteerservice.clearShifts()
  //                     if (this.currentTempVolunteer) {
  //                         this.currentTempVolunteer.shifts = [''];
  //                         this.printedShifts = "None";
  //                         this.currentTempVolunteer.associatedPollingStationKey = null;
  //                         this.volunteerservice.associatedVolunteerArray = [];
  //                         console.log('Agree clicked' + this.currentTempVolunteer.shifts);
  //                     }
  //                     console.log('how did we get here either?? account settings no volunteer!');                       
  //                 }
  //             }
  //         ]
  //     });
  //     confirm.present();
  // }



// CHANGE PWD


onConfirmOldPasscode(){
  //var errorForThis: string;
  var that = this;
  //let 
  let prompt = this.alertCtrl.create({
    title: 'Verification Required  ',
    message: "Enter your old passcode to verify this change. ",
    inputs: [
      {
        name: 'old',
       placeholder: 'Old Password',
       type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Enter',
        handler: data => {
            if (this.restSvc.matchesPasscode(data.old)){
                this.passChange = true;
                this.resetPasscode = true;
                console.log('from inside ' + this.passChange)
               } else {
                 that.showAlertForOld();
               }
        }
      }
    ]
  });
  prompt.present();
  
}



showAlertForOld() {
let alert = this.alertCtrl.create({
title: 'Incorrect Password',
subTitle: 'You must enter your correct password in order to change it. If you have forgotten it, you may reset.',
buttons: ['OK']
});
          setTimeout(()=>{
          alert.present();
           },500);
//alert.present();
}




// CHANGE PARTY AFFILIATION
onChangePartyAffiliationFromList(passedValue){
  if (this.currentTempVolunteer) {
      this.currentTempVolunteer.partyAffiliation = passedValue;
  }
}


  wasThisTouched(){
      this.wasTouched = true;
      
  }

// CLICK FOR STATION
  goToStationDetails() {
      console.log('thisTempStation'+ this.thisTempStation);
      this.psSvc.setStation(this.thisTempStation);
      var that = this;
      try {
          
          this.navCtrl.push('PollingstationDetailsPage');
          
      } catch (EE) {
          console.log('error in Submitting, exc='+ EE.toString())
          
      }
  }

  onSubmit(value: any): void {

  //     if ((this.changeForm.valid) && (this.currentTempVolunteer) &&
  //         (!this.loggingout)) {
  //         //console.log('Submitted value: ', value);
  //         this.currentTempVolunteer.fullName = value.fullNameCtrl;
  //         this.currentTempVolunteer.emailAddress = value.emailAddressCtrl;
  //         this.currentTempVolunteer.phoneNumber = value.phoneNumberCtrl;
  //         this.currentTempVolunteer.age = value.ageCtrl;
  //         //this.currentTempVolunteer.sex = value.sexCtrl;
  //         //this.currentTempVolunteer.partyAffiliation = value.partyAffiliationCtrl;
  //         //this.currentTempVolunteer.passcode = value.passcodeCtrl;
  //         this.wasTouched = false;
  //         if(this.currentTempVolunteer.shifts == ""){ this.currentTempVolunteer.associatedPollingStationKey = null;}

  //         var that = this;
  //         this.restSvc.saveVolunteerInfo()
  //             .subscribe( (data) => {
  //                 // Expect response created here...
  //                 if (data.status == 200)  {
  //                     console.log('successful call to save:' + data);
  //                     this.successForward(true);
  //                 } else {
  //                     // ?? shouldn't happen ??
  //                     console.log('UNKNOWN STATUS:' + data);
  //                     this.successForward(true);              
  //                 }
  //             } , err => {
  //                 console.log('error occurred ' + err.toString());
  //                 var errStr = null;
  //                 if ((err.status == 0) ||
  //                     (err.status == 404)) {
  //                     this.successForward(false);
  //                 } else if (err.status == 400) {
  //                     errStr = err._body // toString();
  //                 } else {
  //                     errStr = err.toString();
  //                 }
  //                 // console.log(error.stack());
  //                 let alert = that.alertCtrl.create({
  //                     title: 'Error Saving Account Settings',
  //                     subTitle: errStr,
  //                     buttons: [{
  //                         text: 'OK',
  //                         handler: () => {
  //                             alert.dismiss();
  //                         }
  //                     }]
  //                 }
  //                                                  );
  //                 //timeout the error to let other modals finish dismissing.
  //                 setTimeout(()=>{
  //                     alert.present();
  //                 },250);
  //             }, () => {console.log('save polling details complete')}
  //                       );
  //     }
  }

  successForward(real:boolean) {


      if (!real) {
          if (this.currentTempVolunteer) {
              this.volunteerservice.overWriteChangesToVolunteer(this.currentTempVolunteer);
          }
      }

      if (this.currentTempVolunteer) {
          this.volunteerservice.printVolunteer(this.currentTempVolunteer);
      }
      console.log(this.passChange + ' after submit ');

      let alert = this.alertCtrl.create({
          title: 'Successfully Saved Account Settings',
          subTitle: '',
          buttons: [{
              text: 'OK',
              handler: () => {
                  alert.dismiss();
              }
          }]
      }
                                       );
      //timeout the error to let other modals finish dismissing.
      setTimeout(()=>{
          alert.present();
      },250);
  }

  displayError(that:any,text: string,subtitle: string) {
      let alert = that.alertCtrl.create({
          title: text,
          subTitle: subtitle,
          buttons: [{
              text: 'OK',
              handler: () => {
                  alert.dismiss();
              }
          }]
      });
      //timeout the error to let other modals finish dismissing.
      setTimeout(()=>{
          alert.present();
      },250);
  }

// END CLASS
}