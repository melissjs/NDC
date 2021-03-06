import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import {OvrComponent} from '../../components/ovr/ovr';
import { VoteRecord } from '../../models/vote-record';
import { OfficeVoteRecord } from '../../models/office-vote-record';
import { Volunteer } from '../../models/volunteer';
import { ElectOfficeGUI } from '../../models/elect-office-gui';
import { PRIMARYPRES } from '../../candidates/p-pres-list';
import {PRIMARYCONGRESS} from '../../candidates/p-congress-list';
import {PRESIDENT} from '../../candidates/pres-list';

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
  // directives: [OvrComponent],
})
export class VotePage {
  pageTitle: string;
  generalCastBy: string;
  primaryLocation: string;
  primaryCastBy: string;

  firstPresVote: string;
  secondPresVote: string;
  thirdPresVote: string;
  newVoteRecord: VoteRecord;
  gePresOfficeVoteRecord: OfficeVoteRecord;
  pPresOfficeVoteRecord: OfficeVoteRecord;
  pCongOfficeVoteRecord: OfficeVoteRecord;
  firstPresVoteWriteIn: string;
  secondPresVoteWriteIn: string;
  thirdPresVoteWriteIn: string;

  reasonForCouldNotVoteGeneral: string;
  otherReasonForCouldNotVoteGeneral: string;
  reasonForCouldNotVotePrimary: string;
  otherReasonForCouldNotVotePrimary: string;
  
  //volunteerservice: Volunteerservice;
  //recordservice: Recordservice;
  //pollingstationservice: Pollingstationservice;

  inFlorida: boolean;
  PRESIDENT: ElectOfficeGUI;
  PRIMARYCONGRESS: ElectOfficeGUI;
  PRIMARYPRES: ElectOfficeGUI;
  //currentVolunteer: Volunteer;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
              private pollingstationservice: PollingStationServiceProvider,
              private volunteerservice: VolunteerServiceProvider,
              public recordservice: RecordServiceProvider, private restSvc: RestServiceProvider) {

      //testing
      this.pageTitle = "Step 2: Vote";
      this.PRESIDENT = PRESIDENT;
      this.PRIMARYCONGRESS = PRIMARYCONGRESS;
      this.PRIMARYPRES = PRIMARYPRES;
      this.navCtrl = navCtrl;
      this.generalCastBy = null;
      this.primaryCastBy = null;
      this.primaryLocation = null;
      this.firstPresVote = null;
      this.secondPresVote = null;
      this.thirdPresVote = null;
      this.reasonForCouldNotVoteGeneral = null;
      this.otherReasonForCouldNotVoteGeneral = null;
      this.reasonForCouldNotVotePrimary = null;
      this.otherReasonForCouldNotVotePrimary = null;
      // this.volunteerservice = volunteerservice;
      // this.recordservice = recordservice;
      this.newVoteRecord = this.recordservice.createVoidVoteRecord();
      this.firstPresVoteWriteIn = null;
      this.secondPresVoteWriteIn = null;
      this.thirdPresVoteWriteIn = null;
      // this.pollingstationservice = pollingstationservice;
      // this.inFlorida = this.pollingstationservice.isThisInState('FL');
      // console.log(this.inFlorida);
      // console.log(this.pollingstationservice.selectedStationXX.state);
     
      this.restSvc.getObjectsByField('elect-offices','electOfficeKey','2016 General Election Presidential'
                                     ,this.successElectOfficePresCb, this.failureElectOfficePresCb, this);
      this.restSvc.getObjectsByField('candidates','electOfficeKey','2016 General Election Presidential'
                                     ,this.successCandsPresCb, this.failureCandsPresCb, this);

      this.restSvc.getObjectsByField('elect-offices','electOfficeKey','2016 Primary President'
                                     ,this.successElectOfficePrimPresCb, this.failureElectOfficePrimPresCb, this);
      this.restSvc.getObjectsByField('candidates','electOfficeKey','2016 Primary President'
                                     ,this.successCandsPrimPresCb, this.failureCandsPrimPresCb, this);


      this.restSvc.getObjectsByField('elect-offices','electOfficeKey','2016 Congress Primary'
                                     ,this.successElectOfficePrimCongCb, this.failureElectOfficePrimCongCb, this);
      this.restSvc.getObjectsByField('candidates','electOfficeKey','2016 Congress Primary'
                                     ,this.successCandsPrimCongCb, this.failureCandsPrimCongCb, this);

  }

  successElectOfficePresCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRESIDENT.inner = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureElectOfficePresCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

  successElectOfficePrimPresCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRIMARYPRES.inner = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureElectOfficePrimPresCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

  successElectOfficePrimCongCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRIMARYCONGRESS.inner = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureElectOfficePrimCongCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

  successCandsPresCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRESIDENT.candidates = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureCandsPresCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

  successCandsPrimPresCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRIMARYPRES.candidates = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureCandsPrimPresCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

  successCandsPrimCongCb(that, real, data) {
      if (real) {
          if (data && data.length > 0) {
              // leave alone if no data came in
              that.PRIMARYCONGRESS.candidates = data;
          }
      } else {
          // If fake.. just keep using the fake data...
      }
  }

  failureCandsPrimCongCb(that, errStr) {
      // Error retrieving the candidates data from the database.. (keep using fake data?)
      console.log('Error seen in callback ' + errStr);
  }

