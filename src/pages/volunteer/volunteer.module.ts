import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerPage } from './volunteer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VolunteerPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerPage),
    ComponentsModule,
  ],
})
export class VolunteerPageModule {}
