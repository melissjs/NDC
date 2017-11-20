import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EducatePage } from './educate';

@NgModule({
  declarations: [
    EducatePage,
  ],
  imports: [
    IonicPageModule.forChild(EducatePage),
  ],
})
export class EducatePageModule {}
