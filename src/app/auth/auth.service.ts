import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { HttpRequestService } from '../shared/http-requests.service';

@Injectable()
export class LocalAuthService {
    loggedIn = false;
    authRole;


    constructor(private http: Http,
        private localStorage: LocalStorageService,
        private global: GlobalService,
        private  httpService: HttpRequestService
    ) { }


    setRole(data: any) {
        this.authRole = data;
    }

    getRole() {
        return this.authRole;
    }

   signup(data: any) {
    const body = data.toString();
    return this.http.post(this.global.serverUrl + this.httpService.signup,
    data,
    {headers: this.global.urlHeaders} )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            const output = error.json();
            console.log(output.message);
            console.log("above error message")
            return Observable.throw(output.message);
        }
    );
   }


   //===============sign up login =====================

   signin(data: any) {
    const body = data.toString();
        return this.http.post(this.global.serverUrl + this.httpService.login,
        data,
        {headers: this.global.urlHeaders} )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            const output = error.json();
            console.log("above error message")
            return Observable.throw(output.message);
        }
    );
   }

   //=============== sign up login =====================

   checkUser(data: any) {
    const body = data.toString();
    console.log(this.global.serverUrl + this.httpService.checkUser)
        return this.http.post(this.global.serverUrl + this.httpService.checkUser,
        data,
        {headers: this.global.urlHeaders})
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            const output = error.json();
            console.log("above error message check user")
            return Observable.throw(output.message);
            // return Observable.throw(error);
        }
    );
   }



   // verify

   verify(data: any) {

    // headers
    // const header = new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    // });

    // body
    const body = new URLSearchParams();
    body.append('code', data.code);
    body.append('user_id', data.user_id);

    return this.http.post(this.global.serverUrl + 'user_auth/verify_account',
    body.toString(),
    {headers: this.global.urlHeaders} )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            return Observable.throw(error);
        }
    );
   }
}

