import { Component } from '@angular/core';

/**
 * Generated class for the JoinAuditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'join-audit',
  templateUrl: 'join-audit.html'
})
export class JoinAuditComponent {

  text: string;

  constructor() {
    console.log('Hello JoinAuditComponent Component');
    this.text = 'Hello World';
  }

}
