import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSettingsPage } from './account-settings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AccountSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSettingsPage),
    ComponentsModule,
  ],
})
export class AccountSettingsPageModule {}
