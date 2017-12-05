import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})
export class LogoutComponent {

  text: string;

  constructor(private authSvc: AuthServiceProvider) {}

  onLogout() {
    this.authSvc.logout();
  }

}
