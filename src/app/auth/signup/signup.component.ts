import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LocalStorageService } from '../../shared/local-storage.service';
import { LocalAuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  localImagePath = 'assets/images/'

  errorMsg;
  message = false;
  userType;

  constructor(
    private authService: LocalAuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    //this.userType = this.authService.getRole(); 

    if(this.userType == undefined || this.userType == null){
      this.router.navigate(['/role']);
    }
  }


  onSignup(form: NgForm) {
    // if (form.status === 'INVALID') {
    //   const fieldsArray = [];
    //   const formVal = form.controls;
    //   if (formVal.name.valid === false) {
    //     fieldsArray.push(' Name');
    //   }
    //   if (formVal.displayName.valid === false) {
    //     fieldsArray.push(' Display Name');
    //   }
    //   if (formVal.address.valid === false) {
    //     fieldsArray.push(' Address');
    //   }

    //   if (formVal.number.valid === false) {
    //     fieldsArray.push(' Phone Number');
    //   }
    //     const fields = fieldsArray.toString();
    //     this.message = true;
    //     this.errorMsg = 'Missing Mandatory Fields : ';
    //   } else 
    // if (form.status === 'INVALID') {
    //   console.log("dadada");
    //   console.log(form.controls.email);
    // }
      if (form.controls.email.valid === false) {
      this.message = true;
      if(form.controls.email.touched === false || form.value.email === ''){
        this.errorMsg = 'Please fill the email';
      }
      else {
        this.errorMsg = 'email is not valid';
      }
    }
     else if (form.value.password.toString().length < 6) {
      this.message = true;
      this.errorMsg = 'Your password must be have atleast 6 characters long';
    }
     else if (form.value.password !== form.value.cpassword) {
      this.message = true;
      this.errorMsg = 'Mismatch Password and Confirm Passwords!';
    } 
    else {
      this.message = false;
      const body = {
         'email' : form.value.email,
         'password': form.value.password,
         'user_type' : this.userType
      };
      console.log(body);

     // Post request to store user data
      this.authService.signup(body)
      .subscribe(
        (response) => {
          // if registered successfully
         if (response.status === 200) {
          this.message = false;
          // clearing data in local storage
          localStorage.clear();

          // storing data in local storage
          this.localStorage.set('music_maker_user-data', response.data);
          this.localStorage.set('music_maker_access_token', response.data.access_token);
          if(response.data.user_type == 1 ){
            this.router.navigate(['fanMedia']);
          }else {
            this.router.navigate(['media']);
          }
          
          // redirect to varification page

        } if (response.status !== 200) {
          this.message = true;
          this.errorMsg = response.message;
        }
          form.reset();
        },
        (error) => {
          // handle all error cases
          console.log(error);
          this.message = true;
          this.errorMsg = error;
        }
      );
    }
  }

}
