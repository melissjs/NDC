import { PollingStationServiceProvider } from './../../providers/polling-station-service/polling-station-service';
import { Pollingstation } from './../../models/pollingstation';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'pollingstation',
  templateUrl: 'pollingstation.html',
  inputs: ['passedStation', 'pageTitle'],
})

export class PollingstationComponent implements OnInit {

  passedStation: Pollingstation;
  pageTitle: string;

  constructor(private pollingStationService: PollingStationServiceProvider) {
  }

  ngOnInit() {
    this.passedStation = this.passedStation || this.pollingStationService.getStationOfInterest() ||this.pollingStationService.getStation();
    console.log('this.pollingStationService.getStationOfInterest();', this.pollingStationService.getStationOfInterest())
    console.log('pageTitle', this.pageTitle)
  }
}

