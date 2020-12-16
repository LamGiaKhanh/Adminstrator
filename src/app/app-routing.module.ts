import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LogtimeComponent } from './logtime/logtime.component';
import { HomeComponent } from './home/home.component';
import { User } from './shared/model/User';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'logtimes', component: LogtimeComponent },
    { path: 'users', component: UserComponent }] },
  { path: 'login', component: LoginComponent }

 

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
