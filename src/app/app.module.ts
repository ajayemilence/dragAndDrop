import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

import { FileDropModule } from 'ngx-file-drop';


import { LocalStorageService } from './shared/local-storage.service';
import { InternetService } from './shared/internet-connection.service';
import { HttpRequestService } from './shared/http-requests.service';
import { GlobalService } from './shared/global.service';
import { GLobalErrorService } from './shared/global-error.service';
import { FilterPipe } from './shared/filter.pipe';

import { uploadMediaService } from './drag-drop/upload-media.service'


@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    uploadMediaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
