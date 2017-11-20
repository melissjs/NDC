import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChangePasswordComponent } from '../../components/change-password/change-password';
import { Volunteer} from '../../models/volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { LoginPage } from '../loginpage/loginpage';
import { RestServiceProvider} from '../../providers/rest-service/rest-service';
import * as globals from '../../globals';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetForm: FormGroup;
  resetWithCodeForm: FormGroup;
  regExPassword: string;
  regExEmail: string;
  errorText: string;
  loggedIn: boolean;
  emailWasSent: boolean;
  errorTextEmail: string;
  key: string;
      titlec: {page: any, title: string};
  
    constructor(private navCtrl: NavController, private alertCtrl: AlertController, public params: NavParams, public fb: FormBuilder, private restSvc: RestServiceProvider) {
    if (this.params != null) {
        this.key = this.params.get('key');
    } else {
        this.key = null;
    }
    this.navCtrl = navCtrl;
    this.restSvc = restSvc;
    this.loggedIn = false;
    this.emailWasSent = false;
  
        this.titlec = { page: params.get("menupg"), title: globals.RESETPWDTITLE };
  
    this.regExEmail = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
  
    this.resetForm = fb.group({  
              'enterEmailAddress': ['', Validators.compose([Validators.required, Validators.pattern(this.regExEmail)])]
  
          });
  
  
            this.resetWithCodeForm = fb.group({  
              'enterCreatePasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
              'enterConfirmPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
          });
    }
    
    onSubmitEmailOnly(value: any): void {
  
        var that = this;
        try {
            that.restSvc.resetPasswordInit(value.enterEmailAddress.toLowerCase())
                .subscribe( (data) => {
                    // that.properties = data;
                    // Expect response created here...
                    if (data.status == 200) {
                        console.log('successful call:' + data);
                        this.successResetInit(true);
                        return;
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.errorTextEmail = 'Unknown Error occurred attempting to reset password';
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    var subtitle;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        this.successResetInit(false);
                        // fake success
                    } else if (err.status == 400) {
                        that.errorTextEmail = err._body; // toString();
                    } else if (err.status == 401) {
                        // Actual error (most likely bad password)
                        if (err._body) {
                            var jsonobj = JSON.parse(err._body);
                            that.errorTextEmail = jsonobj.message;
                        } else {
                            that.errorTextEmail = err.toString();
                        }
                    } else {
                        that.errorTextEmail = err.toString() + ':' + err._body;
                    }
                }, () => {console.log('password reset init complete')}
                          );
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString());
            this.errorTextEmail = err.toString();
        }
    }
  
      successResetInit(real:boolean) {
          var that = this;
          if (!real) {
              // console.log(error.stack());
              let alert = that.alertCtrl.create({
                  title: 'TEST MODE: Simulating Resetting Password',
                  subTitle: 'This simulates the reset password init logic',
                  buttons: [{
                      text: 'OK',
                      handler: () => {
                          alert.dismiss();
                      }
                  }]
              });
              //timeout the error to let other modals finish dismissing.
              setTimeout(()=>{
                  alert.present();
              },250);
          }
          this.emailWasSent = true;
      }
  
  onSubmitCodes(value: any): void {
      if(value.enterCreatePasscode !== value.enterConfirmPasscode){
          this.errorText = 'Passwords do not match.'
          return;
      } 
      var that = this;
      try {
            that.restSvc.resetPasswordFinish(this.key,value.enterConfirmPasscode)
                .subscribe( data => {
                    // that.properties = data;
                    // Expect response created here...
                    if (data.status == 200) {
                        console.log('successful call:' + data);
                        this.successResetFinish(true);
                        return;
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.errorText = 'Unknown Error occurred attempting to reset password';
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    var subtitle;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        this.successResetFinish(false);
                        // fake success
                    } else if (err.status == 400) {
                        that.errorText = err._body; // toString();
                    } else if (err.status == 401) {
                        // Actual error (most likely bad password)
                        if (err._body) {
                            var jsonobj = JSON.parse(err._body);
                            that.errorText = jsonobj.message;
                        } else {
                            that.errorText = err.toString();
                        }
                    } else {
                        that.errorText = err.toString() + ':' + err._body;
                    }
                }, () => {console.log('password reset finish complete')}
                          );
      } catch (err) {
          console.error(err);
          console.log('error in Submitting, exc='+ err.toString());
          this.errorText = err.toString();
      }
  }
  
      successResetFinish(real:boolean) {
          var that = this;
          if (!real) {
              // console.log(error.stack());
              let alert = that.alertCtrl.create({
                  title: 'TEST MODE: Simulating Resetting Password',
                  subTitle: 'This simulates the reset password finish logic',
                  buttons: [{
                      text: 'OK',
                      handler: () => {
                          alert.dismiss();
                      }
                  }]
              });
              //timeout the error to let other modals finish dismissing.
              setTimeout(()=>{
                  alert.present();
              },250);
          }
          try {
              this.navCtrl.setRoot('LoginPage');
          } catch (EE) {
              console.log('error in Submitting, exc='+ EE.toString())
              console.log(EE.stack);
          }
      }
  }