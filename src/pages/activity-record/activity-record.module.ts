import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRecordPage } from './activity-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActivityRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityRecordPage),
    ComponentsModule,
  ],
})
export class ActivityRecordPageModule {}
