import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
// Services
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@IonicPage()
@Component({
  selector: 'page-sign-in-success',
  templateUrl: 'sign-in-success.html',
})
export class SignInSuccessPage {
  pageTitle: string;
  // volunteerservice: VolunteerServiceProvider;
  volunteerHere: Volunteer;

  constructor(private navCtrl: NavController, public volunteerservice: VolunteerServiceProvider) {
    this.pageTitle = "Democracy Counts";
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;

    // this.volunteerHere = this.volunteerservice.getNewVolunteer();
    // testing
    this.volunteerHere = this.volunteerservice.setToVoidVolunteer();
    
    console.log(this.volunteerservice.getNewVolunteer());
  }

}
