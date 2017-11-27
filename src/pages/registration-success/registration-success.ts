import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {FindpollinglocationPage} from '../findpollinglocation/findpollinglocation';
// import {AddpollinglocationPage} from '../addpollinglocation/addpollinglocation';
//Globals
import * as globals from '../../globals';

@IonicPage()
@Component({
  selector: 'page-registration-success',
  templateUrl: 'registration-success.html',
})
export class RegistrationSuccessPage {

  pageTitle: string;  
  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.pageTitle = "Registration Success";
  }
  
      onFindPolling(){
          var that = this;
          try {
                  that.navCtrl.push('FindpollinglocationPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
  }
  
  onAddPolling(){
  var that = this;
          try {
              
                  that.navCtrl.push('AddpollinglocationPage');
              
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
  }
  
  }