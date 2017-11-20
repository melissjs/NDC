import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationSuccessPage } from './registration-success';

@NgModule({
  declarations: [
    RegistrationSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationSuccessPage),
  ],
})
export class RegistrationSuccessPageModule {}
