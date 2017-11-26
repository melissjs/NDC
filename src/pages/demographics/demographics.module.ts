import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemographicsPage } from './demographics';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DemographicsPage,
  ],
  imports: [
    IonicPageModule.forChild(DemographicsPage),
    ComponentsModule,
  ],
})
export class DemographicsPageModule {}
