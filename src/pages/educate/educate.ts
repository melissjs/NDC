import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {InstructionsPage} from '../instructions/instructions';
// import {FaqsPage} from '../faqs/faqs';
// import {VideosPage} from '../videos/videos';


@IonicPage()
@Component({
  selector: 'page-educate',
  templateUrl: 'educate.html',
})
export class EducatePage {
  pageTitle: string;
  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.pageTitle = "Educate";
  }

onSubmitInstructions(){
   var that = this;
   try {
       
           that.navCtrl.push('InstructionsPage');
       
   } catch (EE) {
       console.log('error in Submitting, exc='+ EE.toString())
   }
}

onSubmitFAQs(){
   var that = this;
   try {
       
           that.navCtrl.push('FaqPage');
       
   } catch (EE) {
       console.log('error in Submitting, exc='+ EE.toString())
   }
}

onSubmitVideos(){
   var that = this;
   try {
       
           that.navCtrl.push('VideosPage');
       
   } catch (EE) {
       console.log('error in Submitting, exc='+ EE.toString())
   }
}

}
