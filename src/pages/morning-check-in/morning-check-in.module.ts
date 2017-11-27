import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorningCheckInPage } from './morning-check-in';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MorningCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(MorningCheckInPage),
    ComponentsModule,
  ],
})
export class MorningCheckInPageModule {}
