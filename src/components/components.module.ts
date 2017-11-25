import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OvrComponent } from './ovr/ovr';
import { CheckLoginComponent } from './check-login/check-login';
import { PollingstationComponent } from './pollingstation/pollingstation';
import { ChangePasswordComponent } from './change-password/change-password';
import { TopBarComponent } from './top-bar/top-bar';
// import { RecordServiceProvider } from '../providers/record-service/record-service';


@NgModule({
	declarations: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent],
	imports: [IonicModule],
	exports: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent]
})
export class ComponentsModule {}
