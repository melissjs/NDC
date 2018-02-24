import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CollaborateForm } from '../../models/collaborate-form'; 
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user';
import { findLast } from '@angular/compiler/src/directive_resolver';

@IonicPage()
@Component({
  selector: 'page-participate',
  templateUrl: 'participate.html',
})

export class ParticipatePage implements OnInit {

pageTitle: string;
collaboratorForm: FormGroup;
resetName: string;
resetAreasOfExpertise: string;
resetDesiredContribution: string;
resetRelevantLinks: string;
resetContact: string;
collabFormObj: CollaborateForm;
regExEmail: string;
regExPhone: string;
regExAge: string;
regExLettersOnly: string;
regExNumbersOnly: string;
regExZip: string;
user: User;
fullName: string;

constructor(private navCtrl: NavController, navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private restSvc: RestServiceProvider, private userSvc: UserServiceProvider) {
  this.collabFormObj = null;
  this.pageTitle = "Participate";
  this.regExEmail = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
  this.regExPhone = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
  this.regExAge= '[1]*[0-9]?[0-9]';
  this.regExLettersOnly= '[a-ZA-Z]+';
  this.regExNumbersOnly = '[0-9]*';
  this.regExZip = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';
}

ngOnInit() {
  this.user = this.userSvc.getUser() || this.userSvc.getNewUser();
  this.fullName = `${this.user.firstName} ${this.user.lastName}`
  this.collaboratorForm = this.fb.group({  
    'enterFullNameCtrl': [this.fullName, Validators.required],
    'enterEmailAddressCtrl': [this.user.emailAddress, Validators.compose([Validators.required, Validators.pattern(this.regExEmail)])],
    'enterAreasOfExpertiseCtrl': ['', Validators.required],
    'enterContributionCtrl': ['', Validators.required],
    'enterRelevantLinksCtrl': ['',Validators.required],
  });
}


onSubmit(value: any): void {


this.collabFormObj = {
fullName: value.enterFullName,
emailAddress: value.enterContact,
areasOfExpertise: value.enterAreasOfExpertise,
desiredContribution: value.enterDesiredContribution,
links: value.enterRelevantLinks
}

//console.log(this.collabFormObj);
//console.log('hello');
// ask Eric about emailing a form value

// alert    
this.restSvc.sendCollab(this.collabFormObj);
        
        let alert = this.alertCtrl.create({
                    title: 'Successfully Submitted',
                    subTitle: 'Thank you for your submission; we greatly appreciate your interest in participating. Someone will respond to you as soon as possible. Our team is small right now; please expect it may take us some time to reply.',
buttons: [ 'OK' ]
                });
                alert.present(); 
                  try {
    this.navCtrl.setRoot('HomePage');
} catch (EE) {
    console.log('error in Submitting, exc='+ EE.toString())
}
        }

/*
this.resetName = null;
this.resetAreasOfExpertise  = null;
this.resetDesiredContribution  = null;
this.resetRelevantLinks = null;
this.resetContact = null;
*/






// End class
}