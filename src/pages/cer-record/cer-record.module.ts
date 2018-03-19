import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CerRecordPage } from './cer-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CerRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CerRecordPage),
    ComponentsModule
  ],
})
export class CerRecordPageModule {}
