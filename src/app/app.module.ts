import { ActivityRecordPage } from './../pages/activity-record/activity-record';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
// import { InstructionsPage } from '../pages/instructions/instructions';
// import { FaqPage } from '../pages/faq/faq';
// import { AddNewRecordPage } from '../pages/add-new-record/add-new-record';
// import { MorningCheckInPage } from '../pages/morning-check-in/morning-check-in';
// import { EveningCheckOutPage } from '../pages/evening-check-out/evening-check-out';
// import { VolunteerListPage } from '../pages/volunteer-list/volunteer-list';
// import { LogInPage } from '../pages/log-in/log-in';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecordServiceProvider } from '../providers/record-service/record-service';
import { VolunteerServiceProvider } from '../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../providers/polling-station-service/polling-station-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    // ListPage,
    // InstructionsPage,
    // AddNewRecordPage,
    // MorningCheckInPage,
    // EveningCheckOutPage,
    // VolunteerListPage,
    // ActivityRecordPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // ListPage,
    // InstructionsPage,
    // AddNewRecordPage,
    // MorningCheckInPage,
    // EveningCheckOutPage,
    // VolunteerListPage,
    // ActivityRecordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordServiceProvider,
    VolunteerServiceProvider,
    RestServiceProvider,
    PollingStationServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
