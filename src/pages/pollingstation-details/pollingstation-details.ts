import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
import { Volunteer} from '../../models/volunteer';
import { Pollingstation } from '../../models/pollingstation';
import * as globals from '../../globals';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-pollingstation-details',
  templateUrl: 'pollingstation-details.html',
})

export class PollingstationDetailsPage {

  pageTitle: string;
  user: User; 
  stations: Pollingstation[];
  currentStation: Pollingstation;
  eM: boolean = false;
  lM: boolean = false;
  eA: boolean = false;
  lA: boolean = false;
  eE: boolean = false;
  lE: boolean = false;
  earlyM: boolean = false;
  lateM: boolean = false;
  earlyA: boolean = false;
  lateA: boolean = false;
  earlyE: boolean = false;
  lateE: boolean = false;
  EARLY_MORNING: string = globals.EARLY_MORNING;
  LATE_MORNING: string = globals.LATE_MORNING;
  EARLY_AFTERNOON: string = globals.EARLY_AFTERNOON;
  LATE_AFTERNOON: string = globals.LATE_AFTERNOON;
  EARLY_EVENING: string = globals.EARLY_EVENING;
  LATE_EVENING: string = globals.LATE_EVENING;
  shiftSelected: boolean = false;
  volunteerCount: number;
  shiftsToFill: number;
  shiftsFilled: number;
  enterShifts: number[];

  constructor(private navCtrl: NavController, private navParams: NavParams, public pollingStationService: PollingStationServiceProvider, private userSvc: UserServiceProvider, public authSvc: AuthServiceProvider, private alertCtrl: AlertController, public restSvc: RestServiceProvider ) {
    this.pageTitle = "Polling Station Details";
    this.restSvc.getLoggedIn();
    this.volunteerCount = 0;
    this.shiftsToFill = 0;
    this.shiftsFilled = 0;
    this.user = this.userSvc.getUser();
    this.currentStation = this.pollingStationService.getStation();
    // populate using rest-service instead...
    // this.volunteerservice.generateStationStats(this.currentStation.pollingStationKey);
    // this.restSvc.getVolunteersByStation(this.currentStation.pollingstationKey,this.setInternals,this);
    this.volunteerCount = 0;
    this.shiftsToFill = 0;
    this.shiftsFilled = 0;

    // //ATTEMP TO FIX PROBLEM
    // if (!this.user){

    //     this.user = {
    //         volunteerKey: null,
    //         firstName: null,
    //         lastName: null,
    //         emailAddress: null,
    //         exposeEmail: false,
    //         phoneNumber: null,
    //         age:null,
    //         sex: null,
    //         partyAffiliation: null,
    //         shifts:[''], 
    //         associatedPollingStationKey:null
    //     }
    //     volunteerservice.setNewVolunteer(this.user);

    // }

    // this.setShifts();
      
  }

  // setInternals(that: any) {
  //     that.volunteerCount = that.volunteerservice.getVolunteerCount();
  //     that.shiftsToFill = that.volunteerservice.getShiftsToFill();
  //     that.shiftsFilled = that.volunteerservice.getShiftsFilled();
  // }

  // setShifts() {
  //     if ((this.user.associatedPollingStationKey == 
  //         this.currentStation.pollingStationKey) &&
  //         (this.user.shifts)) {
  //         if (this.user.shifts.includes(globals.EARLY_MORNING)) {
  //             this.eM = true;
  //             this.earlyM = true;
  //             this.shiftSelected = true;
  //         }
  //         if (this.user.shifts.includes(globals.LATE_MORNING)) {
  //             this.lM = true;
  //             this.lateM = true;
  //             this.shiftSelected = true;
  //         }
  //         if (this.user.shifts.includes(globals.EARLY_AFTERNOON)) {
  //             this.eA = true;
  //             this.earlyA = true;
  //             this.shiftSelected = true;
  //         }
  //         if (this.user.shifts.includes(globals.LATE_AFTERNOON)) {
  //             this.lA = true;
  //             this.lateA = true;
  //             this.shiftSelected = true;
  //         }
  //         if (this.user.shifts.includes(globals.EARLY_EVENING)) {
  //             this.eE = true;
  //             this.earlyE = true;
  //             this.shiftSelected = true;
  //         }
  //         if (this.user.shifts.includes(globals.LATE_EVENING)) {
  //             this.lE = true;
  //             this.lateE = true;
  //             this.shiftSelected = true;
  //         }
  //     }
  // }

  onChangeEarlyM(value) {
      var earlyM = !value;
      console.log('signature selected:' + earlyM + ' heyyyy ' + this.restSvc.loggedIn);
      this.eM = earlyM;
  }

  onChangeLateM(value) {
      var lateM = !value;
      console.log('signature selected:' + lateM);
      this.lM = lateM;
  }


  onChangeEarlyA(value) {
      var EarlyA = !value;
      console.log('signature selected:' + EarlyA);
      this.eA = EarlyA;
  }

  onChangeLateA(value) {
      var LateA = !value;
      console.log('signature selected:' + LateA);
      this.lA = LateA;
  }


