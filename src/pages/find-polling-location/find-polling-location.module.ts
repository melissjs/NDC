import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPollingLocationPage } from './find-polling-location';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FindPollingLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPollingLocationPage),
    ComponentsModule,
  ],
})
export class FindPollingLocationPageModule {}
