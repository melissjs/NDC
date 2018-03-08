import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resume-and-roles',
  templateUrl: 'resume-and-roles.html'
})
export class ResumeAndRolesComponent implements OnInit {

  pageTitle: string;
  resumeRoleForm: FormGroup;

  constructor(private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
