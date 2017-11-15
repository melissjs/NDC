import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EveningCheckOutPage } from './evening-check-out';

@NgModule({
  declarations: [
    EveningCheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(EveningCheckOutPage),
  ],
})
export class EveningCheckOutPageModule {}
