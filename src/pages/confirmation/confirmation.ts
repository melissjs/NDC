import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
import { Pollingstation} from '../../models/pollingstation';
//import {VotePage} from '../vote/vote';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
// import { PollingstationDetailsPage } from '../pollingstation-details/pollingstation-details';
// Services
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
  // inputs: ['pollingstation', 'volunteer'],
  // directives: [PollingstationComponent]
})
export class ConfirmationPage {
  pageTitle: string;
  currentVolunteer: User; 
  // volunteerservice: Volunteerservice;
  // pollingstationservice: Pollingstationservice;
  thisTempStation: Pollingstation;
  thisTempStationPrecint: string;
  printedShifts: string;
  
    constructor(private navCtrl: NavController, navParams: NavParams, private volunteerservice: VolunteerServiceProvider, private pollingstationservice: PollingStationServiceProvider, private restSvc: RestServiceProvider, private alertCtrl: AlertController) {
          this.pageTitle = "Confirmation";
          this.navCtrl = navCtrl;
          this.volunteerservice = volunteerservice; 
          this.pollingstationservice = pollingstationservice;
          this.restSvc = restSvc;
          this.volunteerservice.associatedVolunteerArray = [];
  
        if(this.restSvc.getLoggedIn()){
            this.currentVolunteer = this.volunteerservice.getNewVolunteer();
  
            // if(this.currentVolunteer.associatedPollingStationKey!==null){
  
            //     this.thisTempStation = this.pollingstationservice.getPollingStationbyKey(this.currentVolunteer.associatedPollingStationKey)
            //     if (this.thisTempStation != null) {
            //         this.thisTempStationPrecint = this.thisTempStation.precinctNumber;
            //     }
            // }
  
        }
    }
      
      goToStationDetails(){
          console.log('thisTempStation'+ this.thisTempStation);
          this.pollingstationservice.setStation(this.thisTempStation);
          var that = this;
          try {
              
              this.navCtrl.push('PollingstationDetailsPage');
              
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
              
          }
      }
  
       askShifts(){
      //     let confirm = this.alertCtrl.create({
      //         title: 'Would you like to cancel your shifts?',
      //         message: 'If you want to change times or stations, head over to the polling station pages.',
      //         buttons: [
      //             {
      //                 text: 'Cancel',
      //                 handler: () => {
      //                     console.log('Disagree clicked' + this.currentVolunteer.shifts);
      //                 }
      //             },
      //             {
      //                 text: 'Delete',
      //                 handler: () => {
                          
      //                     this.volunteerservice.clearShifts()
      //                     this.currentVolunteer.shifts = '';
      //                     this.printedShifts = "None";
      //                     this.currentVolunteer.associatedPollingStationKey = null;
      //                     this.volunteerservice.setPollingStationForVolunteer(null);
  
      //                     var that = this;
      //                     this.restSvc.saveVolunteerInfo()
      //                         .subscribe( (data) => {
      //                             // Expect response created here...
      //                             if (data.status == 200)  {
      //                                 console.log('successful call to save:' + data);
      //                                 this.successForward(true);
      //                             } else {
      //                                 // ?? shouldn't happen ??
      //                                 console.log('UNKNOWN STATUS:' + data);
      //                                 this.successForward(true);              
      //                             }
      //                         } , err => {
      //                             console.log('error occurred ' + err.toString());
      //                             var errStr = null;
      //                             if ((err.status == 0) ||
      //                                 (err.status == 404)) {
      //                                 this.successForward(false);
      //                             } else if (err.status == 400) {
      //                                 errStr = err._body // toString();
      //                             } else {
      //                                 errStr = err.toString();
      //                             }
      //                             // console.log(error.stack());
      //                             let alert = that.alertCtrl.create({
      //                                 title: 'Error Saving Account Settings',
      //                                 subTitle: errStr,
      //                                 buttons: [{
      //                                     text: 'OK',
      //                                     handler: () => {
      //                                         alert.dismiss();
      //                                     }
      //                                 }]
      //                             }
      //                                                              );
      //                             //timeout the error to let other modals finish dismissing.
      //                             setTimeout(()=>{
      //                                 alert.present();
      //                             },250);
      //                         }, () => {console.log('save polling details complete')}
      //                                   );
  
      //                     console.log('Agree clicked' + this.currentVolunteer.shifts);
                          
      //                 }
      //             }
      //         ]
      //     });
  
      //     confirm.present();
      }
  
      successForward(real:boolean) {
  
  
          if (!real) {
              this.volunteerservice.overWriteChangesToVolunteer(this.currentVolunteer);
          }
  
          this.volunteerservice.printVolunteer(this.currentVolunteer);
          console.log('confirmation after submit ');
  
      }
  
  }