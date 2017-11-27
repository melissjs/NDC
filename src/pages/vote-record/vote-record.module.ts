import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteRecordPage } from './vote-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VoteRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(VoteRecordPage),
    ComponentsModule,
  ],
})
export class VoteRecordPageModule {}
