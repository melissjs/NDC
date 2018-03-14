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
  tempStations: Pollingstation[];
  allCachedStations: Pollingstation[];

  constructor(public http: HttpClient, private authSvc: AuthServiceProvider, private userSvc: UserServiceProvider, private electionSvc: ElectionServiceProvider){
    this.cachedDateTime = 0;
    this.stationsCache = {};
    this.allCachedStations = [];
  }

  clearAllVars() {
    this.usersPollingstation = undefined;
    this.pollingstation = undefined;
    this.stationCache = undefined;
    this.pollingstationOfInterest = undefined;
    this.stations = undefined;
    this.tempStations = undefined;
    this.cachedDateTime = 0;
    this.stationsCache = {};
    this.allCachedStations = [];
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

  getAllCachedStations() {
    if (Object.keys(this.stationsCache).length>1 || localStorage.getItem('stationsCacheLS')) {
      this.allCachedStations = [];
      this.stationsCache != {} ? this.stationsCache = JSON.parse(localStorage.getItem('stationsCacheLS')) : null;
      Object.keys(this.stationsCache).forEach(key => {
        this.allCachedStations.push(...this.stationsCache[key].stations);
      })
      // console.log('allllllll', this.allCachedStations)
      return this.allCachedStations;
    }
    else {
      return undefined;
    }
  }

  // get stations pertaining to electionOfInterest
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

  // check from all in stations cache//////////////////
  getPollingStationByKey(passedKey) {
    if (this.tempStations = this.getAllCachedStations()) {
      // console.log('all cached from get by key', this.tempStations);
      return this.tempStations.find((station) => {
        return station._id === passedKey;
      })
    }
    else {
      console.log('else') 
      return undefined;
    }
  }

  sgetUsersPollingStationByKey(passedKey) {
    console.log('FROM SET')
    let header = new HttpHeaders().set('Authorization','Bearer ' + this.authSvc.getToken())
    return this.http.get(baseURL + `/pollingstations/pollingstation/${passedKey}`, {headers: header})
    .map((res: ResponseObj) => {
      this.usersPollingstation = res.obj;
      localStorage.setItem('usersPollingstationLS', JSON.stringify(this.usersPollingstation));
      return res.obj;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
      // return err??
    })
  }

  getUsersPollingstation() {
    return this.usersPollingstation;
  }

  rmUsersPollingstation() {
    this.usersPollingstation = undefined;
    localStorage.removeItem('usersPollingstationLS');
  }

  // compare duplicates here? 
  // download all stations to memory?
  // normalize station data 

}