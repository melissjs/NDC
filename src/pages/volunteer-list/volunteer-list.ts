import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

// import { CheckLogin } from '../../components/check-login/check-login';

@IonicPage()
@Component({
  selector: 'page-volunteer-list',
  templateUrl: 'volunteer-list.html',
  // directives: [CheckLogin],
})

export class VolunteerListPage implements OnInit {
  
  pageTitle: string;
  currentVolunteer: Volunteer; 

  constructor(private navCtrl: NavController, private volunteerservice: VolunteerServiceProvider, 
  private restSvc: RestServiceProvider, private recordservice: RecordServiceProvider, public authSvc: AuthServiceProvider, private userSvc: UserServiceProvider) {
    this.pageTitle = "Volunteer List";
  }

  ngOnInit() {
    this.currentVolunteer = this.userSvc.getUser();
  }

}
