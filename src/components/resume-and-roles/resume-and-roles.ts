import { Component } from '@angular/core';

/**
 * Generated class for the ResumeAndRolesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resume-and-roles',
  templateUrl: 'resume-and-roles.html'
})
export class ResumeAndRolesComponent {

  text: string;

  constructor() {
    console.log('Hello ResumeAndRolesComponent Component');
    this.text = 'Hello World';
  }

}
