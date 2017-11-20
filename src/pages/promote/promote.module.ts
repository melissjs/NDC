import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotePage } from './promote';

@NgModule({
  declarations: [
    PromotePage,
  ],
  imports: [
    IonicPageModule.forChild(PromotePage),
  ],
})
export class PromotePageModule {}
