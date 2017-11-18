import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Volunteer} from '../../models/volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { AccountSettingsPage } from '../../pages/account-settings/account-settings';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html'
  // inputs: ['Volunteer']
})

export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  regExPassword: string;
  // volunteerservice: VolunteerServiceProvider;
  volunteerHere: Volunteer;
  errorText: string;
  
    constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private volunteerservice: VolunteerServiceProvider, private restSvc: RestServiceProvider) {
   this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;
    this.volunteerHere = this.volunteerservice.getNewVolunteer();
    //this.errorText = '';
    //this.regExPassword = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
    //Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExPhone)
    this.changePasswordForm = fb.group({  
              'enterCreatePasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
              'enterConfirmPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
          });
    }
  
    onSubmit(value: any): void { 
        // if(value.enterCreatePasscode == value.enterConfirmPasscode){
        //     console.log(value.enterCreatePasscode);
        //     var that = this;
        //     try {
        //     that.restSvc.changePassword(value.enterCreatePasscode)
        //         .subscribe( (data) => {
        //             // that.properties = data;
        //             // Expect response created here...
        //             if (data.status == 200) {
        //                 console.log('successful call:' + data);
        //                 this.successChange(true);
        //                 return;
        //             } else {
        //                 // ?? shouldn't happen ??
        //                 console.log('UNKNOWN STATUS:' + data);
        //                 this.errorText = 'Unknown Error occurred attempting to change password';
        //             }
        //         } , err => {
        //             console.log('error occurred ' + err.toString());
        //             var subtitle;
        //             if ((err.status == 0) ||
        //                 (err.status == 404)) {
        //                 this.successChange(false);
        //                 // fake success
        //             } else if (err.status == 400) {
        //                 that.errorText = err._body; // toString();
        //             } else if (err.status == 401) {
        //                 // Actual error (most likely bad password)
        //                 if (err._body) {
        //                     var jsonobj = JSON.parse(err._body);
        //                     that.errorText = jsonobj.message;
        //                 } else {
        //                     that.errorText = err.toString();
        //                 }
        //             } else {
        //                 that.errorText = err.toString() + ':' + err._body;
        //             }
        //         }, () => {console.log('password change init complete');
        //                   if (this.errorText == null) {
        //                       // Initiate update of CSRF and change internal passcode
        //                       this.restSvc.initIonic(true,null);
        //                   }
        //                  }
        //                   );
        //     } catch (err) {
        //         console.error(err);
        //         console.log('error in Submitting, exc='+ err.toString());
        //         this.errorText = err.toString();
        //     }
        // } else if (value.enterCreatePasscode !== value.enterConfirmPasscode){
        //     this.errorText = 'Passwords do not match.'
        // } 
    }
  
      successChange(real:boolean) {
          var that = this;
          if (!real) {
              // console.log(error.stack());
              let alert = that.alertCtrl.create({
                  title: 'TEST MODE: Simulating Changing Password',
                  subTitle: 'This simulates the change password logic',
                  buttons: [{
                      text: 'OK',
                      handler: () => {
                          alert.dismiss();
                      }
                  }]
              });
              //timeout the error to let other modals finish dismissing.
              setTimeout(()=>{
                  this.restSvc.initIonic(true,null);
                  alert.present();
              },250);
          }
          try {
              this.navCtrl.setRoot('AccountSettingsPage', {
              });
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
              
          }
      }
  }         