import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
@Injectable()
export class HttpRequestService {


  //user
  
  signup;
  login;
  checkUser;

  //upload
  uploadMedia;
  uploadMediaDetail;
  genreList;
  
  mediaList;
  mediaSearch;

  updateUserInfo;
  userDetails;

 

  constructor() {

    this.signup = "/auth/register";
    this.login = "/auth/login";
    this.checkUser =  "/auth/checkUser";


    //upload
    this.uploadMedia = '/util/upload_media';
    this.uploadMediaDetail = '/media/upload';
    this.genreList = '/media/genre';

    //media
    this.mediaList = '/media/list';
    this.mediaSearch = '/media/search';

    //user
    this.updateUserInfo = '/user/update';
    this.userDetails = '/user/details';
    
    



  }
}
