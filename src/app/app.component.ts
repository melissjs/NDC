import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // loggedIn: Boolean = true;
  rootPage: any = 'HomePage';

  leftPages: Array<{title: string, component: any}>;
  rightPages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
  // if (this.loggedIn) {
    this.leftPages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'About', component: 'AboutPage' },
      { title: 'Volunteer', component: 'VolunteerPage' },
      { title: 'Donate', component: 'DonatePage' },
      { title: 'Participate', component: 'ParticipatePage' },
      { title: 'Audit Training', component: 'AuditTrainingPage' },
      { title: 'Audit Checklist', component: 'AuditCheckListPage' },
      { title: 'Promote', component: 'PromotePage' },
      { title: 'Contact Us', component: 'ContactPage' },
      { title: 'Account Settings', component: 'AccountSettingsPage' }
    ];

    this.rightPages = [
      { title: 'Instructions', component: 'InstructionsPage' },
      { title: 'FAQ', component: 'FaqPage' },
      { title: 'Add New Record', component: 'AddNewRecordPage' },
      { title: 'Morning Check In', component: 'MorningCheckInPage' },
      { title: 'Evening Check Out', component: 'EveningCheckOutPage' },
      { title: 'Volunteer List', component: 'VolunteerListPage' },
      { title: 'Activity Record', component: 'ActivityRecordPage' }
    ];
  }
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
