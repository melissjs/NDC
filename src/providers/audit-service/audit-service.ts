import { ResponseObj } from './../../models/response-obj';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class AuditServiceProvider {

  cachedDateTime: number;
  numberAuditors: number;
  shiftsFilled: number;
  remainingShifts: number;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider) {
  }

  activeCache() {
    if (this.cachedDateTime === 0) {
      return false;
    }
    return (this.cachedDateTime + 60000 > Date.now()) ? true : false;
  }

  // getStations() {
  //   console.log('FROM GET')
  //   return this.stations || JSON.parse(localStorage.getItem('stations'));
  // }

  // getAuditStats() {
  //   console.log('FROM SET')
  //     this.cachedDateTime = Date.now();
  //     let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
  //     return this.http.get(baseURL + '/pollingstations/all', {headers: header})
  //     .map((res: ResponseObj) => {
  //       this.stations = res.obj;
  //       localStorage.setItem('stations', JSON.stringify(res.obj));
  //       return res.obj;
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err);
  //     })
  // }


}