  onChangeEarlyE(value) {
      var EarlyE = !value;
      console.log('signature selected:' + EarlyE);
      this.eE = EarlyE;
  }

  onChangeLateE(value) {
      var LateE = !value;
      console.log('signature selected:' + LateE);
      this.lE = LateE;
     
      // console.log(this.volunteerservice.getVolunteersByStation(this.currentStation));
  }

  onChangeShifts(shifts) {

  }

  onSubmit() {

  //     //clear shifts
  //     //console.log(this.volunteerservice.printVolunteerKeysFromList());
      
  //     // this.volunteerservice.currentVolunteer.shifts.splice(0, this.volunteerservice.currentVolunteer.shifts.length);
  //     this.volunteerservice.clearShifts();
      
  //     //check to see if polling station conflict (needed?)
  //     var shiftNowSelected = false;

  //     // add shift(s) to volunteer object
  //     if(this.eM){
  //         this.volunteerservice.setShifts(globals.EARLY_MORNING);
  //         shiftNowSelected = true;
  //     }

  //     if(this.lM){
  //         this.volunteerservice.setShifts(globals.LATE_MORNING);
  //         shiftNowSelected = true;
  //     }

  //     if(this.eA){
  //         this.volunteerservice.setShifts(globals.EARLY_AFTERNOON);
  //         shiftNowSelected = true;
  //     }

  //     if(this.lA){
  //         this.volunteerservice.setShifts(globals.LATE_AFTERNOON);
  //         shiftNowSelected = true;
  //     }

  //     if(this.eE){
  //         this.volunteerservice.setShifts(globals.EARLY_EVENING);
  //         shiftNowSelected = true;
  //     }

  //     if(this.lE){
  //         this.volunteerservice.setShifts(globals.LATE_EVENING);
  //         shiftNowSelected = true;
  //         console.log(this.user);
  //     }

  //     //check for selected station, remove volunteer from old station
  //     if ((shiftNowSelected) ||
  //         (this.shiftSelected && !shiftNowSelected)) { // Something changed (all cleared)
       
  //         //add polling station to volunteer object
  //         this.volunteerservice.setPollingStationForVolunteer(this.currentStation); 
  //         console.log(this.user);

        
  //     }


  //     // alert
  //     var that = this;
  //     try {
  //         if ((shiftNowSelected) ||
  //             (this.shiftSelected && !shiftNowSelected)) { // Something changed (all cleared)
  //             this.restSvc.saveVolunteerInfo()
  //                 .subscribe( (data) => {
  //                     // Expect response created here...
  //                     if (data.status == 200)  {
  //                         console.log('successful call:' + data);
  //                         this.successForward(true);
  //                     } else {
  //                         // ?? shouldn't happen ??
  //                         console.log('UNKNOWN STATUS:' + data);
  //                         this.successForward(true);              
  //                     }
  //                 } , err => {
  //                     console.log('error occurred ' + err.toString());
  //                     var errStr = null;
  //                     if ((err.status == 0) ||
  //                         (err.status == 404)) {
  //                         this.successForward(false);
  //                         return;
  //                     } else if (err.status == 400) {
  //                         errStr = err._body // toString();
  //                     } else {
  //                         errStr = err.toString();
  //                     }
  //                     // console.log(error.stack());
  //                     let alert = that.alertCtrl.create({
  //                         title: 'Error Saving Polling Station Details',
  //                         subTitle: errStr,
  //                         buttons: [{
  //                             text: 'OK',
  //                             handler: () => {
  //                                 alert.dismiss();
  //                             }
  //                         }]
  //                     }
  //                                                      );
  //                     //timeout the error to let other modals finish dismissing.
  //                     setTimeout(()=>{
  //                         alert.present();
  //                     },250);
  //                 }, () => {console.log('save polling details complete')}
  //                           );
  //         } 

  //     } catch (EE) {
  //         console.log('error in Submitting, exc='+ EE.toString())
  //     }
  // }

  // successForward(real:boolean) {

  //     // ((this.eM == true) || (this.lM) || (this.eA) || (this.lA) || (this.eE) || (this.lE) ){
  //     let alert = this.alertCtrl.create({
  //         title: 'Independently Validate Location Address',
  //         subTitle: 'Please keep in mind anyone can enter a polling location address and we cannot check the validity of every single one; make sure to confirm this polling location is legitimate for yourself.',
  //         buttons: ['OK'] 
  //     });
  //     setTimeout(()=>{
  //         alert.present();
  //     },250);
  //     this.navCtrl.push(ConfirmationPage, {
  //         title: globals.CONFPAGETITLE,
  //         menupg: this.titlec.page
  //     });
  }

  onInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'How are these numbers calculated?',
      subTitle: 'There are 45 individual shifts to fill at every station. These totals are based on the recommended number of volunteers per shift: 5 in the morning when it is less busy and 8 in each of the five following time blocks.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // onJoinAudit() {
  //   this.navCtrl.push('JoinAuditPage');
  // }

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
          }
        }
      ]
    });
    alert.present();
  }

}