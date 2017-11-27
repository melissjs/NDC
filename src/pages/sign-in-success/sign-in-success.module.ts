import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInSuccessPage } from './sign-in-success';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SignInSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInSuccessPage),
    ComponentsModule,
  ],
})
export class SignInSuccessPageModule {}
