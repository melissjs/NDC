import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmendmentRecordPage } from './amendment-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AmendmentRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AmendmentRecordPage),
    ComponentsModule,
  ],
})
export class AmendmentRecordPageModule {}
