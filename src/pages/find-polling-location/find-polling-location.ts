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
})

export class FindPollingLocationPage {
  stations: Pollingstation[];
  searchpipe: SearchPipe;
  pageTitle: string;
  query: string;

  constructor(private navCtrl: NavController, navParams: NavParams, private pollingStationService: PollingStationServiceProvider, private restSvc: RestServiceProvider ) {
    this.pageTitle = "Find Polling Location";
    pollingStationService.getStations()
        .subscribe((res: ResponseObj) => {
          this.stations = res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  showStationDetails(passedStation){
  console.log('selectedStation: ' + passedStation);
  // this.pollingStationService.setStation(passedStation);
    this.navCtrl.push('PollingstationDetailsPage');
  }
  
}