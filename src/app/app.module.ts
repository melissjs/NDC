import { DirectivesModule } from './../directives/directives.module';
import { ActivityRecordPage } from './../pages/activity-record/activity-record';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecordServiceProvider } from '../providers/record-service/record-service';
import { VolunteerServiceProvider } from '../providers/volunteer-service/volunteer-service';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { PollingStationServiceProvider } from '../providers/polling-station-service/polling-station-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuditServiceProvider } from '../providers/audit-service/audit-service';
import { ElectionServiceProvider } from '../providers/election-service/election-service';
import { ResumeRoleServiceProvider } from '../providers/resume-role-service/resume-role-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordServiceProvider,
    VolunteerServiceProvider,
    RestServiceProvider,
    PollingStationServiceProvider,
    AuthServiceProvider,
    UserServiceProvider,
    UserServiceProvider,
    AuditServiceProvider,
    ElectionServiceProvider,
    ElectionServiceProvider,
    ResumeRoleServiceProvider
  ]
})
export class AppModule {}
