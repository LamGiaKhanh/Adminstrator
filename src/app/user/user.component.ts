import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Observable } from 'rxjs';
import { RealtimeDatabaseService } from'../shared/service/realtime-database/realtime-database.service';
import { User } from '../shared/model/User';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})



export class UserComponent implements OnInit {
  listUsers: User[] = [];
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  source : any = LocalDataSource;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Full Name',
        filter: false
      },
      id: {
        title: 'Id',
        filter: false
      },
    }
  };


  constructor(private service: RealtimeDatabaseService) { }

  ngOnInit(): void {
    this.reload();
    this.dataState();
  }
  
  reload()
  {
    this.service.getUsers().snapshotChanges().subscribe(res => {
      this.listUsers.length = 0;
      this.source = new LocalDataSource();
      res.forEach(t => {

        let user: User = new User()
        user.name = t.key as string
        user.id = t.payload.toJSON() as Number
        this.listUsers.push(user as User);
      });
      this.source = this.listUsers;
    }, err => {
      debugger;
    });
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
