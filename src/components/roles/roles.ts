import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'roles',
  templateUrl: 'roles.html'
})
export class RolesComponent {

  roles: string[];

  constructor(private userSvc: UserServiceProvider, private alertCtrl: AlertController, private navCtrl: NavController) {
    this.roles = this.userSvc.getUser().userRoles;
  }

  addRole() {
    this.navCtrl.push('RequestRolePage');
  }

  onInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'Did I request a volunteer role?',
      subTitle: 'Any role other than user implies volunteer status in our database. You are not assigned to any actual individual volunteering position from this role.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
