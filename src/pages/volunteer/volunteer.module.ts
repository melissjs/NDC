import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerPage } from './volunteer';

@NgModule({
  declarations: [
    VolunteerPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerPage),
  ],
})
export class VolunteerPageModule {}
