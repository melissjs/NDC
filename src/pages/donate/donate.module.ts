import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonatePage } from './donate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DonatePage,
  ],
  imports: [
    IonicPageModule.forChild(DonatePage),
    ComponentsModule,
  ],
})
export class DonatePageModule {}
