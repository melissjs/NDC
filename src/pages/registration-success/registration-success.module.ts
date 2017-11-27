import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationSuccessPage } from './registration-success';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegistrationSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationSuccessPage),
    ComponentsModule,
  ],
})
export class RegistrationSuccessPageModule {}
