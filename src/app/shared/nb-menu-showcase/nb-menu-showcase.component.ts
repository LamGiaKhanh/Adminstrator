import { Component, OnInit } from '@angular/core';
import {  NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from "../service/authService/auth.service";
import { RealtimeDatabaseService } from '../service/realtime-database/realtime-database.service';
import { LogtimeComponent } from '../../logtime/logtime.component'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-nb-menu-showcase',
  templateUrl: './nb-menu-showcase.component.html',
  styleUrls: ['./nb-menu-showcase.component.scss']
})
export class NbMenuShowcaseComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'User',
      icon: 'person-outline',
      link: '/users'
    },
    {
      title: 'Log times',
      icon: 'folder-outline',
      link:'/logtimes'
    },

  ];
  constructor(private service: RealtimeDatabaseService, public authService: AuthService,  private sidebarService: NbSidebarService) {

   }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
  ngOnInit(): void {
    if(this.authService.isSuperAdmin) {
      this.items.push({
        title: 'Admins',
        icon: 'lock-outline',
        link:'/admins'
      },)
    }
  } 


  

}
