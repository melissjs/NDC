import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteer} from '../../models/volunteer';
import { ResponseObj} from '../../models/response-obj';
import { User} from '../../models/user';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../../providers/polling-station-service/polling-station-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import * as globals from '../../globals';


@Component({
  selector: 'log-or-sign-in',
  templateUrl: 'log-or-sign-in.html',
  outputs: ['loginStatus']
  // inputs: ['Volunteer']
})

export class LogOrSignInComponent {

  loginStatus: EventEmitter<any>
  loginForm: FormGroup;
  newUser: User;
  volunteerHere: Volunteer;
  loggedIn: boolean;
  errorMessage: string;
  enterUsername: string;
  enterPassword: string;
  authenticatingVolunteerPhone: string;
  authenticatingVolunteerPasscode: string;
    
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private pollingstationservice: PollingStationServiceProvider, private volSvc: VolunteerServiceProvider, private restSvc: RestServiceProvider, private authSvc: AuthServiceProvider ) {
    this.loginStatus = new EventEmitter<any>();
    this.loggedIn = false;
    this.loginForm = fb.group({  
      'enterUsername': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onDirtyUsername() {
    if (this.loginForm.value.enterUsername.length < 3) {
      this.errorMessage = 'ERROR: Username must be at least 3 characters';
    } else {
      this.errorMessage = null;
      this.enterUsername = this.loginForm.value.enterUsername.toLowerCase();
    }
  }

  onDirtyPassword() {
    if (this.loginForm.value.enterPassword.length < 8) {
      this.errorMessage = 'ERROR: Password is less than 8 characters';
    } else {
      this.errorMessage = null;
      this.enterPassword = this.loginForm.value.enterPassword;
    }
  }

  onLogin(): void {
    this.newUser = {
      username: this.loginForm.value.enterUsername.toLowerCase(),
      password: this.loginForm.value.enterPassword,
      userRoles: ['user'],
      volunteerKey: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      exposeEmail: false,
      exposePhoneNumber: false,
      age: null,
      sex: '',
      partyAffiliation: '',
    }

    this.authSvc.signin(this.newUser)
      .subscribe( 
        (data: ResponseObj) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.loginStatus.emit(data);
        },
        error => {
          this.loginStatus.emit(error);
        }
      );
  }

  onRegister(): void {
    this.newUser = {
      username: this.loginForm.value.enterUsername.toLowerCase(),
      password: this.loginForm.value.enterPassword,
      userRoles: ['user'],
      volunteerKey: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      exposeEmail: false,
      exposePhoneNumber: false,
      age: null,
      sex: '',
      partyAffiliation: '',
    }
    // this.authSvc.register(this.newUser)
    //   .subscribe( 
    //     data => {
    //       this.navCtrl.setRoot('UnregisteredSignInPage');
    //       console.log(data)
    //     },
    //     error => console.log(error)
    //   );
    this.navCtrl.push('UnregisteredSignInPage', { user: this.newUser });
  }

}