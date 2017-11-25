import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewRecordPage } from './add-new-record';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddNewRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewRecordPage),
    ComponentsModule,
  ],
})
export class AddNewRecordPageModule {}
