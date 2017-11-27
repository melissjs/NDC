import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotePage } from './vote';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VotePage,
  ],
  imports: [
    IonicPageModule.forChild(VotePage),
    ComponentsModule,
  ],
})
export class VotePageModule {}
