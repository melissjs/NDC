import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AffidavitPage } from './affidavit';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AffidavitPage,
  ],
  imports: [
    IonicPageModule.forChild(AffidavitPage),
    ComponentsModule,
  ],
})
export class AffidavitPageModule {}
