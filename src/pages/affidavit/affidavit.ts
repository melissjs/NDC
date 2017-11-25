import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AffidavitRecord } from '../../models/affidavit-record'
import { VotePage } from '../vote/vote';
//import {NonvotePage} from '../nonvote/nonvote';
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service';

@IonicPage()
@Component({
  selector: 'page-affidavit',
  templateUrl: 'affidavit.html',
})
export class AffidavitPage {
  pageTitle: string;
  affidavitForm: FormGroup;
  fullName: string;
  addressNumName: string;
  zipCode: string;
  signature: boolean;
  newAffidavitRecord: AffidavitRecord;
  //newAffidavitNumber: string;




constructor(private navCtrl: NavController, private alertCtrl: AlertController, private navParams: NavParams, private fb: FormBuilder, private recordservice: RecordServiceProvider, private volunteerservice: VolunteerServiceProvider) {
this.pageTitle = "Step 1: Affidavit";
this.navCtrl = navCtrl;
this.fullName = null;
this.addressNumName = null;
this.zipCode = null;
this.signature = false;
// this.newAffidavitRecord = this.recordservice.createVoidAffidavitRecord();
//this.newAffidavitNumber = this.recordservice.generateNextAffidavitNumber();
//console.log(this.newAffidavitNumber);
var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';
  
  this.affidavitForm = fb.group({  
  'fullName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
  'addressNumName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  'zipCode': ['', Validators.compose([Validators.required, Validators.pattern(regExZip)])],
  'affirm': [false, Validators.required],
  'comments': [''],
  'emailAddress': ['', Validators.compose([Validators.pattern(regExEmail)])],
  'photoReceipt': [''],
  });




}

onChangeFullName(value) {
  console.log('full name selected:' + value);
  this.fullName = value;
}

onChangeAddress(value) {
  console.log('address name selected:' + value);
  this.addressNumName = value;
}

onChangeZipCode(value) {
  console.log('zip code selected:' + value);
  this.zipCode = value;
}

onChangeSignature(value) {
  var newval = !value;
  console.log('signature selected:' + newval);
  this.signature = newval;
          if (this.signature == true){
       let alert = this.alertCtrl.create({
                  //title: 'Please confirm',
                  subTitle: 'I have read this statement and confirm that I understand the terms for participating in this audit.',
                  buttons: ['CONFIRM'] 
              });
              alert.present();}

}

    onSubmit(value: any): void { 
    //     var that = this;

    //     // Make sure checkbox is used
    //     if (this.signature!=true){
    //    let alert = this.alertCtrl.create({
    //               title: 'Checkbox Required',
    //               subTitle: 'Please use the checkbox to confirm that you have read the affirmation.',
    //               buttons: ['CONFIRM'] 
    //           });
    //           alert.present();
    //           return;
    //           } else {

    //      //fill in object
    //      this.newAffidavitRecord = {
    //           //affidavitNumber: this.newAffidavitNumber,
    //           volunteerKey: this.volunteerservice.getNewVolunteerKey(),
    //           fullName: value.fullName,
    //           streetAddress: value.addressNumName,
    //           zip: value.zipCode,
    //           comments: value.comments,
    //           emailAddress: value.emailAddress,
    //           evidence: (value.photoReceipt != null),
    //      }
    //      console.log(this.newAffidavitRecord);
    //      this.recordservice.addAffidavitRecordToList(this.newAffidavitRecord);
    //           console.log(this.recordservice.getAffidavitList());

    //           try {that.navCtrl.setRoot(VotePage, {})}
    //           catch (EE) {console.log('error in Submitting, exc='+ EE.toString())}
    // }
  }

}
