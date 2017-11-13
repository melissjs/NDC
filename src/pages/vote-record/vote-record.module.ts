import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteRecordPage } from './vote-record';

@NgModule({
  declarations: [
    VoteRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(VoteRecordPage),
  ],
})
export class VoteRecordPageModule {}
