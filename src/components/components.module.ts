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
import { RecordsComponent } from './records/records';
import { AuditDetailsComponent } from './audit-details/audit-details';
import { JoinAuditComponent } from './join-audit/join-audit';
import { AuditStatsComponent } from './audit-stats/audit-stats';
import { ResumeComponent } from './resume/resume';
import { RolesComponent } from './roles/roles';
import { ProfileViewComponent } from './profile-view/profile-view';

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
    VolunteerListComponent,
    RecordsComponent,
    AuditDetailsComponent,
    JoinAuditComponent,
    AuditStatsComponent,
    ResumeComponent,
    RolesComponent,
    RolesComponent,
    ProfileViewComponent],
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
    VolunteerListComponent,
    RecordsComponent,
    AuditDetailsComponent,
    JoinAuditComponent,
    AuditStatsComponent,
    ResumeComponent,
    RolesComponent,
    RolesComponent,
    ProfileViewComponent]
})
export class ComponentsModule {}
