import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPollingLocationPage } from './add-polling-location';

@NgModule({
  declarations: [
    AddPollingLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPollingLocationPage),
  ],
})
export class AddPollingLocationPageModule {}
