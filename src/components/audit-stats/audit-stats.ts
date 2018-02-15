import { Component } from '@angular/core';

/**
 * Generated class for the AuditStatsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'audit-stats',
  templateUrl: 'audit-stats.html'
})
export class AuditStatsComponent {

  text: string;

  constructor() {
    console.log('Hello AuditStatsComponent Component');
    this.text = 'Hello World';
  }

}
