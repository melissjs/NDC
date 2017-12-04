import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
// import { CheckLogin } from '../../components/check-login/check-login';

@IonicPage()
@Component({
  selector: 'page-volunteer-list',
  templateUrl: 'volunteer-list.html',
  // directives: [CheckLogin],
})
export class VolunteerListPage {
  pageTitle: string;
  currentVolunteer: Volunteer; 
  currentTeam: Volunteer[]; 
  initialized: boolean;

  constructor(private navCtrl: NavController, private volunteerservice: VolunteerServiceProvider, 
  private restSvc: RestServiceProvider, private recordservice: RecordServiceProvider) {
    this.pageTitle = "Volunteer List";
    // this.navCtrl = navCtrl;
    // true for testing
    this.initialized = false;
    this.initializeStuff();
  }

initializeStuff() {
//   if (this.recordservice.getAuthenticatingVolunteerKey() == null) {
//     return;
// }

// this.currentVolunteer = this.volunteerservice.getNewVolunteer();

// if (this.currentVolunteer == null) {
//     // obviously not yet logged in..  exit.
//     return;
// }

// this.currentTeam = this.volunteerservice.getAssociatedVolunteers();
// this.initialized = true;
  }

  onRefresh() {
    this.initializeStuff();
  }

}
