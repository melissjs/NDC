import { StationCache } from './../../models/station-cache';
import { ElectionServiceProvider } from './../election-service/election-service';
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
import { UserServiceProvider } from '../user-service/user-service';
let baseURL = config.NDCS_BASE_URL;

@Injectable()
export class PollingStationServiceProvider {

  usersPollingstation: Pollingstation;
  pollingstation: Pollingstation;
  stationsCache: any;
  stationCache: StationCache;
  pollingstationOfInterest: Pollingstation;
  stations: Pollingstation[];
  cachedDateTime: number;

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private electionSvc: ElectionServiceProvider){
    this.cachedDateTime = 0;
    this.stationsCache = {};
  }

  // getPollingstationId() {
    
  // }

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

  setStation(passedStation){
    this.pollingstation = passedStation;
  }

  getStation(){
    return this.pollingstation;
  }

  activeCache() {
    // if (this.cachedDateTime === 0) {
    //   return false;
    // }
    // return (this.cachedDateTime + 60000 > Date.now()) ? true : false;
    if (!JSON.parse(localStorage.getItem('stationsCacheLS')) || !JSON.parse(localStorage.getItem('stationsCacheLS'))[this.electionSvc.getElectionOfInterest()._id]) {
      return false;
    } 
    else { // this.stationsCache[this.electionSvc.getElectionOfInterest()._id].cachedDateTime + 60000 > Date.now() ||
      return (JSON.parse(localStorage.getItem('stationsCacheLS'))[this.electionSvc.getElectionOfInterest()._id].cachedDateTime + 60000 > Date.now()) ? true : false;
    }
  }

  getStations() {
    if (this.activeCache()) {
      console.log('FROM GET')
      if (this.stationsCache[this.electionSvc.getElectionOfInterest()._id].stations) {
        return this.stationsCache[this.electionSvc.getElectionOfInterest()._id].stations
      }
      else if (JSON.parse(localStorage.getItem('stationsCacheLS'))[this.electionSvc.getElectionOfInterest()._id].stations) {
        this.stationsCache = JSON.parse(localStorage.getItem('stationsCacheLS'));
        return JSON.parse(localStorage.getItem('stationsCacheLS'))[this.electionSvc.getElectionOfInterest()._id].stations;
      }
    }
    else {
      return undefined;
    }
  }

  setStations() {
    console.log('FROM SET')
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.get(baseURL + `/pollingstations/election/${this.electionSvc.getElectionOfInterest()._id}/operative`, {headers: header})
    .map((res: ResponseObj) => {
      // this.stations = res.obj;
      // localStorage.setItem('stations', JSON.stringify(res.obj));
      
      // set cache in local memory
      this.stationCache = {
        cachedDateTime: Date.now(),
        stations: res.obj
      }
      let elId = this.electionSvc.getElectionOfInterest()._id;
      this.stationsCache[elId] = this.stationCache;
      localStorage.setItem('stationsCacheLS', JSON.stringify(this.stationsCache));
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

  getPollingStationByKey(passedKey) {
    if (this.getStations()) {
      console.log('getstations', this.getStations());
    this.stations = this.getStations();
      return this.stations.find((station) => {
        return station._id === passedKey;
      })
    }
    else {
      console.log('else') 
      return undefined;
    }
  }

  setPollingStationByKey(passedKey) {
    console.log('FROM SET')
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.get(baseURL + `/pollingstations/${passedKey}`, {headers: header})
    .map((res: ResponseObj) => {
      this.usersPollingstation = res.obj;
      localStorage.setItem('usersPollingstationLS', JSON.stringify(this.usersPollingstation));
      return res.obj;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }

  // compare duplicates here? 
  // download all stations to memory?
  // normalize station data 

}