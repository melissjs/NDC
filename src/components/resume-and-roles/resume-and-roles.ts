import { Component } from '@angular/core';

@Component({
  selector: 'resume-and-roles',
  templateUrl: 'resume-and-roles.html'
})
export class ResumeAndRolesComponent {

  text: string;

  constructor() {
  }

}


// <!-- <form [formGroup]="registerForm"  (ngSubmit)="onSubmit()"> -->
// <form [formGroup]="registerForm">

//   <ion-item>
//     <ion-label stacked>Username:</ion-label>
//     <ion-input [class.invalid]="!registerForm.controls['enterUsernameCtrl'].valid && registerForm.controls['enterUsernameCtrl'].touched" type="text" formControlName="enterUsernameCtrl"></ion-input>
//   </ion-item>

//   <ion-item>
//     <ion-label stacked>First Name:</ion-label>
//     <ion-input [class.invalid]="!registerForm.controls['enterFirstNameCtrl'].valid && registerForm.controls['enterFirstNameCtrl'].touched" type="text" formControlName="enterFirstNameCtrl"></ion-input>
//   </ion-item>

//   <ion-item>
//     <ion-label stacked>Last Name:</ion-label>
//     <ion-input [class.invalid]="!registerForm.controls['enterLastNameCtrl'].valid && registerForm.controls['enterLastNameCtrl'].touched" type="text" formControlName="enterLastNameCtrl"></ion-input>
//   </ion-item>

//   <ion-item text-wrap>
//     <ion-label class="smalltext" stacked>You can hide information from your profile by using the toggle switches to the right of each item. If you leave them toggled on, your audit team will have access to that information on your profile. If you toggle off, only your team leaders will have access to that information. It is beneficial for team members to be able to communicate with each other, so allowing access to your phone number and/or email is recommended.</ion-label> 
//   </ion-item>

//   <ion-item>
//     <ion-label stacked>Email:</ion-label>
//     <ion-toggle formControlName="enterExposeEmailCtrl"></ion-toggle>
//     <ion-input [class.invalid]="!registerForm.controls['enterEmailAddressCtrl'].valid && registerForm.controls['enterEmailAddressCtrl'].touched" type="email" formControlName="enterEmailAddressCtrl"></ion-input>
//   </ion-item>
  
//   <ion-item>
//     <ion-label stacked>Cell Phone Number (numbers only):</ion-label>
//     <ion-toggle formControlName="enterExposePhoneNumberCtrl"></ion-toggle>
//     <ion-input [class.invalid]="!registerForm.controls['enterPhoneNumberCtrl'].valid && registerForm.controls['enterPhoneNumberCtrl'].touched" type="tel" formControlName="enterPhoneNumberCtrl"></ion-input>
//   </ion-item>
  
//   <ion-item>
//     <ion-label stacked>Age:</ion-label>
//     <ion-toggle formControlName="enterExposeAgeCtrl"></ion-toggle>
//     <ion-input type="text" formControlName="enterAgeCtrl"></ion-input>
//   </ion-item>
    
//   <ion-item>
//     <ion-label stacked>Sex:</ion-label>
//     <ion-toggle formControlName="enterExposeSexCtrl"></ion-toggle>
//     <ion-select text-wrap formControlName="enterSexCtrl">
//       <ion-option value="female">Female</ion-option>
//       <ion-option value="male">Male</ion-option>
//       <ion-option value="nonBinary">Non Binary</ion-option>
//       <ion-option value="noAnswer">No Answer</ion-option>
//     </ion-select> 
//   </ion-item>
    
//   <ion-item>
//   <ion-label stacked>Party Affiliation:</ion-label>
//   <ion-toggle formControlName="enterExposePartyAffiliationCtrl"></ion-toggle>
//   <ion-select #partyAffiliation text-wrap formControlName="enterPartyAffiliationCtrl" (ionChange)="onChangeParty()">
//     <ion-option value="noPartyPreference">No Party Preference</ion-option>
//     <ion-option value="independent">Independent</ion-option>
//     <ion-option value="democrat">Democratic Party</ion-option>
//     <ion-option value="republican">Republican Party</ion-option>
//     <ion-option value="green">Green Party</ion-option>
//     <ion-option value="other">Other Party</ion-option>
//   </ion-select> 
//   </ion-item>

//   <ion-item *ngIf="this.registerForm.value.enterPartyAffiliationCtrl === 'other'">
//     <ion-label stacked>Please Write in Party Name:</ion-label>
//     <ion-input #otherParty type="text" formControlName="enterOtherPartyAffiliationCtrl"></ion-input>
//   </ion-item>

//   <ion-item>
//     <ion-label stacked>Create password (min 8 characters):</ion-label>
//     <ion-input [class.invalid]="!registerForm.controls['enterPassword1Ctrl'].valid && registerForm.controls['enterPassword1Ctrl'].touched"  type="password" formControlName="enterPassword1Ctrl"></ion-input>
//   </ion-item>

//   <ion-item>
//     <ion-label stacked>Confirm password:</ion-label>
//     <ion-input [class.invalid]="!registerForm.controls['enterPassword2Ctrl'].valid && registerForm.controls['enterPassword2Ctrl'].touched" #password type="password" formControlName="enterPassword2Ctrl" ></ion-input>
//   </ion-item>

//   <ion-item *ngIf="pageTitle === 'Register'">
//     <button ion-button [disabled]="!registerForm.valid" block large  (click)="onSubmit()">
//       Register
//     </button>
//   </ion-item>

//   <ion-item *ngIf="pageTitle === 'Account Settings'">
//     <button ion-button type="submit" [disabled]="!registerForm.valid" block large (click)="onSave()">
//       Save
//     </button>
//   </ion-item>

//   <!-- <ion-item>
//     <button ion-button block large (click)="onTest()">
//       Test
//     </button>
//   </ion-item> -->

// </form>

// userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
// roleRequests: { type: [RoleRequestSchema] },
// preferredContact:{ type: String, required: [true, 'Preferred contact required'] },
// references: { type: String },
// facebook: { type: String },
// twitter: { type: String },
// instagram: { type: String },
// linkedin: { type: String },
// website: { type: String },
// resume: { type: String },
// areasOfExpertise: { type: String },
// relatedExperience: { type: String },
// otherLinks: { type: String }