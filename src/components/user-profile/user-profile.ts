import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteer} from '../../models/volunteer';
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
  //providers: [RestService]
})

export class UserProfileComponent implements OnInit {

  newUser: User;
  newVolunteer: Volunteer;
  volunteerKey: string;
  errorTitle: string;
  errorAlert: any;
  errorMessage: string;
  registerForm: FormGroup;
  enterUsername: string;
  enterFirstName: string;
  enterLastName: string;
  enterEmailAddress: string;
  enterExposeEmail: boolean;
  enterPhoneNumber: string;
  enterAge: number;
  enterSex: string;
  enterPartyAffiliation: string;
  enterShifts: string;
  enterPasscode: string;
  enterPasscode1: string;
  enterPasscode2: string;
  enterTotalRecords: number;
  enterTotalVoteRecords: number;
  enterTotalAnomalyRecords: number;
  enterTotalAmendmentRecords: number;
  enterPartyAffiliationFromList: string;
  enterOtherPartyAffiliation: string;
  // party: string;
  // volunteers: Volunteer[];
  // dbSex: string;
  // dbPartyAffiliation: string;
  // properties: any;

  constructor(private authSvc: AuthServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestServiceProvider, private volunteerservice: VolunteerServiceProvider) {
    this.newVolunteer = this.volunteerservice.voidVolunteer();
    this.enterExposeEmail = false;
  }

  ngOnInit() {
    console.log('from init', this.newUser)
    // this.newUser = this.navParams.get('newUser') || (this.authSvc.voidUser());
    this.registerForm = this.fb.group({  
      'enterUsername': [this.newUser.username, Validators.compose([Validators.required])],
      'enterFirstName': ['', Validators.compose([Validators.required])],
      'enterLastName': ['', Validators.compose([Validators.required])],
      'enterEmailAddress': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXEMAIL)])],
      'enterExposeEmailCtrl': [null],// had '' then i put false? https://forum.ionicframework.com/t/checkbox-validation/55400/8
      'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(globals.REGEXPHONE)])],
      'enterAge': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(globals.REGEXAGE)])],
      'sexCtrl': ['' , Validators.required],
      'partyAffiliationCtrl': ['' , Validators.required],
      // 'otherPartyAffiliationCtrl': [this.currentTempVolunteer.partyAffiliation],
      //'shiftsCtrl': [this.newVolunteer.shifts],
      'enterOtherPartyAffiliation':[''],
      'enterPasscode1': [this.newUser.password, Validators.compose([Validators.required, Validators.minLength(8)])],
      'enterPasscode2': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  onChangePartyAffiliationFromList(value, otherParty, passcode){
      this.enterPartyAffiliationFromList = value;
      if (value == "Other Party") {
          otherParty.setFocus();
      } else {
          passcode.setFocus();
      }
  }

  onChangeExposeEmail(e){
    console.log('value before:' + this.enterExposeEmail);
      var newval = !this.enterExposeEmail;
      console.log('checked in now:' + newval);
      this.enterExposeEmail = newval;
  }

  createErrorAlert(title: string, message: string) {
    this.errorAlert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: this.errorMessage,
      buttons: ['Dismiss']
    });
  }

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
    if(this.registerForm.value.enterPasscode1 == this.registerForm.value.enterPasscode2){
        this.enterPasscode = this.registerForm.value.enterPasscode1;
    } else {
        let passwordAlert = this.alertCtrl.create({
          title: 'Passwords do not match',
          subTitle: 'Please re-enter your passcodes.',
          buttons: ['OK'] 
        });
        passwordAlert.present();
        return;
    }

    // CHECK PARTY
    if (this.enterPartyAffiliationFromList!="Other Party"){
      this.newVolunteer.partyAffiliation = this.enterPartyAffiliationFromList;
    } else if (this.enterPartyAffiliationFromList=="Other Party" && this.registerForm.value.enterOtherPartyAffiliation) {
      this.newVolunteer.partyAffiliation = this.toTitleCase(this.registerForm.value.enterOtherPartyAffiliation);
    }

    // SET NEWVOLUNTEER
    this.newVolunteer.firstName = this.toTitleCase(this.registerForm.value.enterFirstName);
    this.newVolunteer.lastName = this.toTitleCase(this.registerForm.value.enterLastName);
    this.newVolunteer.emailAddress = this.registerForm.value.enterEmailAddress.toLowerCase();
    this.newVolunteer.exposeEmail = this.enterExposeEmail;
    this.newVolunteer.phoneNumber = this.registerForm.value.enterPhoneNumber;
    this.newVolunteer.age = this.registerForm.value.enterAge;
    this.newVolunteer.sex = this.enterSex;
    this.newVolunteer.shifts = [''];
    this.newVolunteer.associatedPollingStationKey = null;

    // SET NEWUSER
    console.log('before', this.newUser);
    // this.newUser.username = this.registerForm.value.enterUsername;
    this.newUser.username = undefined;
    this.newUser.password = this.enterPasscode;
    console.log('after', this.newUser);
    // this.newUser.volunteerKey = null;

    // CREATE USER AND VOLUNTEER THEN SIGNIN
    this.authSvc.register(this.newUser).subscribe(
      (rData: ResponseObj) => {
        this.authSvc.signin(this.newUser).subscribe(
          (sData: ResponseObj) => {
            localStorage.setItem('token', sData.token);
            localStorage.setItem('userId', sData.userId);
            this.newVolunteer.volunteerKey = sData.userId;
            this.volunteerservice.saveVolunteer(this.newVolunteer).subscribe(
              vData => {
                this.navCtrl.setRoot('HomePage');
              },
              error => {
                console.log(error.error.error)
                this.errorTitle = error.error.title;
                this.errorMessage = error.error.error.message;
                this.createErrorAlert(this.errorTitle, this.errorMessage);
                this.errorAlert.present();
              }
            );
          },
          error => {
            console.log(error.error.error)
            this.errorTitle = error.error.title;
            this.errorMessage = error.error.error.message;
            this.createErrorAlert(this.errorTitle, this.errorMessage);
            this.errorAlert.present();
          }
        );
      },
      error => {
        console.log(error.error.error)
        this.errorTitle = error.error.title;
        this.errorMessage = error.error.error.message;
        this.createErrorAlert(this.errorTitle, this.errorMessage);
        this.errorAlert.present();
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
      //     that.restSvc.sendAuthyRequest(via,that.newVolunteer.phoneNumber)
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
  //         that.restSvc.sendAuthyVerify(that.newVolunteer.phoneNumber, code)
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
          // this.newVolunteer.volunteerKey = this.volunteerservice.generateVolunteerKey();
          this.volunteerservice.addCurrentVolunteerToList(this.newVolunteer);
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
  //         that.restSvc.registerUser(that.newVolunteer, that.enterPasscode)
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
