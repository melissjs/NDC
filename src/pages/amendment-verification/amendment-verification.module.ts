import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmendmentVerificationPage } from './amendment-verification';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AmendmentVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AmendmentVerificationPage),
    ComponentsModule,
  ],
})
export class AmendmentVerificationPageModule {}
