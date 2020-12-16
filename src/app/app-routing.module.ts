import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LogtimeComponent } from './logtime/logtime.component';
import {SigninComponent} from "./signin/signin.component"
import { AuthGuardService, SecureInnerPagesGuard } from "./shared/service/authGuard/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},

  { path: 'users', 
    component: UserComponent,
    canActivate: [AuthGuardService]
    },

  { path: 'logtimes', 
    component: LogtimeComponent,
    canActivate: [AuthGuardService]
    },



  {path: "signin", 
    component: SigninComponent,
    canActivate: [SecureInnerPagesGuard]
    }

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
