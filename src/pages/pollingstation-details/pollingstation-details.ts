import { AuditServiceProvider } from './../../providers/audit-service/audit-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PollingstationComponent } from '../../components/pollingstation/pollingstation';
import { Volunteer} from '../../models/volunteer';
import { Pollingstation } from '../../models/pollingstation';
import * as globals from '../../globals';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-pollingstation-details',
  templateUrl: 'pollingstation-details.html',
})

export class PollingstationDetailsPage {

  pageTitle: string;
  user: User; 
  stations: Pollingstation[];
  currentStation: Pollingstation;

  constructor(private navCtrl: NavController, private navParams: NavParams, public pollingStationService: PollingStationServiceProvider, private userSvc: UserServiceProvider, public authSvc: AuthServiceProvider, private alertCtrl: AlertController, public restSvc: RestServiceProvider, public auditSvc: AuditServiceProvider) {
    this.pageTitle = "Polling Station Details";
    this.user = this.userSvc.getUser();
    this.currentStation = this.pollingStationService.getStation();
  }

}