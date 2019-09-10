
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//import { AuthGuard } from './shared/auth-guard.service';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';


const appRoutes: Routes = [
        { path: 'signup', component: SignupComponent},
        { path: 'signin', component: SigninComponent},
        { path: 'drag', component: DragDropComponent},
      { path: '**', redirectTo: '/'} // wild card route
 ];
 @NgModule({
    imports: [RouterModule.forRoot(appRoutes , { useHash: true })],
    exports: [RouterModule]
 })
 export class AppRoutingModule {
 }