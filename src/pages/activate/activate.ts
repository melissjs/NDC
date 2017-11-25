import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {LogInPage} from '../loginpage/loginpage';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
// Globals
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {
  pageTitle: string;  
  key: string;
  stat: number;
  errString: string;

  constructor(private navCtrl: NavController, public params: NavParams, public restSvc: RestServiceProvider) {
      this.pageTitle = "Activate";
      this.key = this.params.get('key');
      this.stat = 0;
      this.errString = null;
      var that = this;
      console.log('key = ' + this.key);
      that.restSvc.sendActivation(this.key)
        .subscribe( data => {
            console.log('successful call:' + data);
            // https://stackoverflow.com/questions/40097820/property-does-not-exist-on-type-object-observable-subscribe
            // if (data.status == 200) {
              if (data['status'] == 200) {
                that.stat = 1;
            } else {
                // ?? shouldn't happen ??
                console.log('UNKNOWN STATUS:' + data);
            }
        }, err => {
            console.log('error occurred ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                that.stat = 2; // "Unknown Error!";
                // fake success
            } else if (err.status == 500) {
                that.stat = 3; // definite error
                that.errString = err._body // toString();
            } else {
                that.stat = 3; // definite error
                that.errString = err.toString() + err._body;
            }
        }, () => {console.log('activate complete')});
  }

  onSubmit() {
      try {
          this.navCtrl.setRoot('LogInPage');
      } catch (EE) { 
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }
}