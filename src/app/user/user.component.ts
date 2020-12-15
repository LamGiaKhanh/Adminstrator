import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Observable } from 'rxjs';
import { RealtimeDatabaseService } from'../shared/service/realtime-database/realtime-database.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})



export class UserComponent implements OnInit {
  listUsers: User[] = [];
  hideWhenNoUser: boolean = false;
  noData: boolean = false; 


  constructor(private service: RealtimeDatabaseService) { }

  ngOnInit(): void {
    this.service.getUsers().snapshotChanges().subscribe(res => {
      this.listUsers.length = 0;
      res.forEach(t => {
        let user: User = new User()
        user.name = t.key as string
        user.id = t.payload.toJSON() as Number
        console.log(user)
        this.listUsers.push(user as User);
      });
    }, err => {
      debugger;
    });
    this.service.getUsers2().subscribe (data => {
      this.listUsers.push(data);
    })
  }

  dataState() {     
    this.service.getUsers().valueChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.hideWhenNoUser = false;
        this.noData = true;
      } else {
        this.hideWhenNoUser = true;
        this.noData = false;
      }
    })
  }

}
