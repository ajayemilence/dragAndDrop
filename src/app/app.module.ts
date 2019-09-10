import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

import { FileDropModule } from 'ngx-file-drop';

import { AppRoutingModule } from './app-routing.module';

import { LocalStorageService } from './shared/local-storage.service';
import { InternetService } from './shared/internet-connection.service';
import { HttpRequestService } from './shared/http-requests.service';
import { GlobalService } from './shared/global.service';
import { GLobalErrorService } from './shared/global-error.service';
import { FilterPipe } from './shared/filter.pipe';

import { uploadMediaService } from './drag-drop/upload-media.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component'

import { LocalAuthService } from './auth/auth.service';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

// Configs social logins
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2302151586513691")
        }
        //,
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("Your-Google-Client-Id")
        // }
          // {
          //   id: LinkedinLoginProvider.PROVIDER_ID,
          //   provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
          // },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FileDropModule
  ],
  providers: [
    
    LocalStorageService,
    InternetService,
    HttpRequestService,
    GlobalService,
    GLobalErrorService,
    FilterPipe,
    uploadMediaService,
    LocalAuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
