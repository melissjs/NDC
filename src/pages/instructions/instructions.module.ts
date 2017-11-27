import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstructionsPage } from './instructions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructionsPage),
    ComponentsModule,
  ],
})
export class InstructionsPageModule {}
