import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-request-role',
  templateUrl: 'request-role.html',
  inputs: ['pageTitle']
})
export class RequestRolePage {

  pageTitle: string;
  roleRequest: any;
  roleRequestForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.pageTitle = 'Request Role';
  }

  ngOnInit() {
    this.roleRequestForm = this.fb.group({
      'enterRoleCtrl':  ['', Validators.required],
      'enterReasonsCtrl': ['', Validators.required],
      'enterQuestionsCtrl': [''],
    });
  }

  onSave() {
    console.log('SAVE');
  }

}
