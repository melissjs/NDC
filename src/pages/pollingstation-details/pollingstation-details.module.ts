import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollingstationDetailsPage } from './pollingstation-details';

@NgModule({
  declarations: [
    PollingstationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PollingstationDetailsPage),
  ],
})
export class PollingstationDetailsPageModule {}
