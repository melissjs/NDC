import { Component } from '@angular/core';

/**
 * Generated class for the RecordsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'records',
  templateUrl: 'records.html'
})
export class RecordsComponent {

  text: string;

  constructor() {
    console.log('Hello RecordsComponent Component');
    this.text = 'Hello World';
  }

}


  // FOR ANOTHER COMPONENT?
  // enterTotalRecords: number;
  // enterTotalVoteRecords: number;
  // enterTotalAnomalyRecords: number;
  // enterTotalAmendmentRecords: number;
  // volunteers: Volunteer[];
  // dbSex: string;
  // dbPartyAffiliation: string;
  // properties: any;
