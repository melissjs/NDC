import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InstructionsPage } from '../pages/instructions/instructions';
import { FaqPage } from '../pages/faq/faq';
import { AddNewRecordPage } from '../pages/add-new-record/add-new-record';
import { MorningCheckInPage } from '../pages/morning-check-in/morning-check-in';
import { EveningCheckOutPage } from '../pages/evening-check-out/evening-check-out';
import { LogInPage } from '../pages/log-in/log-in';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecordServiceProvider } from '../providers/record-service/record-service';
import { VolunteerServiceProvider } from '../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../providers/polling-station-service/polling-station-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InstructionsPage,
    FaqPage,
    AddNewRecordPage,
    MorningCheckInPage,
<<<<<<< HEAD
    EveningCheckOutPage
=======
    LogInPage  
>>>>>>> ff0b86ea19b8a0ac6e7ae8233eed129acc4f567c
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
    HomePage,
    ListPage,
    InstructionsPage,
    FaqPage,
    AddNewRecordPage,
    MorningCheckInPage,
<<<<<<< HEAD
    EveningCheckOutPage
=======
    LogInPage
>>>>>>> ff0b86ea19b8a0ac6e7ae8233eed129acc4f567c
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordServiceProvider,
    VolunteerServiceProvider,
    RestServiceProvider,
    PollingStationServiceProvider
  ]
})
export class AppModule {}
