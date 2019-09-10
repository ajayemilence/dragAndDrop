import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LocalStorageService } from '../../shared/local-storage.service';
import { LocalAuthService } from '../auth.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  localImagePath = 'assets/images/'

  errorMsg;
  message = false;
  fbSignIn = false;
  fbUserdata;

  constructor(
    private authService: LocalAuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
   // private socialAuthService: AuthService
    ) { }

  ngOnInit() {
  }

  //---------social login -------------
  // public socialSignIn(socialPlatform : string) {
  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }
  //   // else if(socialPlatform == "google"){
  //   //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   // } else if (socialPlatform == "linkedin") {
  //   //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
  //   // }
    
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       // Now sign-in with userData
  //       // ...
  //       if(socialPlatformProvider == "facebook"){
  //         this.checkSocialSignin(userData , 1)
  //       }else {
  //         this.checkSocialSignin(userData , 1)
  //       }
        
            
  //     }
  //   );
  // }


  backSignIn(){
    this.fbSignIn = !this.fbSignIn
  }
  //-----------end -----------------


  onSignin(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    const body = {
     'email': email,
     'password': pass,
   };
   console.log(body);
   console.log("hitting");

             // clearing data in local storage
          localStorage.clear();

          // storing data in local storage
          this.localStorage.set('akshay-user-login', body);
        //  this.localStorage.set('music_maker_access_token', response.data.access_token);



  //  this.authService.signin(body).subscribe(
  //     (response) => {
  //       console.log(response);
  //       // if response 2 verify account
  //       console.log(response.msg);
  //       if (response.status !== 200) {
  //         console.log('print error message');
  //         this.message = true;
  //         this.errorMsg = response.message;
  //         //form.reset();
  //       } else if (response.status === 200) {
  //         // if response 1 clear local storage and store data again

  //         // clearing data in local storage
  //         localStorage.clear();

  //         // storing data in local storage
  //         this.localStorage.set('music_maker_user-data', response.data);
  //         this.localStorage.set('music_maker_access_token', response.data.access_token);

  //         // navigating to profile
  //         if(response.data.user_type == 1 ){
  //           this.router.navigate(['fanMedia']);
  //         }else {
  //           this.router.navigate(['media']);
  //         }
  //       }
  //   },
  //     (error) => {
  //       this.message = true;
  //       console.log(error);
  //       this.errorMsg = error;
  //       //form.reset();
  //     }
  //   );
 }

 checkSocialSignin(userData , type){
  const body = {
    'email': userData.email,
    'social_id' : userData.id,
    'login_type' : type
  };
  console.log(body);
  console.log("hitting");
  this.authService.checkUser(body).subscribe(
      (response) => {
        console.log(response);
        // if response 2 verify account
        console.log(response.msg);
        if (response.status == 201) {
          
          this.fbSignIn = true;
          this.fbUserdata = userData;
          //------ CHANGES ----------
        } else if (response.status === 200) {
          // if response 1 clear local storage and store data again

          // clearing data in local storage
          localStorage.clear();

          // storing data in local storage
          this.localStorage.set('music_maker_user-data', response.data);
          this.localStorage.set('music_maker_access_token', response.data.access_token);

          // navigating to profile
          if(response.data.user_type == 1 ){
            this.router.navigate(['fanMedia']);
          }else {
            this.router.navigate(['media']);
          }
        }
    },
    (error) => {
      this.message = true;
      console.log(error);
      this.errorMsg = error;
      console.log("yaha aaya hai");
    }
  );
 }

  socialSigninFirst(userType) {
    const body = {
    'email': this.fbUserdata.email,
    'social_id' : this.fbUserdata.id,
    'login_type' : 1,
    'user_type' : userType
  };
  console.log(body);
  console.log("hitting");
  this.authService.signin(body).subscribe(
      (response) => {
        console.log(response);
        // if response 2 verify account
        console.log(response.msg);
        if (response.status !== 200) {
          console.log('print error message');
          this.message = true;
          this.errorMsg = response.message;
          //form.reset();
        } else if (response.status === 200) {
          // if response 1 clear local storage and store data again

          // clearing data in local storage
          localStorage.clear();

          // storing data in local storage
          this.localStorage.set('music_maker_user-data', response.data);
          this.localStorage.set('music_maker_access_token', response.data.access_token);

          // navigating to profile
          if(response.data.user_type == 1 ){
            this.router.navigate(['fanMedia']);
          }else {
            this.router.navigate(['media']);
          }
        }
    },
      (error) => {
        this.message = true;
        console.log(error);
        this.errorMsg = error;
        //form.reset();
      }
    );
  }

}
