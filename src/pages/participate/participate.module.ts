import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipatePage } from './participate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ParticipatePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipatePage),
    ComponentsModule,
  ],
})
export class ParticipatePageModule {}
