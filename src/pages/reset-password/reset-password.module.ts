import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
    ComponentsModule,
  ],
})
export class ResetPasswordPageModule {}
