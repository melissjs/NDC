import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
// pipes
// import { SearchPipe } from '../../pipes/search/search';

@Component({
  selector: 'pollingstation',
  templateUrl: 'pollingstation.html',
  inputs: ['passedStations', 'Volunteer'],
  // pipes: [SearchPipe],
})
export class PollingstationComponent {

  text: string;

  constructor() {
    console.log('Hello PollingstationComponent Component');
    this.text = 'Hello World';
  }

}

