import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInSuccessPage } from './sign-in-success';

@NgModule({
  declarations: [
    SignInSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInSuccessPage),
  ],
})
export class SignInSuccessPageModule {}
