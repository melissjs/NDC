import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { HomePage} from '../home/home';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { /* FormArray, */ FormBuilder, /* FormControl, */ FormGroup, Validators} from '@angular/forms';
import { CollaborateForm } from '../../models/collaborate-form'; 

@IonicPage()
@Component({
  selector: 'page-participate',
  templateUrl: 'participate.html',
})
export class ParticipatePage {

//
collaboratorForm: FormGroup;
resetName: string;
resetAreasOfExpertise: string;
resetDesiredContribution: string;
resetRelevantLinks: string;
resetContact: string;
collabFormObj: CollaborateForm;

titlec: {page: any, title: string};

constructor(private navCtrl: NavController, navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder,
private restSvc: RestServiceProvider) {

this.navCtrl = navCtrl;
this.collabFormObj = null;
this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };

    //form stuff
    var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
    var regExPhone: string = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
    var regExAge: string = '[1]*[0-9]?[0-9]';
    var regExLettersOnly: string = '[a-ZA-Z]+';
    var regExNumbersOnly: string = '[0-9]*';
    var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';

    this.collaboratorForm = fb.group({  
        'enterFullName': ['', Validators.required],
        'enterContact': ['', Validators.compose([Validators.required, Validators.pattern(regExEmail)])],
        'enterAreasOfExpertise': ['', Validators.required],
        'enterDesiredContribution': ['', Validators.required],
        'enterRelevantLinks': ['',Validators.required],
        

    });
    
// End Constructor
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