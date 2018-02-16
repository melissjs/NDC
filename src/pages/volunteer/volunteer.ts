import { Election } from './../../models/election';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObj } from './../../models/response-obj';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import * as globals from '../../globals';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ElectionServiceProvider } from '../../providers/election-service/election-service';
import { alertCheckboxObj } from '../../models/alertCheckboxObj';


@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})

export class VolunteerPage implements OnInit {

  pageTitle: string;
  election: Election;
  elections: Election[];
  chosenElectionTitle: string;
  chooseElectionObjArr: alertCheckboxObj[];

  constructor(public authSvc: AuthServiceProvider, private navCtrl: NavController, navParams: NavParams, public restSvc: RestServiceProvider, private alertCtrl: AlertController, private electionSvc: ElectionServiceProvider) {
    this.pageTitle = "Volunteer";
  }

  ngOnInit() {
    if (this.authSvc.isLoggedIn()) {
      this.electionSvc.setElections()
      .subscribe((res: Election[]) => {
        this.elections = res;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      })
    }
    
    this.election = this.electionSvc.getElectionOfInterestId() || undefined;

    if (this.election) {
      this.chosenElectionTitle = this.electionSvc.getElectionFromId(this.election).electionTitle;
    } else {
      this.chosenElectionTitle = "Choose Election";
    }
  }

  onChooseElection() {
    this.chooseElectionObjArr = this.elections.map((election) => {
      return {
        type: 'checkbox',
        label: election.electionTitle,
        name: election.electionTitle,
        id: election._id,
        value: election._id,
        checked: false
      }
    });
    console.log('chooseElectionObjArr', this.chooseElectionObjArr)

    let alert = this.alertCtrl.create({
      title: 'Select Election',
      inputs: this.chooseElectionObjArr,
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
            console.log('alert data', data[0])
            this.electionSvc.setElectionId(data[0]);
            this.election = data;
            this.chosenElectionTitle = this.electionSvc.getElectionFromId(data[0]).electionTitle
          }
        }
      ]
    });
    alert.present();
  }

  
  onRegister(){
    this.navCtrl.push('UnregisteredSignInPage');
  }
  
  onFindPolling(){
    this.navCtrl.push('FindPollingLocationPage');
  }
  
  onAddPolling(){
    this.navCtrl.push('AddPollingLocationPage');
  }

}