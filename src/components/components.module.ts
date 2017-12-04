import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OvrComponent } from './ovr/ovr';
import { CheckLoginComponent } from './check-login/check-login';
import { PollingstationComponent } from './pollingstation/pollingstation';
import { ChangePasswordComponent } from './change-password/change-password';
import { TopBarComponent } from './top-bar/top-bar';
import { LosComponent } from './los/los';
import { QrCodeScanComponent } from './qr-code-scan/qr-code-scan';
import { LogoutComponent } from './logout/logout';
import { LogOrSignInComponent } from './log-or-sign-in/log-or-sign-in';
import { UserProfileComponent } from './user-profile/user-profile';
import { VolunteerListComponent } from './volunteer-list/volunteer-list';
// import { RecordServiceProvider } from '../providers/record-service/record-service';


@NgModule({
	declarations: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent,
    LosComponent,
    QrCodeScanComponent,
    LogoutComponent,
    LogOrSignInComponent,
    UserProfileComponent,
    VolunteerListComponent],
	imports: [IonicModule],
	exports: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent,
    LosComponent,
    QrCodeScanComponent,
    LogoutComponent,
    LogOrSignInComponent,
    UserProfileComponent,
    VolunteerListComponent]
})
export class ComponentsModule {}
