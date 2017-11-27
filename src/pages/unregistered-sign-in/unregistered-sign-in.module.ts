import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnregisteredSignInPage } from './unregistered-sign-in';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UnregisteredSignInPage,
  ],
  imports: [
    IonicPageModule.forChild(UnregisteredSignInPage),
    ComponentsModule,
  ],
})
export class UnregisteredSignInPageModule {}
