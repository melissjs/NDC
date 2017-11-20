import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollingStation } from '../../models/pollingstation';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';
// interfaces
import { Volunteer} from '../../models/volunteer'; 
// Services
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
// Globals
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-duplicate-polling-station',
  templateUrl: 'duplicate-polling-station.html',
  // inputs: ['pollingstation', 'volunteer'],
  // directives: [PollingstationComponent]
})
export class DuplicatePollingStationPage {

  // pollingStationService: PollingStationServiceProvider;
  alertMsg: string;
  alertMsgHeading: string;
  selectedStation: PollingStation;

  constructor(private navCtrl: NavController, navParams: NavParams, private pollingStationService: PollingStationServiceProvider, private restSvc: RestServiceProvider) {
  this.navCtrl = navCtrl;
  // this.pollingStationService = pollingStationService;
  

  if (this.pollingStationService.matchingPrecinctAndZipList.length>1){
  this.alertMsg = "Possible duplicates are already in the station list. To avoid confusion, please do not add a duplicate of the same exact polling location. Do you still wish to add your station to the list?";
  this.alertMsgHeading = "Existing Stations";
} else {
  this.alertMsg = "A possible duplicate location was found already in the list. To avoid confusion, please do not add a duplicate of the same exact polling location. Do you still wish to add your station to the list?";
  this.alertMsgHeading = "Existing Station";
}
  }

onCancel(){
   console.log('cancel');
this.pollingStationService.duplicateYesOrNo = false;
this.pollingStationService.matchingPrecinctAndZipList = [];
//this.pollingStationService.selectedStation = null;
// zero out selectedStation
    var station = {
          pollingStationKey: '',
          precinctNumber: '',
          streetAddress: '',
          unitNumber: '',
          roomNumber: '',
          city: '',
          state: '',
          zip: null,
    };

    this.pollingStationService.setStation(station);
    try {
        this.navCtrl.setRoot('FindPollingLocationPage');
    } catch (EE) {
        console.log('error in Submitting, exc='+ EE.toString())
    }
}

onAdd(){

    this.pollingStationService.duplicateYesOrNo = false;
    this.pollingStationService.matchingPrecinctAndZipList = [];

    this.restSvc.saveObject('polling-stations',this.pollingStationService.getStation(),true
			    ,this.successCb, this.failureCb, this);

}

    successCb(that, real, data) {
	// update the polling station info..
	if (real) {
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


            this.pollingStationService.addPollingStations(this.pollingStationService.getStation());

        }
        this.alertMsg = subtitle;
        this.alertMsgHeading = 'Addition Successful';

        // Send to polling station details page
        try {
            that.navCtrl.setRoot('PollingStationDetailsPage');
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }

    }



showStationDetails(item){
    this.selectedStation = item;
  console.log('selectedStation'+ this.selectedStation);
  this.pollingStationService.setStation(this.selectedStation);
  this.pollingStationService.printSelectedStation();
  var that = this;
         try {
            
                this.navCtrl.push('PollingStationDetailsPage');
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
  
    }
}



}