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
  activeCache() {
    // console.log('this.cachedDateTime', this.cachedDateTime)
    // console.log('this.cachedDateTime + 6000', this.cachedDateTime+6000)
    // console.log(' Date.now()',  Date.now())
    if (this.cachedDateTime === 0) {
      return false;
    }
    return (this.cachedDateTime > 0 || this.cachedDateTime + 60000 < Date.now()) ? true : false;
  }

  getStations() {
    console.log('FROM GET')
    return this.stationListInMemory || JSON.parse(localStorage.getItem('stationListInMemory'));
  }

  setStations() {
    console.log('FROM SET')
      this.cachedDateTime = Date.now();
      let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
      return this.http.get(baseURL + '/pollingstations/all', {headers: header})
      .map((res: ResponseObj) => {
        this.stationListInMemory = res.obj;
        localStorage.setItem('stationListInMemory', JSON.stringify(res.obj));
        return res.obj;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
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