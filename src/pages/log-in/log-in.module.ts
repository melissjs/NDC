import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogInPage } from './log-in';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LogInPage,
  ],
  imports: [
    IonicPageModule.forChild(LogInPage),
    ComponentsModule,
  ],
})
export class LogInPageModule {}
