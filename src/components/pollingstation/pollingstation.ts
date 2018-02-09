import { Pollingstation } from './../../models/pollingstation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';

@Component({
  selector: 'pollingstation',
  templateUrl: 'pollingstation.html',
  inputs: ['passedStations', 'Volunteer'],
})

export class PollingstationComponent {

  passedStations: Pollingstation[];

  constructor() {
  }

}

