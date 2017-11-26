import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndPage } from './end';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EndPage,
  ],
  imports: [
    IonicPageModule.forChild(EndPage),
    ComponentsModule,
  ],
})
export class EndPageModule {}
