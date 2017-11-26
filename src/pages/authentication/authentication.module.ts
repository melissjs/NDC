import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationPage } from './authentication';
import { ComponentsModule } from '../../components/components.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    AuthenticationPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationPage),
    ComponentsModule,
  ],
    providers: [
      Geolocation,
    ],
})
export class AuthenticationPageModule {}
