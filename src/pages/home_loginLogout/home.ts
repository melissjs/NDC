import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
// import {QuestionsPage} from '../questions/questions';
// import {UserDataService} from '../../user-data-service';
import { Volunteer} from '../../models/volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
//import { AccountsettingsPage } from '../accountsettings/accountsettings';
//import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { LogInPage } from '../log-in/log-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //  userDataSvc: UserDataService;
      errorMessage: string;
  
    constructor(public navCtrl: NavController, navParams: NavParams,
            private restSvc: RestServiceProvider, private recordservice: RecordServiceProvider) {
  
        this.navCtrl = navCtrl;
        this.errorMessage = null;
        //  this.loggedIn = this.restSvc.getLoggedIn();
        // console.log(this.loggedIn);
        /* 
        this.userDataSvc = userDataSvc; // navParams.get('userDataSvc');
        if (this.userDataSvc) {
            this.userDataSvc.setupFirebase();
        } */
    }
  
      onLoginClick(){
    var that = this;
    try {
              console.log('about to setroot login component...');
              that.navCtrl.push(LogInPage);
    } catch (EE) { 
              console.log('error in Submitting, exc='+ EE.toString())
    }
      }  
  
      onLogout() {
    // this.recordservice.onLogout(this,this.displayError,null);
      }
  
      displayError(that:any,text: string,subtitle: string) {
          that.errorMessage = text + ':' + subtitle;
      }
  
  /*
      onSubmit() {
          var that = this;
          try {
              that.navCtrl.push(QuestionsPage, {
      userDataSvc: this.userDataSvc
              });
  
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
          }
      }*/
      
  
      
  }
  