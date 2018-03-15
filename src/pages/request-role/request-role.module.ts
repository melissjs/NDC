import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestRolePage } from './request-role';

@NgModule({
  declarations: [
    RequestRolePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestRolePage),
    ComponentsModule
  ],
})
export class RequestRolePageModule {}
