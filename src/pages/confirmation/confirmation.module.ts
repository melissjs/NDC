// import { PollingstationComponent } from './../../components/pollingstation/pollingstation';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmationPage } from './confirmation';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmationPage),
    ComponentsModule
  ],
})
export class ConfirmationPageModule {}
