import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnomalyRecordPage } from './anomaly-record';

@NgModule({
  declarations: [
    AnomalyRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AnomalyRecordPage),
  ],
})
export class AnomalyRecordPageModule {}
