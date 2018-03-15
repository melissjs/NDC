import { Component } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: 'top-bar.html',
  inputs: ['passedTitle'],
})
export class TopBarComponent {

  passedTitle: string;

  constructor() {
  }

}
