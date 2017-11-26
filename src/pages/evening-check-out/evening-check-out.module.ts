import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EveningCheckOutPage } from './evening-check-out';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EveningCheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(EveningCheckOutPage),
    ComponentsModule,
  ],
})
export class EveningCheckOutPageModule {}
