import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import {VotePage} from '../vote/vote';

@Component({
  selector: 'los',
  templateUrl: 'los.html',
  //inputs: ['LOSanswer']
})
export class LosComponent {

  text: string;

  constructor() {
    console.log('Hello LosComponent Component');
    this.text = 'Hello World';
  }

}
