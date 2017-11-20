import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
// import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
// import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})
export class VolunteerPage {

  titlec: {page: any, title: string};
  
      constructor(private navCtrl: NavController, navParams: NavParams, private restSvc: RestServiceProvider) {
  
    this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
    this.navCtrl = navCtrl;
    this.restSvc = restSvc;
      }
  
      onRegister(){
          var that = this;
          try {
              that.navCtrl.push('UnregisteredSignInPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
      }
  
  onFindPolling(){
  var that = this;
          try {
              that.navCtrl.push('FindPollingLocationPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
  }
  
  onAddPolling(){
  var that = this;
          try {
              
                  that.navCtrl.push('AddPollingLocationPage');
              
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
  }
  
  
  
  }