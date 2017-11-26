import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EducatePage } from './educate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EducatePage,
  ],
  imports: [
    IonicPageModule.forChild(EducatePage),
    ComponentsModule,
  ],
})
export class EducatePageModule {}
