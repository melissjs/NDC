import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
// import { EndPage } from '../end/end';
// import {Recordservice} from '../../providers/recordservice/recordservice';
// import {CheckLogin } from '../../components/check-login/check-login';

@Component({
  selector: 'page-evening-check-out',
  templateUrl: 'evening-check-out.html',
  // directives: [CheckLogin],  
})
export class EveningCheckOutPage {


  constructor(private navCtrl: NavController, private recordservice: RecordServiceProvider) {
  }

  onSubmit() {
      var that = this;

// that.recordservice.onLogout(this,this.displayError, this.successLogout);

  }

  displayError(that:any,text: string,subtitle: string) {
      that.errorMessage = text + ':' + subtitle;
  }

  successLogout(that: any, real:boolean) {
      try {
          that.navCtrl.setRoot('EndPage', {
          })
      } catch (EE) {
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }


}

