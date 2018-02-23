import { ResponseObj } from './../../models/response-obj';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pollingstation } from '../../models/pollingstation';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { SearchPipe } from '../../pipes/search/search';
import { SortPipe } from '../../pipes/sort/sort';
import * as globals from '../../globals';
import { HttpErrorResponse } from '@angular/common/http';
// import { AsyncPipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-find-polling-location',
  templateUrl: 'find-polling-location.html',
})

export class FindPollingLocationPage implements OnInit {
  stations: Pollingstation[];
  searchpipe: SearchPipe;
  sortpipe: SortPipe;
  pageTitle: string;
  query: string;

  constructor(private navCtrl: NavController, navParams: NavParams, private pollingstationSvc: PollingStationServiceProvider, private restSvc: RestServiceProvider ) {
    this.pageTitle = "Find Polling Location";
  }

  ngOnInit() {
    if (false){ //this.pollingstationSvc.activeCache()
      this.stations = this.pollingstationSvc.getStations();
    }
    else {
      this.pollingstationSvc.setStations()
      .subscribe((res: Pollingstation[]) => {
        console.log('res', res)
        this.stations = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

  showStationDetails(passedStation){
    this.pollingstationSvc.setStationOfInterest(passedStation);
    this.navCtrl.push('PollingstationDetailsPage');
  }
  
}