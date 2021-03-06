import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from '../service/authService/auth.service';
import { Admin } from '../model/Admin';
import firebase from 'firebase/app'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  admin: Admin = new Admin()
  user: firebase.User


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    let admin = JSON.parse(localStorage.getItem('admin')) as Admin
    this.user =  JSON.parse(localStorage.getItem('user')) as firebase.User    
    this.admin = admin
  }

}
