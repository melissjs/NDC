import { Component } from '@angular/core';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})
export class LogoutComponent {

  text: string;

  constructor() {
    console.log('Hello LogoutComponent Component');
    this.text = 'Hello World';
  }

  onLogout(){
  // this.restSvc.onLogout(this,this.displayError);
  }

}