// General

    onChangeReasonForCouldNotVoteGeneral(reason){
        this.reasonForCouldNotVoteGeneral = reason;
    }

    onChangeOtherReasonForCouldNotVotePGE(reason){
    this.otherReasonForCouldNotVoteGeneral = reason,
    this.reasonForCouldNotVoteGeneral = this.otherReasonForCouldNotVoteGeneral;
    }

     onChangeGeneralCastBy(value){
      this.generalCastBy = value;
 }



 // Primary

      onChangePrimarySuccess(primarySuccess){
          console.log("psuccess being called");
      if (primarySuccess=='didVote'){
          this.recordservice.setPrimarySuccess(true);
          this.recordservice.setPrimaryIntention(false);
          console.log("psuccess" + this.recordservice.getPrimarySuccess());
      } else if(primarySuccess=='couldNotVote'){
          this.recordservice.setPrimaryIntention(true);
          this.recordservice.setPrimarySuccess(false);
      } else if(primarySuccess=='didNotVote'){
          this.recordservice.setPrimarySuccess(false);
          this.recordservice.setPrimaryIntention(false);
      }
      }


    onChangePrimaryLocation(passedPrimaryLocation){
        this.primaryLocation = passedPrimaryLocation;

    }

    onChangeReasonForCouldNotVotePrimary(passedReasonForCouldNotVotePrimary){
        this.reasonForCouldNotVotePrimary = passedReasonForCouldNotVotePrimary;
    }

   onChangeOtherReasonForCouldNotVotePrimary(passedOtherReasonForCouldNotVotePrimary){
       this.otherReasonForCouldNotVotePrimary = passedOtherReasonForCouldNotVotePrimary;
    }

     onChangePrimaryCastBy(value){
      this.primaryCastBy = value;
      console.log(this.primaryCastBy);
   }

 // Ranking

      onChangeFirstPresVote(value){
      this.firstPresVote = value;
 }

      onChangeFirstPresVoteWriteIn(passedFirstPresVoteWriteIn){
      this.firstPresVoteWriteIn = passedFirstPresVoteWriteIn;

      //if(this.firstPresVote=="writeIn" && passedFirstPresVoteWriteIn){
      //this.firstPresVote = passedFirstPresVoteWriteIn;
      //}
 }

        onChangeSecondPresVote(value){
      this.secondPresVote = value;
 }

      onChangeSecondPresVoteWriteIn(passedSecondPresVoteWriteIn){
      this.secondPresVoteWriteIn = passedSecondPresVoteWriteIn;

      //if(this.secondPresVote=="writeIn" && passedSecondPresVoteWriteIn){
      //this.secondPresVote = passedSecondPresVoteWriteIn;
      //}
 }

        onChangeThirdPresVote(value){
      this.thirdPresVote = value;
 }

      onChangeThirdPresVoteWriteIn(passedThirdPresVoteWriteIn){
      this.thirdPresVoteWriteIn = passedThirdPresVoteWriteIn;

      //if(this.thirdPresVote=="writeIn" && passedThirdPresVoteWriteIn){
      //this.thirdPresVote = passedThirdPresVoteWriteIn;
      //}
 }

  onSubmit() {
     var that = this;
      try {
          
          var minimum_msg = 'Please specify how you cast your vote AND select the presidential candidate you voted for today, everything else on this page is optional.';
          var title = null;
          var subtitle = null;
          if (!this.recordservice.getNonVoteBool()) {
              // Voter code-block....
              if (this.generalCastBy == null) {
                  title = 'Selection Required';
                  subtitle = minimum_msg;
              }
          } else {
              // NON Voter code-block...
              if (this.reasonForCouldNotVoteGeneral == null) {
                  title = 'Selection Required';
                  subtitle = 'Please indicate the reason you could not vote today and who you intended to vote for, everything else on this page is optional.';
              } else if (this.reasonForCouldNotVoteGeneral == 'otherReasonForCouldNotVotePGE' && !this.otherReasonForCouldNotVoteGeneral) {
                  title = 'Write In Required';
                  subtitle = 'Please write in reason for not being able to vote in the general election.';
              }
          } 
          if (title != null) {
              let alert = this.alertCtrl.create({
                  title: title,
                  subTitle: subtitle,
                  buttons: ['OK']
              });
              alert.present();
              return;
          }

          // logic for write ins other issues...
          var mandatory_exists = !this.recordservice.getNonVoteBool();
          subtitle = this.recordservice.checkFieldsForErrors(mandatory_exists,minimum_msg);
          if (subtitle) {
              let alert = this.alertCtrl.create({
                  title: 'Election Choices Missing',
                  subTitle: subtitle,
                  buttons: ['OK']
              });
              alert.present();
              return;
          }

          if (this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary' && !this.otherReasonForCouldNotVotePrimary){
              let alert = this.alertCtrl.create({
                  title: 'Write In Required',
                  subTitle: 'Please write in reason for not being able to vote in the primary election.',
                  buttons: ['OK']
              });
              alert.present();
              return;
          } 

          if (this.recordservice.getPrimaryIntention()==false) {
              this.reasonForCouldNotVotePrimary = null;
          }

          if (this.recordservice.getPrimaryIntention() && this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary' && this.otherReasonForCouldNotVotePrimary){
              this.reasonForCouldNotVotePrimary = this.otherReasonForCouldNotVotePrimary;
          }

          if (this.firstPresVote=='writeIn' && !this.firstPresVoteWriteIn){
              let alert = this.alertCtrl.create({
                  //title: 'Please write in Primary Presidential Vote.',
                  subTitle: 'Please Write in First Choice Presidential Vote.',
                  buttons: ['OK']
              });
              alert.present();
              return;
          } 

          if (this.secondPresVote=='writeIn' && !this.secondPresVoteWriteIn){
              let alert = this.alertCtrl.create({
                  //title: 'Please write in Primary Presidential Vote.',
                  subTitle: 'Please Write in Second Choice Presidential Vote.',
                  buttons: ['OK']
              });
              alert.present();
              return;
          }

          if (this.thirdPresVote=='writeIn' && !this.thirdPresVoteWriteIn){
              let alert = this.alertCtrl.create({
                  //title: 'Please write in Primary Presidential Vote.',
                  subTitle: 'Please Write in Third Choice Presidential Vote.',
                  buttons: ['OK']
              });
              alert.present();
              return;
          }

          // put in

          if (this.firstPresVote=='writeIn' && this.firstPresVoteWriteIn){
              this.firstPresVote = this.firstPresVoteWriteIn;
          }

          if (this.secondPresVote=='writeIn' && this.secondPresVoteWriteIn){
              this.secondPresVote = this.secondPresVoteWriteIn;
          }

          if (this.thirdPresVote=='writeIn' && this.thirdPresVoteWriteIn){
              this.thirdPresVote = this.thirdPresVoteWriteIn;
          }

          this.recordservice.generateVoteRecordKey();

          // fill object
          this.newVoteRecord = {
              voteRecordKey: this.recordservice.getVoteRecordKey(),
              volunteerKey: this.volunteerservice.getNewVolunteerKey(),
              generalSuccess: !this.recordservice.getNonVoteBool(),
              generalCouldNotVoteReason:  this.reasonForCouldNotVoteGeneral,
              generalCastBy:  this.generalCastBy,
              primarySuccess: this.recordservice.getPrimarySuccess(),
              primaryCouldNotVoteReason: this.reasonForCouldNotVotePrimary,
              primaryCastBy: this.primaryCastBy,
              primaryVotePollingLocation: this.primaryLocation, 
              presFirst: this.firstPresVote,
              presSecond: this.secondPresVote,
              presThird: this.thirdPresVote,
          }

          console.log(this.newVoteRecord );
          this.recordservice.addVoteRecordToList(this.newVoteRecord);
          console.log(this.recordservice.getVoteList());

          // check if ovr is filled enough to send, then push to list from recordservice
          this.recordservice.addEligibleOVRRecordsToList();
          this.recordservice.setPrimarySuccess(null);  
          this.recordservice.setPrimaryIntention(false);    

          that.navCtrl.setRoot(DemographicsPage, {
          });

      } catch (EE) {
          let alert = this.alertCtrl.create({
              title: 'error in Submitting',
              subTitle: EE.toString(),
              buttons: ['OK']
          });
          alert.present();
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }

}
