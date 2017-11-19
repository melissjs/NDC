import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// Pages
// import {PollingstationdetailsPage} from '../pollingstationdetails/pollingstationdetails';
// import {DuplicatepollingstationPage} from '../duplicatepollingstation/duplicatepollingstation';
// import { UnregisteredsigninPage } from '../unregisteredsignin/unregisteredsignin';
// Models
import { PollingStation } from '../../models/pollingstation';
import { Volunteer} from '../../models/volunteer';
// Services
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
// Globals
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-add-polling-location',
  templateUrl: 'add-polling-location.html',
  // inputs: ['pollingstation', 'volunteer'],
})
export class AddPollingLocationPage {
  pollingStationKey: string;
  newPollingStation: PollingStation;
  // pollingStationService: Pollingstationservice;
  stations: PollingStation[];
  precinctNumber: string;
  streetAddress: string;
  unitNumber: string;
  roomNumber: string;
  city: string;
  state: string;
  zip: number;
  associatedVolunteerList: Volunteer[];
  totalRegisteredVolunteers: number;
  totalNeededVolunteers: number;
  totalRemainingShiftsToFill: number;
  currentVolunteerHere: Volunteer;
  // volunteerservice: Volunteerservice;
  addPollingLocationForm: FormGroup;
  titlec: {page: any, title: string};
      // loggedIn: boolean;
      constructor(private navCtrl: NavController, navParams: NavParams, private alertCtrl: AlertController, 
private pollingStationService: PollingStationServiceProvider, private volunteerservice: VolunteerServiceProvider, public fb: FormBuilder, private restSvc: RestServiceProvider) {
    this.navCtrl = navCtrl;
    this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
    this.restSvc = restSvc;
    this.pollingStationService = pollingStationService;
    this.stations = pollingStationService.getStations();
    this.pollingStationKey = this.pollingStationService.generatePollingStationKey();
    this.precinctNumber = null;
    this.streetAddress = null;
    this.unitNumber = null;
    this.roomNumber = null;
    this.city = null;
    this.zip = null;
    this.associatedVolunteerList = [];
    this.totalRegisteredVolunteers = null;
    this.totalNeededVolunteers = null;
    this.totalRemainingShiftsToFill = null;
    this.volunteerservice = volunteerservice;
          // this.loggedIn = false;
          this.restSvc.getLoggedIn();
  
          this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
  
  
  
  /* old way
     if(volunteerservice.currentVolunteer!==null){
    this.currentVolunteerHere = this.volunteerservice.getNewVolunteer();
     }else{
          this.currentVolunteerHere = {
              volunteerKey: null,
              fullName: null,
              emailAddress: null,
              exposeEmail: false,
              phoneNumber: null,
              age:null,
              sex: null,
              partyAffiliation: null,
              shifts:'', 
              passcode: null,
              associatedPollingStationKey: null, 
              totalRecords:null,
              totalVoteRecords:null,
              totalAnomalyRecords: null,
              totalAmendmentRecords: null,
          }
          volunteerservice.setNewVolunteer(this.currentVolunteerHere);
          console.log(this.currentVolunteerHere); 
  } */
  
  // instantiate blank station
  this.newPollingStation = {
            pollingStationKey: this.pollingStationKey,
            precinctNumber: '',
            streetAddress: '',
            unitNumber: '',
            roomNumber: '',
            city: '',
            state: '',
            zip: null,
  }
  
  
  
     
          //form stuff
          var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
          var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
          var regExAge: string = '[1]*[0-9]?[0-9]';
          var regExLettersOnly: string = '[a-ZA-Z]+';
          var regExNumbersOnly: string = '[0-9]*';
          var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';
  
          this.addPollingLocationForm = fb.group({  
              'enterPrecinctNumber': ['', Validators.compose([Validators.required])],
              'enterStreetAddress': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
              'enterUnitNumber': [''],
              'enterRoomNumber': [''],
              'enterCity': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
              'enterState': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
              'enterZip': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(regExZip)])],
              
  
          });
  
    // constructor end
    }
  
    toTitleCase(str){
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
  
  onChangePrecinctNumber(value){
    //this.precinctNumber = value;
    //console.log('from function: ' + this.precinctNumber);
  }
  
  onChangeStreetAddress(value){
   // this.streetAddress = value;
  }
  
  onChangeUnitNumber(value){
    //this.unitNumber = value;
  }
  
  onChangeRoomNumber(value){
    //this.roomNumber = value;
  }
  
  onChangeCity(value){
   // this.city = value;
  }
  
  onChangeState(value){
   // this.state = value;
  }
  
  onChangeZip(value){
    //this.zip = value;
  }
  
      onRegister(){
          var that = this;
          try {
              that.navCtrl.push('UnregisteredSignInPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
      }
  
  
  // Compare precint number and zip for navigating to duplicate station pages
  onComparePrecintAndZip(){
    if(this.newPollingStation.precinctNumber && this.newPollingStation.zip){
      if(this.pollingStationService.duplicateStationSearch(this.newPollingStation.precinctNumber, this.newPollingStation.zip)){
       // call alert popup
                  return true
    }
    } else {
      return false
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        onSubmit(value: any): void {
  
  
  
          // instantiate new station
  //console.log('from value: ' + value.enterPrecinctNumber);
          this.newPollingStation = {
            pollingStationKey: this.pollingStationKey,
            precinctNumber: value.enterPrecinctNumber,
            streetAddress: this.toTitleCase(value.enterStreetAddress),
            unitNumber: value.enterUnitNumber,
            roomNumber: value.enterRoomNumber,
            city: this.toTitleCase(value.enterCity),
            state: value.enterState.toUpperCase(),
            zip: value.enterZip,
          }
  
       // set station for details pages (MUST NOT ADD TO LIST IF CONFIRMED DUPLICATE)
        this.pollingStationService.setStation(this.newPollingStation);
  
  /*
        //reset form not working so manual reset
        //this.addPollingLocationForm.reset();
          this.addPollingLocationForm = this.fb.group({  
              'enterPrecinctNumber': [''],
              'enterStreetAddress': [''],
              'enterUnitNumber': [''],
              'enterRoomNumber': [''],
              'enterCity': [''],
              'enterState': [''],
              'enterZip': [''],
          });*/
  
          if(this.onComparePrecintAndZip()){
                  try {
                      this.navCtrl.push('DuplicatePollingStationPage');
                  } catch (EE) {
                      console.log('error in Submitting, exc='+ EE.toString())
                  }
          } else {
  
              //console.log('new one: ' + this.newPollingStation.precinctNumber);
        this.restSvc.saveObject('polling-stations',this.pollingStationService.getStation(),true
              ,this.successCb, this.failureCb, this);
           }
        }
  
  
      successCb(that, real, data) {
    // update the polling station info..
    if (real) {
        that.newPollingStation = data;
        that.pollingStationService.setStation(data);
    }
    that.successForward(real);
      }
  
      failureCb(that, errStr) {
          let alert = that.alertCtrl.create({
              title: 'Error Adding Poll Station',
              subTitle: errStr,
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
          },500);
      }
  
      successForward(real:boolean) {
          var subtitle;
          var that = this;
          if (real) {
              subtitle = 'Congratulations you have successfully initiated a new audit! This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.';
          } else {
              subtitle = 'For TESTING PURPOSES, we simulate success here.  You would be told: This polling location has been added to our list and now other volunteers can sign up to work with you here. Please help promote your new audit location and fill the needed shifts.';
              this.stations.push(this.newPollingStation);
  
          }
          let alert = that.alertCtrl.create({
              title: 'Addition Successful',
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
          },500);
          // Send to (polling station details page)
          try {
              that.navCtrl.setRoot('PollingStationDetailsPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
      }
  }
  