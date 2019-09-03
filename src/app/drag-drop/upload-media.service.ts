import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { HttpRequestService } from '../shared/http-requests.service';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';




// import { map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

// // ...
// export class MyComponent {
//   constructor(private http: HttpClient) { }
//   getItems() {
//     this.http.get('https://example.com/api/items').pipe(map(data => {})).subscribe(result => {
//       console.log(result);
//     });
//   }
// }



@Injectable()
export class uploadMediaService {
    loggedIn = false;
    mediaType;


    constructor(
        private localStorageService: LocalStorageService,
        private global: GlobalService,
        private  httpService: HttpRequestService,
        private http: HttpClient
    ) { }

    requestHeaders = new Headers({
        'access_token' : JSON.parse(localStorage.getItem('music_maker_access_token'))
    });
    rawRequestHeaders = new Headers({
        'Content-Type': 'application/json',
        'access_token' : JSON.parse(localStorage.getItem('music_maker_access_token'))
    });


    setType(data: any) {
        this.mediaType = data;
    }

    getType() {
        return this.mediaType;
    }

    checkApi(){
        return this.http.get('http://localhost:4007/v1/userGallery/aa')
        .map(
            (response: Response) => {
               const output = response.json();
               return output;
            }
        ).catch(
            (error: Response) => {
                console.log(Response);
                console.log("above error message")
                return Observable.throw('Something went wrong');
            }
        );
   }
    // checkApi(){
    //     this.http.get('http://localhost:4007/v1/userGallery/aa').pipe(map(data => {})).subscribe(result => {
    //         console.log(result);
    //       });
    // }
    uploadMedia(data: any) {
        
        //speech
        // console.log(data.myfile );
        // var url = 'localhost:3016/speech';
        // console.log(url , "url")
        //  const formData = new FormData();
        // //  formData.append('media_type', data.media_type);
        //  formData.append('myfile', data.myfile , data.myfile.name);
        //  console.log(formData);
       // this.global.akshay
        //  return this.http.post('localhost:3016/speech',
         return this.http.post('http://localhost:3016/speech',
         data
        )
        .map(
           (response: Response) => {
            console.log("service hai yeh upload hai");
             const output = response.json();
             return output;
           }
        ).catch(
            (error: Response) => {
                console.log('error', error);
             const output = error.json();
             console.log(output);
             return Observable.throw(output.message);
            }
        );
    }

    




   //=============== sign up login =====================

   getGenreList() {
    // return this.http.post(this.BaseUrl + 'account/login/',this.httpService.login
        return this.http.get(this.global.serverUrl + this.httpService.genreList )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            console.log(Response);
            console.log("above error message")
            return Observable.throw('Something went wrong');
        }
    );
   }
}