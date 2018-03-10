import { Component } from '@angular/core';

/**
 * Generated class for the RolesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'roles',
  templateUrl: 'roles.html'
})
export class RolesComponent {

  text: string;

  constructor() {
    console.log('Hello RolesComponent Component');
    this.text = 'Hello World';
  }

}
