import { Pollingstation } from './../../models/pollingstation';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'pollingstation',
  templateUrl: 'pollingstation.html',
  inputs: ['passedStations', 'pageTitle'],
})

export class PollingstationComponent implements OnInit {

  passedStations: Pollingstation;
  pageTitle: string;

  constructor() {
  }

  ngOnInit() {
    console.log('pageTitle', this.pageTitle)
  }
}

