import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
@Injectable()
export class GlobalService {
  serverUrl: string;
  requestHeaders: Headers;
  urlHeaders: Headers;
  basicAuth: string;
  token;
  loggedInUser;
  xUrlencoded;

  userLatitude;
  userLongitude;
  akshay
  constructor() {

    /// ============== new instance ====== 18.221.66.147


    //------testing -----------------------
    // this.serverUrl = ' http://18.221.66.147:5000';
    this.serverUrl = ' http://18.221.66.147:4000';

    this.akshay= 'localhost:3016/speech'

    this.token = JSON.parse(localStorage.getItem('token'));

     //========header raw/json ====
     this.urlHeaders = new Headers({
      'Content-Type': 'application/json'
   });
  }
}
