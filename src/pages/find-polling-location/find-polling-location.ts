import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pollingstation } from '../../models/pollingstation';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { SearchPipe } from '../../pipes/search/search';
import * as globals from '../../globals';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObj } from '../../models/response-obj';


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
  stations: Pollingstation[];
  selectedStation: Pollingstation;
  searchpipe: SearchPipe;
  pageTitle: string;
  query: string;

    constructor(private navCtrl: NavController, navParams: NavParams, private pollingStationService: PollingStationServiceProvider, private restSvc: RestServiceProvider ) {
      this.pageTitle = "Find Polling Location";
      this.navCtrl = navCtrl;
      // this.stations = 
      pollingStationService.getStations()
          .subscribe(
        (res: ResponseObj) => {
            console.log(res.obj);
            this.stations = res.obj;
        },
        (err: HttpErrorResponse) => {
            console.log(err);
        }
      )
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