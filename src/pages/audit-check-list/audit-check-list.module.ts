import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditCheckListPage } from './audit-check-list';

@NgModule({
  declarations: [
    AuditCheckListPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditCheckListPage),
  ],
})
export class AuditCheckListPageModule {}
