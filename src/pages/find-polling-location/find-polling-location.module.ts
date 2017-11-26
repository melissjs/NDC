import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPollingLocationPage } from './find-polling-location';
import { ComponentsModule } from '../../components/components.module';
// import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    FindPollingLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPollingLocationPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class FindPollingLocationPageModule {}
