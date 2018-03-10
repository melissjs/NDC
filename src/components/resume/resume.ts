import { Component } from '@angular/core';

/**
 * Generated class for the ResumeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resume',
  templateUrl: 'resume.html'
})
export class ResumeComponent {

  text: string;

  constructor() {
    console.log('Hello ResumeComponent Component');
    this.text = 'Hello World';
  }

}
