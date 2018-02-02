import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User} from '../../models/user';
import { ResponseObj} from '../../models/response-obj';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import * as globals from '../../globals';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html',
  inputs: ['newUser'],
})

export class UserProfileComponent implements OnInit {

  newUser: User;
  volunteerKey: string;
  errorTitle: string;
  errorAlert: any;
  errorMessage: string;
  formErrorText: string;
  registerForm: FormGroup;
  sex: string;
  party: string;
  password: string;
  exposeEmail: boolean;
  exposePhoneNumber: boolean;
  exposeAge: boolean;
  exposeSex: boolean;
  exposePartyAffiliation: boolean;

  constructor(private authSvc: AuthServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestServiceProvider, private volunteerservice: VolunteerServiceProvider) {
    this.exposeEmail = true;
    this.exposePhoneNumber = true;
    this.exposeAge = true;
    this.exposeSex = true;
    this.exposePartyAffiliation = true;
  }

  ngOnInit() {
    console.log('from init', this.newUser)
    this.registerForm = this.fb.group({  
      'enterUsernameCtrl': [this.newUser.username, Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterFirstNameCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterLastNameCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterEmailAddressCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      // 'enterExposeEmailCtrl': [null],
      'enterPhoneNumberCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      // 'enterExposePhoneNumberCtrl': [null],
      'enterAgeCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      // 'enterExposeAgeCtrl': [null],
      'enterSexCtrl': ['' , Validators.required],
      // 'enterExposeSexCtrl': [null],
      'enterPartyAffiliationCtrl': ['' , Validators.required],
      // 'enterExposePartyAffiliationCtrl': [null],
      'enterOtherPartyAffiliationCtrl':[''],
      'enterPassword1Ctrl': [this.newUser.password, Validators.compose([Validators.required, Validators.minLength(8)])],
      'enterPassword2Ctrl': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  // HELPER FUNCTIONS

  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  createErrorAlert(title: string, message: string) {
    this.errorAlert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: this.errorMessage,
      buttons: ['Dismiss']
    });
  }

  // SETTING FOCUS NOT WORKING

  onDirtySex(partyAffiliation){
    partyAffiliation.setFocus();
}

  onChangePartyAffiliationFromList(value, otherParty, password){
    this.party = value;
    if (value === "Other Party") {
        otherParty.setFocus();
    } else {
        otherParty = null;
        password.setFocus();
    }
  }

  // onDirtyUsername() {
  //   if (this.registerForm.value.enterUsernameCtrl.length < 3) {
  //     this.formErrorText = 'ERROR: Username must be at least 3 characters';
  //   } else {
  //     this.formErrorText = null;
  //     this.formErrorText += "Username must be at least three characters";
  //     // this.enterUsernameCtrl = this.registerForm.value.enterUsernameCtrl.toLowerCase();
  //   }
  // }

  // onDirtyPassword() {
  //   if (this.registerForm.value.enterPassword.length < 8) {
  //     this.errorMessage = 'ERROR: Password is less than 8 characters';
  //   } else {
  //     this.errorMessage = null;
  //     this.enterPassword1Ctrl = this.registerForm.value.enterPassword1;
  //   }
  // }

  onSubmit(): void {
    // CHECK PASSWORDS
    if(this.registerForm.value.enterPassword1Ctrl === this.registerForm.value.enterPassword2Ctrl){
      this.password = this.registerForm.value.enterPassword1Ctrl;
    } else {
        let passwordAlert = this.alertCtrl.create({
          title: 'Passwords do not match',
          subTitle: 'Please re-enter your passwords.',
          buttons: ['OK'] 
        });
        passwordAlert.present();
        return;
    }
    // CHECK PARTY
    if (this.party!="Other Party"){
      this.newUser.partyAffiliation = this.party;
    } else if (this.party=="Other Party" && this.registerForm.value.enterOtherPartyAffiliationCtrl) {
      this.newUser.partyAffiliation = this.toTitleCase(this.registerForm.value.enterOtherPartyAffiliationCtrl);
    }

    // SET NEWUSER
    this.newUser.username = this.registerForm.value.enterUsernameCtrl.toLowerCase();
    this.newUser.firstName = this.toTitleCase(this.registerForm.value.enterFirstNameCtrl);
    this.newUser.lastName = this.toTitleCase(this.registerForm.value.enterLastNameCtrl);
    // this.newUser.userRoles = 
    this.newUser.emailAddress = this.registerForm.value.enterEmailAddressCtrl.toLowerCase();
    this.newUser.exposeEmail = this.exposeEmail;
    this.newUser.phoneNumber = this.registerForm.value.enterPhoneNumberCtrl;
    this.newUser.exposePhoneNumber = this.exposePhoneNumber;
    this.newUser.age = this.registerForm.value.enterAgeCtrl;
    this.newUser.exposeAge = this.exposeAge;
    this.newUser.sex = this.registerForm.value.enterSexCtrl;
    this.newUser.exposeSex = this.exposeSex;
    this.newUser.exposePartyAffiliation = this.exposePartyAffiliation;
    this.newUser.password = this.password;
    console.log('after', this.newUser);

    // CREATE USER THEN SIGNIN
    this.authSvc.register(this.newUser).subscribe(
      (rData: ResponseObj) => {
        this.authSvc.signin(this.newUser).subscribe(
          (sData: ResponseObj) => {
            localStorage.setItem('token', sData.token);
            localStorage.setItem('userId', sData.userId);
            this.newUser.volunteerKey = sData.userId;
            this.navCtrl.setRoot('HomePage');
            // this.volunteerservice.saveVolunteer(this.newUser).subscribe(
            //   vData => {
            //     this.navCtrl.setRoot('HomePage');
            //   },
            //   error => {
            //     console.log('whole error from createVolunteer', error)
            //     this.errorTitle = error.error.title;
            //     this.errorMessage = error.error.error.message;
            //     this.createErrorAlert(this.errorTitle, this.errorMessage);
            //     this.errorAlert.present();
            //   }
            // );
          },
          error => {
            console.log('whole error from userSignIn', error)
            console.log(error.error.error)
            this.errorTitle = error.error.title;
            this.errorMessage = error.error.error.message;
            this.createErrorAlert(this.errorTitle, this.errorMessage);
            this.errorAlert.present();
          }
        );
      },
      error => {
        console.log('whole error from userRegister', error)
        // console.log('should be 11000', error.error.error.code)
        if (error.error.error.code){
          if (error.error.error.code == 11000) {
            // this.errorTitle = error.error.title;
            // this.errorMessage = error.error.error.errors.username.message;
            this.errorTitle = 'Username is already in use';
            this.errorMessage = 'Please select another username';
            this.createErrorAlert(this.errorTitle, this.errorMessage);
            this.errorAlert.present();
          } else {
            console.log('uncaught with multiple errors', error.error.error.errors);
          }
        } else {
          console.log(error.error.error)
          this.errorTitle = error.error.title;
          this.errorMessage = error.error.error.message;
          this.createErrorAlert(this.errorTitle, this.errorMessage);
          this.errorAlert.present();
        }
      }
    );
  }

}
