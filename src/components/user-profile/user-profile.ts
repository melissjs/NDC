import { UserServiceProvider } from './../../providers/user-service/user-service';
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
  inputs: ['pageTitle'],
})

export class UserProfileComponent implements OnInit {

  user: User;
  pageTitle: string;
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

  constructor(private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestServiceProvider, private volunteerservice: VolunteerServiceProvider) {
  }

  ngOnInit() {
    if (this.pageTitle === 'Register') {
      // console.log('hiiiiiiii', this.userSvc.getNewUser())
      this.user = this.userSvc.getUser();
      this.exposeEmail = true;
      this.exposePhoneNumber = true;
      this.exposeAge = true;
      this.exposeSex = true;
      this.exposePartyAffiliation = true;
    }
    else if (this.authSvc.isLoggedIn() && this.pageTitle === 'Account Settings') {
      this.user = this.userSvc.getUser(); 
      this.exposeEmail = this.user.exposeEmail;
      this.exposePhoneNumber = this.user.exposePhoneNumber;
      this.exposeAge = this.user.exposeAge;
      this.exposeSex = this.user.exposeSex;
      this.exposePartyAffiliation = this.user.exposePartyAffiliation;
    }
    // console.log('from init', this.user)
    // console.log('from init', this.pageTitle)
    this.registerForm = this.fb.group({  
      'enterUsernameCtrl': [this.user.username, Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterFirstNameCtrl': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterLastNameCtrl': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterEmailAddressCtrl': [this.user.emailAddress, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      // 'enterExposeEmailCtrl': [null],
      'enterPhoneNumberCtrl': [this.user.phoneNumber, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      // 'enterExposePhoneNumberCtrl': [null],
      'enterAgeCtrl': [this.user.age, Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      // 'enterExposeAgeCtrl': [null],
      'enterSexCtrl': [this.user.sex, Validators.required],
      // 'enterExposeSexCtrl': [null],
      'enterPartyAffiliationCtrl': [this.user.partyAffiliation, Validators.required],
      // 'enterExposePartyAffiliationCtrl': [null],
      'enterOtherPartyAffiliationCtrl':[''],
      'enterPassword1Ctrl': [this.user.password, Validators.compose([Validators.required, Validators.minLength(8)])],
      'enterPassword2Ctrl': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
        console.log('this.registerForm.value', this.registerForm.valid)

  }

  isValid() {
    console.log('this.registerForm.valuekkkkkkkkkk', this.registerForm.valid)
    console.log('this.registerForm.valuekkkkkkkkkk', this.registerForm.value)
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
    if (value === "other") {
        otherParty.setFocus();
    } else {
        otherParty = null;
        password.setFocus();
    }
  }

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
    if (this.party!="other"){
      this.user.partyAffiliation = this.party;
    } else if (this.party=="other" && this.registerForm.value.enterOtherPartyAffiliationCtrl) {
      this.user.partyAffiliation = this.toTitleCase(this.registerForm.value.enterOtherPartyAffiliationCtrl);
    }

    // SET user
    this.user.username = this.registerForm.value.enterUsernameCtrl.toLowerCase();
    this.user.firstName = this.toTitleCase(this.registerForm.value.enterFirstNameCtrl);
    this.user.lastName = this.toTitleCase(this.registerForm.value.enterLastNameCtrl);
    // this.user.userRoles = 
    this.user.emailAddress = this.registerForm.value.enterEmailAddressCtrl.toLowerCase();
    this.user.exposeEmail = this.exposeEmail;
    this.user.phoneNumber = this.registerForm.value.enterPhoneNumberCtrl;
    this.user.exposePhoneNumber = this.exposePhoneNumber;
    this.user.age = this.registerForm.value.enterAgeCtrl;
    this.user.exposeAge = this.exposeAge;
    this.user.sex = this.registerForm.value.enterSexCtrl;
    this.user.exposeSex = this.exposeSex;
    this.user.exposePartyAffiliation = this.exposePartyAffiliation;
    this.user.password = this.password;
    console.log('after', this.user);

    // CREATE USER THEN SIGNIN
    this.authSvc.register(this.user).subscribe(
      (rData: ResponseObj) => {
        this.authSvc.signin(this.user).subscribe(
          (sData: ResponseObj) => {
            localStorage.setItem('token', sData.token);
            localStorage.setItem('userId', sData.userId);
            this.user.volunteerKey = sData.userId;
            this.userSvc.setUser(this.user);
            this.navCtrl.setRoot('HomePage');
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
