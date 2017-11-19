import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessSplashPage } from './success-splash';

@NgModule({
  declarations: [
    SuccessSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessSplashPage),
  ],
})
export class SuccessSplashPageModule {}
