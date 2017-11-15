import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InstructionsPage } from '../pages/instructions/instructions';
import { FaqPage } from '../pages/faq/faq';
import { AddNewRecordPage } from '../pages/add-new-record/add-new-record';
import { MorningCheckInPage } from '../pages/morning-check-in/morning-check-in';
import { EveningCheckOutPage } from '../pages/evening-check-out/evening-check-out';
import { ActivityRecordPage } from './../pages/activity-record/activity-record';
import { VolunteerListPage } from '../pages/volunteer-list/volunteer-list';


import { LogInPage } from '../pages/log-in/log-in';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LogInPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Instructions', component: InstructionsPage },
      { title: 'FAQ', component: FaqPage },
      { title: 'Add New Record', component: AddNewRecordPage },
      { title: 'Morning Check In', component: MorningCheckInPage },
      { title: 'Evening Check Out', component: EveningCheckOutPage },
      { title: 'Volunteer List', component: VolunteerListPage },
      { title: 'Activity Record', component: ActivityRecordPage }
    ];

  }

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
