import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component } from '@angular/core';

@Component({
  selector: 'roles',
  templateUrl: 'roles.html'
})
export class RolesComponent {

  roles: string[];

  constructor(private userSvc: UserServiceProvider) {
    this.roles = this.userSvc.getUser().userRoles;
  }

}
