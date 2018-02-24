import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { ContactForm } from '../../models/contact-form'
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})

export class ContactPage implements OnInit{

  pageTitle: string;
  contactForm: FormGroup;
  email: any;
  contactFormObj: ContactForm;
  user: User;
  regExEmail: string;
  fullName: string;

  constructor(private navCtrl: NavController, navParams: NavParams, private alertCtrl: AlertController, public fb: FormBuilder, private userSvc: UserServiceProvider) {
    this.pageTitle = "Contact";
    this.contactFormObj = null;
    this.regExEmail = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*'
  }

  ngOnInit() {
    this.user = this.userSvc.getUser() || this.userSvc.getNewUser();
    this.fullName = `${this.user.firstName} ${this.user.lastName}`;
    this.contactForm = this.fb.group({  
      'enterFullNameCtrl': [this.fullName, Validators.compose([Validators.required])],
      'enterEmailAddressCtrl': [this.user.emailAddress, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.regExEmail)])],
      'enterSubjectCtrl': ['', Validators.required],
      'enterMessageCtrl': ['', Validators.required]
    });
  }

  onChangeSubject() {
    
  }

  onSubmit(value: any): void { 

    this.contactFormObj = {
      fullName: this.contactForm.value.enterFullNameCtrl,
      emailAddress: this.contactForm.value.enterEmailAddressCtrl,
      subject: this.contactForm.value.enterSubjectCtrl,
      message: this.contactForm.value.enterMessageCtrl
    }

    console.log('contactFormObj', this.contactFormObj);

    // this.restSvc.sendContact(this.contactFormObj);

    let alert = this.alertCtrl.create({
      title: 'Submission Successful',
      subTitle: 'Thank you for contacting us. Someone will respond to you as soon as possible. Our team is small right now; please expect it may take us some time to reply.',
      buttons: [ 'OK' ]
    });
    alert.present();

    this.navCtrl.setRoot('HomePage');
  }

}
