import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OvrComponent } from './ovr/ovr';
import { CheckLoginComponent } from './check-login/check-login';
import { PollingstationComponent } from './pollingstation/pollingstation';
import { ChangePasswordComponent } from './change-password/change-password';
import { TopBarComponent } from './top-bar/top-bar';
import { LosComponent } from './los/los';
import { QrCodeScanComponent } from './qr-code-scan/qr-code-scan';
// import { RecordServiceProvider } from '../providers/record-service/record-service';


@NgModule({
	declarations: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent,
    LosComponent,
    QrCodeScanComponent],
	imports: [IonicModule],
	exports: [
    OvrComponent,
    CheckLoginComponent,
    PollingstationComponent,
    ChangePasswordComponent,
    TopBarComponent,
    LosComponent,
    QrCodeScanComponent]
})
export class ComponentsModule {}
