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
  // enterUsernameCtrl: string;
  // enterFirstNameCtrl: string;
  // enterLastNameCtrl: string;
  // enterEmailAddressCtrl: string;
  // enterExposeEmailCtrl: boolean;
  // enterPhoneNumberCtrl: string;
  // enterExposePhoneNumberCtrl: boolean;
  // enterAgeCtrl: number;
  // enterExposeAgeCtrl: boolean;
  // enterSexCtrl: string;
  // enterExposeSexCtrl: boolean;
  // enterPartyAffiliationCtrl: string;
  // enterOtherPartyAffiliationCtrl: string;
  // enterExposePartyAffiliationCtrl: boolean;
  // enterPassword1Ctrl: string;
  // enterPassword2Ctrl: string;


  constructor(private authSvc: AuthServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestServiceProvider, private volunteerservice: VolunteerServiceProvider) {}

  ngOnInit() {
    console.log('from init', this.newUser)
    this.registerForm = this.fb.group({  
      'enterUsernameCtrl': [this.newUser.username, Validators.compose([Validators.required, Validators.minLength(3)])],
      'enterFirstNameCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterLastNameCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'enterEmailAddressCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      'enterExposeEmailCtrl': [null],
      'enterPhoneNumberCtrl': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      'enterExposePhoneNumberCtrl': [null],
      'enterAgeCtrl': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      'enterExposeAgeCtrl': [null],
      'enterSexCtrl': ['' , Validators.required],
      'enterExposeSexCtrl': [null],
      'enterPartyAffiliationCtrl': ['' , Validators.required],
      'enterExposePartyAffiliationCtrl': [null],
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
    if (value == "Other Party") {
        otherParty.setFocus();
    } else {
        password.setFocus();
    }
  }

  // onChangeExposeEmail(e){ // AFTER TOGGLE REFACTOR AND CTRL NAME LEAVING FOR FYI
  //   console.log('value before:' + this.registerForm.value.enterExposeEmail);
  //     var newval = !this.registerForm.value.enterExposeEmail;
  //     console.log('checked in now:' + newval);
  //     this.enterExposeEmail = newval;
  // }

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

  // presentVerificationInit() {
  //     let alertpvi = this.alertCtrl.create({
  //         title: 'Verify Phone Number',
  //         subTitle: 'How would you like to be sent the code',
  //         buttons: [
  //             {
  //                 text: 'Cancel',
  //                 role: 'cancel',
  //                 handler: data => {
  //                     console.log('Cancel clicked.. nothing to do');
  //                 }
  //             },
  //             {
  //                 text: 'Voice Call',
  //                 handler: data => {
  //                     let navTransition = alertpvi.dismiss();
  //                     this.verifyPhoneNumber('call');
  //                 }
  //             },
  //             {
  //                 text: 'SMS Text',
  //                 handler: data => {
  //                     let navTransition = alertpvi.dismiss();
  //                     this.verifyPhoneNumber('sms');
  //                 }
  //             }
  //         ]
  //     });
  //     //timeout the error to let other modals finish dismissing.
  //     setTimeout(()=>{
  //         alertpvi.present();
  //     },500);
  // }

  onSubmit(): void {

    // CHECK PASSWORDS
    if(this.registerForm.value.enterPassword1Ctrl == this.registerForm.value.enterPassword2Ctrl){
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

    // SET newUser
    this.newUser.firstName = this.toTitleCase(this.registerForm.value.enterFirstNameCtrl);
    this.newUser.lastName = this.toTitleCase(this.registerForm.value.enterLastNameCtrl);
    this.newUser.emailAddress = this.registerForm.value.enterEmailAddressCtrl.toLowerCase();
    this.newUser.exposeEmail = this.registerForm.value.enterExposeEmail;
    this.newUser.phoneNumber = this.registerForm.value.enterPhoneNumberCtrl;
    this.newUser.age = this.registerForm.value.enterAgeCtrl;
    this.newUser.sex = this.registerForm.value.enterSexCtrl;
    // this.newUser.shifts = [''];
    // this.newUser.associatedPollingStationKey = null;

    // SET NEWUSER
    console.log('before', this.newUser);
    this.newUser.username = this.registerForm.value.enterUsernameCtrl.toLowerCase();
    this.newUser.password = this.password;
    console.log('after', this.newUser);
    // this.newUser.volunteerKey = null;

    // CREATE USER AND VOLUNTEER THEN SIGNIN
    this.authSvc.register(this.newUser).subscribe(
      (rData: ResponseObj) => {
        this.authSvc.signin(this.newUser).subscribe(
          (sData: ResponseObj) => {
            localStorage.setItem('token', sData.token);
            localStorage.setItem('userId', sData.userId);
            this.newUser.volunteerKey = sData.userId;
            this.volunteerservice.saveVolunteer(this.newUser).subscribe(
              vData => {
                this.navCtrl.setRoot('HomePage');
              },
              error => {
                console.log('whole error from createVolunteer', error)
                this.errorTitle = error.error.title;
                this.errorMessage = error.error.error.message;
                this.createErrorAlert(this.errorTitle, this.errorMessage);
                this.errorAlert.present();
              }
            );
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

    // ERICS Call
    // this.presentVerificationInit();
      
  }

  //end onsubmit
  
  presentVerificationCheck(subtitle:string) {
      var that = this;
      let alertpvc = this.alertCtrl.create({
          title: 'Verify Code',
          subTitle: subtitle,
          inputs: [
              {
                  name: 'vcode',
                  placeholder: '1234'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                      alertpvc.dismiss();
                      console.log('Cancel clicked.. nothing to do');
                  }
              },
              {
                  text: 'OK',
                  role: 'submit',
                  handler: data => {
                      console.log('data=' + data.vcode);
                      if ((data.vcode != null) &&
                          (data.vcode.match("[0-9]{4}"))) {
                          alertpvc.dismiss();
                          that.verifyCode(data.vcode);
                      } else {
                          alertpvc.dismiss();
                          this.presentVerificationCheck('Invalid Code Entered, Try Again...');
                      }
                  }
              }
          ]
      });
      //timeout the error to let other modals finish dismissing.
      setTimeout(()=>{
          alertpvc.present();
      },500);
  }

  verifyPhoneNumber(via: string) {
      // var that = this;
      // try {
      //     that.restSvc.sendAuthyRequest(via,that.newUser.phoneNumber)
      //         .subscribe( data => {
      //             that.properties = data;
      //             console.log('successful call:' + that.properties);
      //             if (that.properties.success) {
      //                 var csrfToken = data._csrf;
      //                 if (csrfToken != null) {
      //                     that.restSvc.setCsrfToken(csrfToken[0]);
      //                 }
      //                 that.presentVerificationCheck('Enter the 4 digit code');
      //             } else {
      //                 let alert = that.alertCtrl.create({
      //                     title: 'Error Verifying Phone',
      //                     subTitle: that.properties.message,
      //                     buttons: [{
      //                         text: 'OK',
      //                         handler: () => {
      //                             alert.dismiss();
      //                         }
      //                     }]
      //                 });
      //                 //timeout the error to let other modals finish dismissing.
      //                 setTimeout(()=>{
      //                     alert.present();
      //                 },500);
      //             }
      //         }, err => {
      //             console.log('error occurred ' + err.toString());
      //             if ((err.status == 0) ||
      //                 (err.status == 404)) {
      //                 that.properties = "Unknown Error!";
      //                 this.testError();
      //                 return;
      //             } else {
      //                 that.properties = err.toString();
      //             }
      //             // console.log(error.stack());
      //             let alert = that.alertCtrl.create({
      //                 title: 'Error Verifying Phone',
      //                 subTitle: that.properties,
      //                 buttons: [{
      //                     text: 'OK',
      //                     handler: () => {
      //                         alert.dismiss();
      //                     }
      //                 }]
      //             });
      //             //timeout the error to let other modals finish dismissing.
      //             setTimeout(()=>{
      //                 alert.present();
      //             },500);
      //         }, () => {console.log('registration complete')});
      // } catch (err) {
      //     console.error(err);
      //     console.log('error in Submitting, exc='+ err.toString())
      //     let alert2 = that.alertCtrl.create({
      //         title: 'Error Authorizing',
      //         subTitle: 'There was a problem sending '
      //             + 'your token - sorry :(' + err.toString(),
      //         buttons: ['OK']
      //     });
      //     alert2.present();
      // }
      
  }

  verifyCode(code: string) {
  //     var that = this;
  //     try {
  //         that.restSvc.sendAuthyVerify(that.newUser.phoneNumber, code)
  //             .subscribe( data => {
  //                 that.properties = data;
  //                 console.log('successful call:' + that.properties);
  //                 if (that.properties.success) {
  //                     this.sendVerificationEmail();
  //                 } else {
  //                     this.presentVerificationCheck('Incorrect Code Entered, Try Again...');
  //                 }
  //             }, err => {
  //                 console.log('error occurred ' + err.toString());
  //                 if (err.status == 0) {
  //                     that.properties = "Unknown Error!";
  //                 } else {
  //                     that.properties = err.toString();
  //                 }
  //                 // console.log(error.stack());
  //                 let alert = that.alertCtrl.create({
  //                     title: 'Error Verifying Phone',
  //                     subTitle: that.properties,
  //                     buttons: [{
  //                         text: 'OK',
  //                         handler: () => {
  //                             alert.dismiss();
  //                         }
  //                     }]
  //                 });
  //                 //timeout the error to let other modals finish dismissing.
  //                 setTimeout(()=>{
  //                     alert.present();
  //                 },500);
  //             }, () => {console.log('registration complete')});
  //     } catch (err) {
  //         console.error(err);
  //         console.log('error in Submitting, exc='+ err.toString())
  //         let alert2 = that.alertCtrl.create({
  //             title: 'Error Authorizing',
  //             subTitle: 'There was a problem sending '
  //                 + 'your token - sorry :(' + err.toString(),
  //             buttons: ['OK']
  //         });
  //         alert2.present();
  //     }
  }

  successForward(real:boolean) {
      var subtitle;
      var that = this;
      if (real) {
          subtitle = 'You should shortly receive an email.  Please click on the link in the email to verify your email address';
      } else {
          subtitle = 'For TESTING PURPOSES, we simulate success here.  You would expect to receive an email.  and be told to Please click on the link in the email to verify your email address';
          //generate key for new volunteer
          // In TEST mode, we keep the old code which "generates" a volunteer
          // key for us, in the case of the "real" version, the database will
          // use the key generated by the middle tier and emailed for
          // "activation" of the account.  In that case we proceed from the
          // "activate" page.
          // this.newUser.volunteerKey = this.volunteerservice.generateVolunteerKey();
          // this.volunteerservice.addCurrentVolunteerToList(this.newUser);
      }
      let alert = that.alertCtrl.create({
          title: 'Verification Successful',
          /* subTitle: 'Congratulations you have successfully registered to become an auditor! Thank you for your participation. Now Please read the next page and choose your polling location and shift(s).', */
          subTitle: subtitle,
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
      },500);
      // Send to login page
      // CHANGING THIS BECAUSE EMAIL LINK TAKES HERE _ THIS WONT WORK UNTIL EMAIL IS SENT
     //that.navCtrl.setRoot(LoginPage);
      that.navCtrl.setRoot('SuccessSplashPage');
  }

  testError() {
      // Only happens when we don't actually have a real server to talk to..
      this.successForward(false);
  }

  sendVerificationEmail() {
  //     var that = this;
  //     try {
  //         that.restSvc.registerUser(that.newUser, that.password)
  //             .subscribe( (data) => {
  //                 that.properties = data;
  //                 // Expect response created here...
  //                 if (data.status == 201) {
  //                     console.log('successful call:' + that.properties);
  //                     this.successForward(true);
  //                 } else {
  //                     // ?? shouldn't happen ??
  //                     console.log('UNKNOWN STATUS:' + that.properties);
  //                     this.successForward(true);              
  //                 }
  //             } , err => {
  //                 console.log('error occurred ' + err.toString());
  //                 if (err.status == 400) {
  //                     that.properties = err._body // toString();
  //                 } else {
  //                     that.properties = err.toString();
  //                 }
  //                 // console.log(error.stack());
  //                 let alert = that.alertCtrl.create({
  //                     title: 'Error Registering Account',
  //                     subTitle: that.properties,
  //                     buttons: [{
  //                         text: 'OK',
  //                         handler: () => {
  //                             alert.dismiss();
  //                         }
  //                     }]
  //                 }
  //                 );
  //                 //timeout the error to let other modals finish dismissing.
  //                 setTimeout(()=>{
  //                     alert.present();
  //                 },500);
  //             }, () => {console.log('registration(register) complete')}
  //             );
  //     } catch (err) {
  //         console.error(err);
  //         console.log('error in Submitting, exc='+ err.toString())
  //         let alert2 = that.alertCtrl.create({
  //             title: 'Error Authorizing',
  //             subTitle: 'There was a problem sending '
  //                 + 'your token - sorry :(' + err.toString(),
  //             buttons: ['OK']
  //         });
  //         alert2.present();
  //     }
  }

}
/* Thank you for registering to volunteer on election day! Now all you need to do is find a polling location near you and sign up for one or more shifts. 
   */ 




//function toTitleCase(str)
//{
//    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//}
