import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinAuditPage } from './join-audit';

@NgModule({
  declarations: [
    JoinAuditPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinAuditPage),
    ComponentsModule
  ],
})
export class JoinAuditPageModule {}
