import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditTrainingPage } from './audit-training';

@NgModule({
  declarations: [
    AuditTrainingPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditTrainingPage),
    ComponentsModule
  ],
})
export class AuditTrainingPageModule {}
