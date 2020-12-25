import { Component, OnInit } from '@angular/core';
import { Admin } from '../shared/model/Admin';
import { AuthService } from "../shared/service/authService/auth.service";
import { RealtimeDatabaseService } from'../shared/service/realtime-database/realtime-database.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  constructor(public authService: AuthService) { }
  ngOnInit(): void {

  }

}
