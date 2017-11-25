import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnomalyRecordPage } from './anomaly-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AnomalyRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AnomalyRecordPage),
    ComponentsModule,
  ],
})
export class AnomalyRecordPageModule {}
