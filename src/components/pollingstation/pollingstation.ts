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

  constructor() {
  }

  ngOnInit() {
    console.log('pageTitle', this.pageTitle)
  }
}

