import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuplicatePollingStationPage } from './duplicate-polling-station';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    DuplicatePollingStationPage,
  ],
  imports: [
    IonicPageModule.forChild(DuplicatePollingStationPage),
    ComponentsModule
  ],
})
export class DuplicatePollingStationPageModule {}
