import { Component, OnInit } from '@angular/core';
import {  NbMenuItem } from '@nebular/theme';
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
      icon: 'lock-outline',
      link:'/logtimes'
    },

  ];
  constructor() {
      
   }

  ngOnInit(): void {
  }
  

}
