import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { LocalStorageService } from '../shared/local-storage.service';

import { uploadMediaService } from './upload-media.service';
// import { ApiService } from '../shared/api.service';


export interface Window {
  AWS?: any;
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})


export class DragDropComponent implements OnInit {


  a = 1;
  localImagePath = 'assets/images/'
  localVideoPath = 'assets/video'
  fileName;
  mediaName;
  fileList;

  aws;
  
  loading = false;
  window : Window = {};

  user;
  accessToken;

  mediaType;
  media;

  message;
  errorMsg;
  UploadRequest;

  showProgress = false;
  uploadedProgressCount = 0;

  constructor(private uploadMediaService: uploadMediaService,
    private localStorage: LocalStorageService,
    // public api: ApiService,
    //private router: Router,
   // private route: ActivatedRoute
   ) { }

  

  ngOnInit() {


    // this.mediaType = this.uploadMediaService.getType(); 
  
    // if(this.mediaType == undefined){
    //   this.router.navigate(['/media/type']);
    // }

    // this.user = JSON.parse(localStorage.getItem('music_maker_user-data'));
    // this.accessToken = JSON.parse(localStorage.getItem('music_maker_access_token'));

    // console.log(this.accessToken)
  }


  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }


  onFileChange(file: FileList) {
    this.fileName = file.item(0);
    const reader = new FileReader();
    this.message = false;
    this.mediaName = file.item(0).name;
    this.media = file[0];

    console.log(this.media , "on file change")
  }

  onFilesChange(fileList : Array<File>){
    this.fileList = fileList;
  }

  //-------------drag and drop ---------------

  public files: UploadFile[] = [];
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          // console.log("droppedFile.relativePath, file");

          this.media = file;
          this.mediaName = file.name;

          console.log(this.media , "yeh media hai")
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  check(){


    console.log("formData checking");
   this.uploadMediaService.checkApi()
     .subscribe(
       (response) => {
         console.log(response);
         console.log("response.status");
         if (response.status === 200) {

          console.log("yaha haiii")

         }else {
           this.message = true;
           this.errorMsg = 'Oops! Unexpected error.';
         }
       },
       (error) => {
         // handle all error cases
         console.log(error);
       }
     );

 }



  uploadMedia (){


    // console.log(this.media , "upload pe")
    const formData = new FormData();
    formData.append('myfile', this.media , this.media.name);


    // this.api.postOrderWithReportForGuard(formData)
    //       .subscribe(response => {

            

    //         console.log(response)

    //           if (response['statusCode'] == 201) {
    //             console.log("yeh haoi")
    //              // form.reset();
    //               //this.toastr.success('Successfully Selected !');
    //           }
    //       }, error => {
    //           console.log("error pe aa raha hai", error);
    //       });
   

    if (this.media.name !== undefined){

      console.log( this.media.name , " this.media.name")
     

      console.log("yaha prr toh aa gya");

      //speech
      //  const formData = new FormData();
      //  formData.append('myfile', this.media , this.media.name);
      //  console.log(formData);
       const formData = new FormData();
       formData.append('myfile', this.media , this.media.name);

       console.log(formData);
      this.uploadMediaService.uploadMedia(formData)
        .subscribe(
          (response) => {
            console.log(response);
            console.log("response.status");
            if (response.status === 200) {

              this.message = false;

              this.localStorage.set('music_maker_upload_media', response.data);
              this.localStorage.set('the_upload_file', this.media);

              // this.router.navigate(['media/detail']);
              // redirect to varification page
            }else {
              this.message = true;
              this.errorMsg = 'Oops! Unexpected error.';
            }
          },
          (error) => {
            // handle all error cases
            console.log(error);
          }
        );
    }


    
    else {

      console.log( this.media.name , " this.media.name")

      console.log("error print krdo no uplaod")

      
    }

  }

  

}
