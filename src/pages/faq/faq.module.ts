import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqPage } from './faq';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FaqPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqPage),
    ComponentsModule
  ],
})
export class FaqPageModule {}
