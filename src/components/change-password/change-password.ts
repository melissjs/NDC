import { Component } from '@angular/core';

/**
 * Generated class for the ChangePasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordComponent {

  text: string;

  constructor() {
    console.log('Hello ChangePasswordComponent Component');
    this.text = 'Hello World';
  }

}
