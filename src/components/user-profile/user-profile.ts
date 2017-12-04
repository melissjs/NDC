import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { LoginPage } from '../loginpage/loginpage';
// import { SuccessSplashPage } from '../../pages/success-splash/success-splash';
import { Volunteer} from '../../models/volunteer';
// Services
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
// Globals
import * as globals from '../../globals';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html',
  //providers: [RestService]
})
export class UserProfileComponent {
  newVolunteer: Volunteer;
  volunteerKey: string;
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
  // volunteerservice: Volunteerservice;
  party: string;
  volunteers: Volunteer[];
  registerForm: FormGroup;
  dbSex: string;
  dbPartyAffiliation: string;
  properties: any;

  constructor(private navCtrl: NavController, navParams: NavParams, 
              private alertCtrl: AlertController, public fb: FormBuilder, 
              private restSvc: RestServiceProvider, private volunteerservice: VolunteerServiceProvider) {
      // this.navCtrl = navCtrl;
      this.newVolunteer = null;
      this.volunteerKey = null;
      this.enterFirstName = null;
      this. enterLastName = null;
      this.enterEmailAddress = null;
      this.enterExposeEmail = false;
      this.enterPhoneNumber = null;
      this.enterAge = null;
      this.enterSex = null;
      this.enterPartyAffiliation = null;
      this.enterPartyAffiliationFromList = null;
      this.enterShifts = '';
      this.enterPasscode = null;
      this.enterPasscode1 = null;
      this.enterPasscode2 = null;
      this.enterTotalRecords = null;
      this.enterTotalVoteRecords = null;
      this.enterTotalAnomalyRecords = null;
      this.enterTotalAmendmentRecords = null;
      this.enterOtherPartyAffiliation = null;
      // this.volunteerservice = volunteerservice;
      // this.restSvc = restSvc;
      this.properties = null;

      this.registerForm = fb.group({  
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
          'enterPasscode1': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
          'enterPasscode2': ['', Validators.compose([Validators.required, Validators.minLength(8)])]

      });

      //ATTEMP TO FIX PROBLEM
      this.newVolunteer = {
          volunteerKey: null,
          firstName: null,
          lastName: null,
          emailAddress: null,
          exposeEmail: false,
          phoneNumber: null,
          age:null,
          sex: null,
          partyAffiliation: null,
          shifts:[''], 
          associatedPollingStationKey:null
      }
  }

  onChangeFirstName(value){
      this.enterFirstName = value;
  }

  onChangeLastName(value){
    this.enterLastName = value;
}

  onChangeEmail(value){
      this.enterEmailAddress = value;

  }

  /*
    askToExposeEmail(){
    
    let confirm = this.alertCtrl.create({
    title: 'Would you like to expose your email address to your team?',
    message: 'This will help you organize with each other before and on election day. You can change this setting later in your account.',
    buttons: [
    {
    text: 'No',
    handler: () => {
    this.enterExposeEmail = false;
    console.log('Disagree clicked');
    }
    },
    {
    text: 'Yes',
    handler: () => {
    this.enterExposeEmail = true;
    console.log('Agree clicked' + this.enterExposeEmail);
    
    }
    }
    ]
    });
    confirm.present();
    
    
    }
  */

  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  // onChangeExposeEmail(value){
  //   console.log('value before' + value);
  //     var newval = !value;
  //     console.log('checked in now:' + newval);
  //     this.enterExposeEmail = newval;
  // }

  onChangeExposeEmail(e){
    console.log('value before:' + this.enterExposeEmail);
      var newval = !this.enterExposeEmail;
      console.log('checked in now:' + newval);
      this.enterExposeEmail = newval;
  }

  onChangePhoneNumber(value){
      this.enterPhoneNumber = value;
  }

  onChangeAge(value){
      this.enterAge = value;
  }

  onChangeSex(value){
      this.enterSex = value;
  }

  onChangePartyAffiliationFromList(value, otherParty, passcode){
      this.enterPartyAffiliationFromList = value;
      /*if (this.enterPartyAffiliationFromList!=="other"){
        this.enterOtherPartyAffiliation=null;
        this.enterPartyAffiliation=this.enterPartyAffiliationFromList;
        }*/
      if (value == "Other Party") {
          otherParty.setFocus();
      } else {
          passcode.setFocus();
      }
  }

  onChangeOtherPartyAffiliation(value){
      this.enterOtherPartyAffiliation = value;
      /*if (this.enterPartyAffiliationFromList=="other" && this.enterOtherPartyAffiliation!==null){
        this.enterPartyAffiliation=this.enterOtherPartyAffiliation;
        }*/
  }

  onChangePasscode1(value){
      this.enterPasscode1 = value;
  }

  onChangePasscode2(value){
      this.enterPasscode2 = value;
      if (this.enterPasscode1==this.enterPasscode2){
          this.enterPasscode=this.enterPasscode1;
      }
  }

  presentVerificationInit() {
      let alertpvi = this.alertCtrl.create({
          title: 'Verify Phone Number',
          subTitle: 'How would you like to be sent the code',
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                      console.log('Cancel clicked.. nothing to do');
                  }
              },
              {
                  text: 'Voice Call',
                  handler: data => {
                      let navTransition = alertpvi.dismiss();
                      this.verifyPhoneNumber('call');
                  }
              },
              {
                  text: 'SMS Text',
                  handler: data => {
                      let navTransition = alertpvi.dismiss();
                      this.verifyPhoneNumber('sms');
                  }
              }
          ]
      });
      //timeout the error to let other modals finish dismissing.
      setTimeout(()=>{
          alertpvi.present();
      },500);
  }

  onSubmit(): void {

      if(this.registerForm.value.enterPasscode1 == this.registerForm.value.enterPasscode2){
          this.enterPasscode = this.registerForm.value.enterPasscode1;
      } else {

          let pcalert = this.alertCtrl.create({
              title: 'Passwords do not match',
              subTitle: 'Please re-enter your passcodes.',
              buttons: ['OK'] 
          });
          pcalert.present();
          return;
      }

      // SET VALUES FROM TEXT INPUTS
      this.newVolunteer.firstName = this.toTitleCase(this.registerForm.value.enterFirstName);
      this.newVolunteer.lastName = this.toTitleCase(this.registerForm.value.enterLastName);
      this.newVolunteer.emailAddress = this.registerForm.value.enterEmailAddress.toLowerCase();
      this.newVolunteer.exposeEmail = this.enterExposeEmail;
      this.newVolunteer.phoneNumber = this.registerForm.value.enterPhoneNumber;
      this.newVolunteer.age = this.registerForm.value.enterAge;
      this.newVolunteer.sex = this.enterSex;

      if (this.enterPartyAffiliationFromList!="Other Party"){
          this.newVolunteer.partyAffiliation = this.enterPartyAffiliationFromList;
      } else if (this.enterPartyAffiliationFromList=="Other Party" && this.registerForm.value.enterOtherPartyAffiliation){
          this.newVolunteer.partyAffiliation = this.toTitleCase(this.registerForm.value.enterOtherPartyAffiliation);
      }
      this.newVolunteer.shifts = [''];
      this.newVolunteer.associatedPollingStationKey = null;

      //push volunteer to volunteerlist IS WORKING? CONSOLE LOG NOT WORKING
      //This is only necessary for the "fake" version .. since we don't use
      //this list for the "real" one.
      // this.volunteerservice.setNewVolunteer(this.newVolunteer);
      this.volunteerservice.saveVolunteer(this.newVolunteer);
      
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
