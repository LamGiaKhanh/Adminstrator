import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RealtimeDatabaseService } from '../realtime-database/realtime-database.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Admin } from '../../model/Admin';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  userData: any;
  adminList: Admin[] = [];

  source: any = LocalDataSource;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public service: RealtimeDatabaseService
  ) {    
    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (this.isValid(user.email)) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null ? true: false);
  }

  // Sign in with Google
  GoogleAuth() {
    this.service.getAdmin().snapshotChanges().subscribe(res => {
      res.forEach(t => {
        let admin: Admin = new Admin()
        admin = t.payload.toJSON() as Admin
        this.adminList.push(admin)
      });
    }, err => {
      debugger;
    });
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      if (this.isValid(result.user.email)) {
        localStorage.setItem('user', JSON.stringify(this.userData));  
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 10);
        
        
      }

    }).catch((error) => {
      window.alert(error)
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    })
  }


  isValid(mail: string): boolean {
    for (let i = 0; i < this.adminList.length; i++) {
      if (this.adminList[i].gmail == mail) {
        return true
      }
    }
    return false
  }

}