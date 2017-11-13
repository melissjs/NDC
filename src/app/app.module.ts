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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecordServiceProvider } from '../providers/record-service/record-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InstructionsPage,
    FaqPage,
    AddNewRecordPage,
    MorningCheckInPage
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
    MorningCheckInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordServiceProvider
  ]
})
export class AppModule {}
