import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pollingstation } from '../../models/pollingstation';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
//import { Pollingstationdetailscomponent } from '../pollingstationdetailscomponent/pollingstationdetailscomponent';
// interfaces
import { Volunteer} from '../../models/volunteer'; 
// Services
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
// pipes
import { SearchPipe } from '../../pipes/search/search';
// Globals
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-find-polling-location',
  templateUrl: 'find-polling-location.html',
  // inputs: ['pollingstation', 'volunteer'],
  // pipes: [Searchpipe],
  // //providers: [Searchpipe],
  // directives: [PollingstationComponent]
})
export class FindPollingLocationPage {
  currentVolunteer: Volunteer; 
  stations: Observable<Object>;
  selectedStation: Pollingstation;
  searchpipe: SearchPipe;
  pageTitle: string;

    constructor(private navCtrl: NavController, navParams: NavParams, private pollingStationService: PollingStationServiceProvider, private restSvc: RestServiceProvider ) {
  this.pageTitle = "Find Polling Location";
  this.navCtrl = navCtrl;
  this.stations = pollingStationService.getStations();
  this.pollingStationService = pollingStationService;
  this.restSvc.getLatestPollStations();
  console.log('pollingstation=' + this.pollingStationService);
  console.log('stations=' + this.stations);  
  //this.searchpipe = searchpipe;
  // console.log('searchpipe=' + this.searchpipe);  
  }


  showStationDetails(variablePassedFromItem){


  this.selectedStation = variablePassedFromItem;
  console.log('selectedStation'+ this.selectedStation);
  this.pollingStationService.setStation(this.selectedStation);
  // this.pollingStationService.printSelectedStation();
      try {
          this.navCtrl.push('PollingStationDetailsPage');
      } catch (EE) {
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }
  
}