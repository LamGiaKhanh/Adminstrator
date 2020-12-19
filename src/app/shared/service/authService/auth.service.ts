import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RealtimeDatabaseService } from '../realtime-database/realtime-database.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Admin } from '../../model/Admin';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  listAdmins: Admin[] = [];

  source: any = LocalDataSource;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public service: RealtimeDatabaseService
  ) {    
    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
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
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.router.navigate(['/users']);
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

  // ifExist(gmail:string): any {
    
  //   this.service.getAdmin().snapshotChanges().subscribe(res => {
  //     this.listAdmins.length = 0;
  //     this.source = new LocalDataSource();

  //     res.forEach(t => {

  //       let ad: Admin = new Admin()
        
  //       ad = t.payload.toJSON() as Admin;
  //       ad.name = t.key as string;
  //       if (ad.gmail == gmail)
  //       {
  //         this.listAdmins.push(ad);
  //       }
  //     });
  //     this.source = this.listAdmins;
  //     console.log(this.source.count);


  //   }, err => {
  //     debugger;
  //   });
     
  // }

}