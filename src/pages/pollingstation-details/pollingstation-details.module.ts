import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollingstationDetailsPage } from './pollingstation-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PollingstationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PollingstationDetailsPage),
    ComponentsModule,
  ],
})
export class PollingstationDetailsPageModule {}
