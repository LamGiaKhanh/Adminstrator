import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from '../service/authService/auth.service';
import { Admin } from '../model/Admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  admin: Admin = new Admin()

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
  constructor(public authService: AuthService, private sidebarService: NbSidebarService) { }

  ngOnInit(): void {
    let admin = JSON.parse(localStorage.getItem('admin')) as Admin
    this.admin = admin
  }

}
