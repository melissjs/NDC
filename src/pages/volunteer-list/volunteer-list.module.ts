import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerListPage } from './volunteer-list';

@NgModule({
  declarations: [
    VolunteerListPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerListPage),
  ],
})
export class VolunteerListPageModule {}
