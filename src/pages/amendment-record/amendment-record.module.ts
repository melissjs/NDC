import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmendmentRecordPage } from './amendment-record';

@NgModule({
  declarations: [
    AmendmentRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AmendmentRecordPage),
  ],
})
export class AmendmentRecordPageModule {}
