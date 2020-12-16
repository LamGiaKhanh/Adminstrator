import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LogtimeComponent } from './logtime/logtime.component';


const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'logtimes', component: LogtimeComponent },
  { path: '', component: UserComponent }

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
