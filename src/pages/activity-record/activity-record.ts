import { Auditor } from './../../models/auditor';
import { HttpErrorResponse } from '@angular/common/http';
import { Audit } from './../../models/audit';
import { Pollingstation } from './../../models/pollingstation';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
//import { Team } from '../../team';
//import {VotePage} from '../vote/vote';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user';
import { AuditServiceProvider } from '../../providers/audit-service/audit-service';
// import {CheckLogin } from '../../components/check-login/check-login';

@IonicPage()
@Component({
  selector: 'page-activity-record',
  templateUrl: 'activity-record.html',
  // directives: [CheckLogin],
})

export class ActivityRecordPage implements OnInit {

  pageTitle: string;
  currentVolunteer: User; 
  pollingstation: Pollingstation;
  audit: Audit;
  currentTeam: Auditor[];
  totalRegisteredVolunteers: number;
  totalActiveVolunteers: number;

  totalTeamAffidavitRecords: number
  totalTeamVoterRecords: number;
  totalTeamAnomalyRecords: number;
  totalTeamAmendmentRecords: number;
  totalTeamNonVoterRecords: number;
  totalTeamRecords: number;
  totalTeamDemographicsRecords: number;


  totalIndividualAnomalyRecords: number;
  totalIndividualRecords: number;
  totalIndividualVoteRecords: number;
  totalIndividualNonVoteRecords: number;
  totalIndividualAffidavitRecords: number
  totalIndividualAmendmentRecords: number;
  totalIndividualDemographicsRecords: number;

  // precinctNumber: string;
  // initialized: boolean;

  constructor(private navCtrl: NavController, public pollingstationservice: PollingStationServiceProvider, private recordservice: RecordServiceProvider, private volunteerservice: VolunteerServiceProvider, private restSvc: RestServiceProvider, public authSvc: AuthServiceProvider, public userSvc: UserServiceProvider, private auditSvc: AuditServiceProvider) {
    this.pageTitle = "Activity Record";
    this.navCtrl = navCtrl;
    this.totalIndividualAnomalyRecords = 0;
    this.totalIndividualDemographicsRecords = 0;
    this.totalIndividualVoteRecords = 0;
    this.totalIndividualNonVoteRecords = 0;
    this.totalIndividualRecords = 0;

    this.totalTeamAnomalyRecords = 0;
    this.totalTeamDemographicsRecords = 0;
    this.totalTeamVoterRecords = 0;
    this.totalTeamNonVoterRecords = 0;
    this.totalTeamRecords = 0;


// this.initialized = false;

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

  ngOnInit() {
    // user
    this.currentVolunteer = this.userSvc.getUser();
    //audit and team
    this.audit = this.auditSvc.getAudit();
    if (this.audit) {
      //station
      this.pollingstation = this.pollingstationservice.getUsersPollingstation();
      if (!this.pollingstation) {
        this.pollingstationservice.sgetUsersPollingStationByKey(this.audit.pollingstationId)
        .subscribe(res => {
          this.pollingstation = res;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        })
      }
    }
    else if (!this.audit) {
      this.auditSvc.sgetAudit(this.currentVolunteer.volunteerKey)
      .subscribe(res => {
        this.audit = res.obj;
        if (this.audit){
          this.currentTeam = this.audit.team;
        };
        //station
        this.pollingstation = this.pollingstationservice.getUsersPollingstation();
        if (!this.pollingstation) {
          this.pollingstationservice.sgetUsersPollingStationByKey(this.audit.pollingstationId)
          .subscribe(res => {
            this.pollingstation = res;
          },
          (err: HttpErrorResponse) => {
            console.error(err);
          })
        }
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      })
    }
  }

  onRefresh() {
    this.initializeStuff();
  }

}

