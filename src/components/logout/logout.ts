import { ClearServiceProvider } from './../../providers/clear-service/clear-service';
import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})
export class LogoutComponent {

  text: string;

  constructor(private authSvc: AuthServiceProvider, private clearSvc: ClearServiceProvider) {}

  onLogout() {
    this.authSvc.logout();
    this.clearSvc.clearAllVars();
  }

}
