import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewRecordPage } from './add-new-record';

@NgModule({
  declarations: [
    AddNewRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewRecordPage),
  ],
})
export class AddNewRecordPageModule {}
