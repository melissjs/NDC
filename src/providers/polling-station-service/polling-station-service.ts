import { ResponseObj } from './../../models/response-obj';
import { Pollingstation } from './../../models/pollingstation';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { PollingLocation } from '../../models/polling-location';
import { AuthServiceProvider } from '../auth-service/auth-service';
import * as config from '../../configuration/config';
import * as jwt_decode from 'jwt-decode';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class PollingStationServiceProvider {

  pollingstation: Pollingstation;
  pollingstationOfInterest: Pollingstation;
  stationListInMemory: Pollingstation[];
  cachedDateTime: number;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider){
    this.cachedDateTime = 0;
  }

  getNewStation() {
    return {
      pollingstationKey: '',
      locationName: '',
      precinctNumber: '',
      streetAddress: '',
      line1: '',
      line2: '',
      line3: '',
      city: '',
      state: '',
      zip: null,
      pollingHours: '',
      notes: ''
    }
  }

  setStation(passedStation: Pollingstation){
    this.pollingstation = passedStation;
  }

  getStation(){
    return this.pollingstation;
  }

  // getStations() : Observable<Object> {
  //   let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
  //   return this.http.get(baseURL + '/pollingstations/all', {headers: header})
  // }

  getStations() {
    if (this.cachedDateTime === 0 || this.cachedDateTime + 120000 < Date.now()) {
      this.cachedDateTime = Date.now();
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      this.http.get(baseURL + '/pollingstations/all', {headers: header})
      .subscribe((res: ResponseObj) => {
        this.stationListInMemory = res.obj;
        localStorage.setItem('stationListInMemory', JSON.stringify(res.obj));
        console.log('this.stationListInMemory', this.stationListInMemory)
        return this.stationListInMemory;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
    }
    else {
      console.log('tripping else')
      return this.stationListInMemory || JSON.parse(localStorage.getItem('stationListInMemory'));
    }

  }

  setStationOfInterest(passedStation: Pollingstation) {
    this.pollingstationOfInterest = passedStation;
    localStorage.setItem('pollingstationOfInterest', JSON.stringify(passedStation));
  }

  getStationOfInterest(){
    return this.pollingstationOfInterest || JSON.parse(localStorage.getItem('pollingstationOfInterest'))
  }

  addPollingstation(passedStation: Pollingstation) {
  }

  getPollingStationbyKey(passedKey){ 
      return this.stationListInMemory.filter((station) => {
        station.pollingstationKey === passedKey;
      })
  }

  // compare duplicates here? 
  // download all stations to memory?
  // normalize station data 

}