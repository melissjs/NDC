import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRecordPage } from './activity-record';

@NgModule({
  declarations: [
    ActivityRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityRecordPage),
  ],
})
export class ActivityRecordPageModule {}
