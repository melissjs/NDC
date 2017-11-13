import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorningCheckInPage } from './morning-check-in';

@NgModule({
  declarations: [
    MorningCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(MorningCheckInPage),
  ],
})
export class MorningCheckInPageModule {}
