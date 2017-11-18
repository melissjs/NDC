import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OvrComponent } from './ovr/ovr';
import { CheckLoginComponent } from './check-login/check-login';
import { PollingstationComponent } from './pollingstation/pollingstation';
import { ChangePasswordComponent } from './change-password/change-password';
// import { RecordServiceProvider } from '../providers/record-service/record-service';


@NgModule({
	declarations: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent],
	imports: [IonicModule],
	exports: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent]
})
export class ComponentsModule {}
