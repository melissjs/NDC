import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
// Pages
// import {VolunteerPage} from '../volunteer/volunteer';
// import {ActivatePage} from '../activate/activate';
// import {DonatePage} from '../donate/donate';
// import {LoginPage} from '../loginpage/loginpage';
// import {ResetpasswordPage} from '../resetpassword/resetpassword';
// import {MenuPage} from '../menu/menu';
// Services
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
// Globals
import * as globals from '../../globals';
// import { LogInPage } from '../log-in/log-in';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pageTitle: string;
  buttonsDisabled: boolean;
  errorMessage: string;

//userDataSvc: UserDataService;
constructor(public navCtrl: NavController, navParams: NavParams, public restSvc: RestServiceProvider) {

    this.navCtrl = navCtrl;
    this.buttonsDisabled = false;
    this.errorMessage = null;
    this.pageTitle = "Democracy Counts"

    if (navParams.get("dontdoagain")) {
        // we don't want to infinitely recurse this.. 
        return;
    }

    // Obtain all args (key=val) format and store to nav params (keyvalues)
    var locStr = window.location.toString();
    var pagerefidx = locStr.indexOf("#/");
    var keyvalidx;
    var pageref = null;
    var keyvalstart;
    var keyvalpair;

    console.log('url val=' + window.location);

    if (pagerefidx > 0) {
        keyvalidx = locStr.indexOf("?");
        if (keyvalidx < 0) {
            pageref = locStr.substr(pagerefidx+2);
        } else {
            pageref = locStr.substring(pagerefidx+2,keyvalidx);
        }
        console.log('page ref = ' + pageref);

        var keyvalues = new NavParams();
        if (keyvalidx >= 0) {
            keyvalstart = locStr.substr(keyvalidx+1);
            keyvalpair = keyvalstart.split('&')
            // Loop through items
            var x = 0;
            for (x = 0; x < keyvalpair.length; x++)
            {
                // Split the key from the value
                var splitted=keyvalpair[x].split('=');
                keyvalues.data[splitted[0]] = splitted[1];
                console.log('key,value[' + splitted[0] + '] = ' + keyvalues.data[splitted[0]]);
            }
        }
        var that = this;
        // Another way to prevent refresh page errors..
        window.location.href = "#/";
        switch (pageref) {
        case 'activate':
            try {
                that.buttonsDisabled = true;
                that.navCtrl.push('ActivatePage', keyvalues);
                setTimeout(()=>{
                    this.enableButtons();
                },10000);
            } catch (EE) { 
                that.buttonsDisabled = false;
                console.log('error in Submitting, exc='+ EE.toString())
            }
            break;
        case 'reset/finish':
            try {
                that.buttonsDisabled = true;
                that.navCtrl.push('ResetPasswordPage', keyvalues);
                setTimeout(()=>{
                    this.enableButtons();
                },10000);
            } catch (EE) { 
                that.buttonsDisabled = false;
                console.log('error in Submitting, exc='+ EE.toString())
            }
            break;
        case 'login':
            try {
                // First, Check if the user is already logged in,
                // And, if so, stay on the home page.
                // Probably got here from a page refresh.. so we
                // need to synchronize with the actual login state.
                if (!that.restSvc.loggedIn) {
                    that.restSvc.checkLoggedIn
                    (that.setLoginTrue, that.setLoginFalse, that);
                    return;
                } else {
                    that.setLoginTrue(that);
                }
            } catch (EE) { 
                console.log('error in Submitting, exc='+ EE.toString())
            }
            break;
        }
    } else {
        console.log('no url specified');
    }
}

  setLoginTrue(that) {
      // The user is logged in.. so leave on home page.
      that.navCtrl.push(HomePage, {
          // Prevent infinite recursion..
          dontdoagain: true
      });
  }

  setLoginFalse(that) {
      // The user is logged in.. so leave on home page.
      that.navCtrl.push('LogInPage');
  }


 /* onSubmit() {
      var that = this;
      try {
         that.navCtrl.push(QuestionsPage, {
                  userDataSvc: this.userDataSvc
          });
      } catch (EE) { 
          console.log('error in Submitting, exc='+ EE.toString())
      }
  }*/
  
onVolunteerClick(){
  var that = this;
      try {
         that.buttonsDisabled = true;
         that.navCtrl.push('VolunteerPage');
          setTimeout(()=>{
              this.enableButtons();
          },10000);
      } catch (EE) { 
          console.log('error in Submitting, exc='+ EE.toString())
          that.buttonsDisabled = false;
      }

}   

onDonateClick(){
var that = this;
      try {
         that.buttonsDisabled = true;
         that.navCtrl.push('DonatePage');
          setTimeout(()=>{
              this.enableButtons();
          },10000);
      } catch (EE) { 
          that.buttonsDisabled = false;
          console.log('error in Submitting, exc='+ EE.toString())
      }
}  

onLoginClick(){
  var that = this;
  try {
      that.buttonsDisabled = true;
      console.log('about to setroot login component...');
      that.navCtrl.push('LogInPage');
      setTimeout(()=>{
          this.enableButtons();
      },10000);
  } catch (EE) { 
      that.buttonsDisabled = false;
      console.log('error in Submitting, exc='+ EE.toString())
  }
}  

onLogout() {
  // this.restSvc.onLogout(this,this.displayError);
}

  displayError(that:any,text: string,subtitle: string) {
      that.errorMessage = text + ':' + subtitle;
  }


enableButtons() {
  this.buttonsDisabled = false;
}

}