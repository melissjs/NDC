import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditCheckListPage } from './audit-check-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AuditCheckListPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditCheckListPage),
    ComponentsModule,
  ],
})
export class AuditCheckListPageModule {}
