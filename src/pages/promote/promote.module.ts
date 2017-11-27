import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotePage } from './promote';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PromotePage,
  ],
  imports: [
    IonicPageModule.forChild(PromotePage),
    ComponentsModule,
  ],
})
export class PromotePageModule {}
