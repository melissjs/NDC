import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

}
