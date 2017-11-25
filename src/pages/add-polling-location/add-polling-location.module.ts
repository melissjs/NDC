import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPollingLocationPage } from './add-polling-location';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddPollingLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPollingLocationPage),
    ComponentsModule,
  ],
})
export class AddPollingLocationPageModule {}
