import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html',
  inputs: ['user']
})
export class ProfileViewComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit() {
  }

}
