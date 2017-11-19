import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnregisteredSignInPage } from './unregistered-sign-in';

@NgModule({
  declarations: [
    UnregisteredSignInPage,
  ],
  imports: [
    IonicPageModule.forChild(UnregisteredSignInPage),
  ],
})
export class UnregisteredSignInPageModule {}
