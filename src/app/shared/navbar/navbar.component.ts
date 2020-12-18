import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from '../service/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
  constructor(public authService: AuthService, private sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

}
