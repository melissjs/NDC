import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivatePage } from './activate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActivatePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivatePage),
    ComponentsModule,
  ],
})
export class ActivatePageModule {}
