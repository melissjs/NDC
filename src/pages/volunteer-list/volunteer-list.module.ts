import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerListPage } from './volunteer-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VolunteerListPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerListPage),
    ComponentsModule,
  ],
})
export class VolunteerListPageModule {}
