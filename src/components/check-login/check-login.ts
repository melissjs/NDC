import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationPage } from '../../pages/authentication/authentication';
import { LogInPage } from '../../pages/log-in/log-in';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@Component({
  selector: 'check-login',
  templateUrl: 'check-login.html'
})
export class CheckLoginComponent {


  constructor(private navCtrl: NavController, private restSvc: RestServiceProvider, private recordservice: RecordServiceProvider) {
  }

  onSubmitAuthenticate() {
      var that = this;
      try {
          that.navCtrl.push(AuthenticationPage, {
          })
      } catch (EE) {
          console.log('error in Submitting authentication, exc='+ EE.toString())
      } 
  }

  onSubmitLogin() {
      var that = this;
      try {
          that.navCtrl.push('LogInPage', {
          })
      } catch (EE) {
          console.log('error in Submitting login, exc='+ EE.toString())
      } 
  }
}
