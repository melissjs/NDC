import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
//import { Team } from '../../team';
//import {VotePage} from '../vote/vote';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
// import {CheckLogin } from '../../components/check-login/check-login';

@IonicPage()
@Component({
  selector: 'page-activity-record',
  templateUrl: 'activity-record.html',
  // directives: [CheckLogin],
})
export class ActivityRecordPage {
  pageTitle: string;
  currentVolunteer: Volunteer; 
  currentTeam: Volunteer[];
  totalRegisteredVolunteers: number;
  totalActiveVolunteers: number;

  /* not using team stuff now
     totalTeamAffidavitRecords: number
     totalTeamVoterRecords: number;
     totalTeamAnomalyRecords: number;
     totalTeamAmendmentRecords: number;
     totalTeamNonVoterRecords: number;
     totalTeamRecords: number;
     totalTeamDemographicsRecords: number;
  */

  totalIndividualAnomalyRecords: number;
  totalIndividualRecords: number;
  totalIndividualVoteRecords: number;
  totalIndividualNonVoteRecords: number;
  totalIndividualAffidavitRecords: number
  totalIndividualAmendmentRecords: number;
  totalIndividualDemographicsRecords: number;

  precinctNumber: string;
  initialized: boolean;

  constructor(private navCtrl: NavController, private pollingstationservice: PollingStationServiceProvider, private recordservice: RecordServiceProvider, private volunteerservice: VolunteerServiceProvider, private restSvc: RestServiceProvider, private authSvc: AuthServiceProvider) {
this.pageTitle = "Activity Record";
this.navCtrl = navCtrl;
this.totalIndividualAnomalyRecords = 0;
this.totalIndividualDemographicsRecords = 0;
this.totalIndividualVoteRecords = 0;
this.totalIndividualNonVoteRecords = 0;
this.totalIndividualRecords = 0;

/* Not using team stuff for now 
   this.totalTeamAnomalyRecords = 0;
   this.totalTeamDemographicsRecords = 0;
   this.totalTeamVoterRecords = 0;
   this.totalTeamNonVoterRecords = 0;
   this.totalTeamRecords = 0;
*/

this.initialized = false;

/*
  this.currentVolunteer = 
  {
        "volunteerKey": "v1",
        "fullName":"Janice Row",
        "emailAddress":"janice@gmail.com",
        "exposeEmail": false,
        "phoneNumber":"6025245453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Early Evening, Late Evening",
        "associatedPollingStationKey": "ps2",
        }
*/

this.initializeStuff();

  }

  initializeStuff() {

// if (this.recordservice.getAuthenticatingVolunteerKey() == null) {
//     return;
// }

// this.currentVolunteer = this.volunteerservice.getNewVolunteer();

// if (this.currentVolunteer == null) {
//     // obviously not yet logged in..  exit.
//     return;
// }
// //individual

// var pollingStationKey = this.currentVolunteer.associatedPollingStationKey;
// if (pollingStationKey == null) {
//     return;
// }
// var pollingStation = this.pollingstationservice.getPollingStationbyKey(pollingStationKey);
// if (pollingStation == null) {
//     return;
// }

//       this.precinctNumber = pollingStation.precinctNumber;

//       this.currentTeam = this.volunteerservice.getAssociatedVolunteers();
// // this.volunteerservice.getTeamVolunteersByPollKey(this.currentVolunteer.associatedPollingStationKey);

//       console.log(this.currentTeam);

//       this.totalIndividualAffidavitRecords = this.recordservice.getTotalIndividualAffidavitRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualAnomalyRecords = this.recordservice.getTotalIndividualAnomalyRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualAmendmentRecords = this.recordservice.getTotalIndividualAmendmentRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualVoteRecords = this.recordservice.getTotalIndividualVoteRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualNonVoteRecords = this.recordservice.getTotalIndividualNonVoteRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualDemographicsRecords = this.recordservice.getTotalIndividualDemographicsRecords(/* this.currentVolunteer.volunteerKey */);

//       this.totalIndividualRecords = this.recordservice.getTotalIndividualRecords(/* this.currentVolunteer.volunteerKey */);
      

//       this.volunteerservice.generateStationStats( /* this.currentVolunteer.associatedPollingStationKey */);

//       this.totalRegisteredVolunteers = this.volunteerservice.getVolunteerCount();
// this.totalActiveVolunteers = this.volunteerservice.getVolunteersActive();
      
//       //team  NOT USING Now.
// /* 
//          this.totalTeamAffidavitRecords = this.recordservice.getTotalTeamAffidavitRecords(this.currentTeam);
//          this.totalTeamVoterRecords =  this.recordservice.getTotalTeamVoteRecords(this.currentTeam);
//          this.totalTeamAnomalyRecords  = this.recordservice.getTotalTeamAnomalyRecords(this.currentTeam);
//          this.totalTeamAmendmentRecords = this.recordservice.getTotalTeamAmendmentRecords(this.currentTeam);
//          this.totalTeamNonVoterRecords = this.recordservice.getTotalTeamNonVoteRecords(this.currentTeam); 
//          this.totalTeamDemographicsRecords = this.recordservice.getTotalTeamDemographicsRecords(this.currentTeam);
//          this.totalTeamRecords = this.recordservice.getTotalTeamRecords(this.currentTeam);
// */
// this.initialized = true;
  }

  onRefresh() {
this.initializeStuff();
  }

  onSubmit() {
      var that = this;
      try {
          //that.navCtrl.push(VotePage, {
          //});
      } catch (EE) {
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }
}

