import { UserServiceProvider } from './../../providers/user-service/user-service';
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
import * as jwt_decode from 'jwt-decode';

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
    
  constructor(private navCtrl: NavController, private userSvc: UserServiceProvider,  private alertCtrl: AlertController, public fb: FormBuilder, private pollingstationservice: PollingStationServiceProvider, private volSvc: VolunteerServiceProvider, private restSvc: RestServiceProvider, private authSvc: AuthServiceProvider ) {
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
      volunteerKey: '',
      username: this.loginForm.value.enterUsername.toLowerCase(),
      password: this.loginForm.value.enterPassword,
      userRoles: [],
      firstName: '',
      lastName: '',
      emailAddress: '',
      exposeEmail: true,
      phoneNumber: '',
      exposePhoneNumber: true,
      age: null,
      exposeAge: true,
      sex: '',
      exposeSex: true,
      partyAffiliation: '',
      exposePartyAffiliation: true,
      auditKey: '',
      // shifts: []
    }

    this.authSvc.signin(this.newUser)
      .subscribe( 
        (data: ResponseObj) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          let decoded = jwt_decode(data.token);
          console.log('decoded from login:', decoded.user)
          this.newUser.volunteerKey = data.userId;
          this.newUser.userRoles = decoded.user.activeRoles; 
          this.newUser.firstName = decoded.user.firstName;
          this.newUser.lastName = decoded.user.lastName;
          this.newUser.emailAddress = decoded.user.emailAddress;
          this.newUser.exposeEmail = decoded.user.exposeEmail;
          this.newUser.phoneNumber = decoded.user.phoneNumber;
          this.newUser.exposePhoneNumber = decoded.user.exposePhoneNumber;
          this.newUser.age = decoded.user.age;
          this.newUser.exposeAge = decoded.user.exposeAge;
          this.newUser.sex = decoded.user.sex;
          this.newUser.exposeSex = decoded.user.emailAddress;
          this.newUser.partyAffiliation = decoded.user.partyAffiliation;
          this.newUser.exposePartyAffiliation = decoded.user.exposePartyAffiliation;
          // this.newUser.auditKey = decoded.user.auditKey;
          // this.newUser.shifts = decoded.user.shifts;
          console.log('newUser from login:', this.newUser)
          this.userSvc.setUser(this.newUser);
          this.loginStatus.emit(data);
        },
        error => {
          this.loginStatus.emit(error);
        }
      );
  }

  onRegister(): void {
    this.newUser = this.userSvc.getNewUser();
    this.newUser.username = this.loginForm.value.enterUsername.toLowerCase();
    this.newUser.password = this.loginForm.value.enterPassword;
    console.log('fromlogin', this.newUser)
    this.userSvc.setNewUser(this.newUser);
    // this.authSvc.register(this.newUser)
    //   .subscribe( 
    //     data => {
    //       this.navCtrl.setRoot('UnregisteredSignInPage');
    //       console.log(data)
    //     },
    //     error => console.log(error)
    //   );
    // this.navCtrl.push('UnregisteredSignInPage', { user: this.newUser });
    this.navCtrl.push('UnregisteredSignInPage');
  }

}