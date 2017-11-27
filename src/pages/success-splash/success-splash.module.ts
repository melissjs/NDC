import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessSplashPage } from './success-splash';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SuccessSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessSplashPage),
    ComponentsModule,
  ],
})
export class SuccessSplashPageModule {}
