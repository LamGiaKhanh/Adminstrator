import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LogtimeComponent } from './logtime/logtime.component';
import { HomeComponent } from './home/home.component';
import { User } from './shared/model/User';
import {SigninComponent} from "./signin/signin.component"
import { AuthGuardService, SecureInnerPagesGuard, SecureAdminsPage } from "./shared/service/authGuard/auth-guard.service";
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [

    { path: 'logtimes', 
      component: LogtimeComponent ,
      canActivate: [AuthGuardService]
    },

    { path: 'users', 
      component: UserComponent,
      canActivate: [AuthGuardService]
    },
    { path: 'admins', 
      component: AdminComponent,
      canActivate: [SecureAdminsPage]
    }

    ]},
    {path: "signin", 
    component: SigninComponent,
    canActivate: [SecureInnerPagesGuard]
    }
  ]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
