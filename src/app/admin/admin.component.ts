import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Admin } from '../shared/model/Admin';
import { RealtimeDatabaseService } from '../shared/service/realtime-database/realtime-database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  listAdmins: Admin[] = [];
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  source : any = LocalDataSource;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
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
      gmail: {
        title: 'Gmail',
        filter: false
      },
      permission: {
        title: 'Permission',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'admin', title: 'Admin' }, { value: 'superAdmin', title: 'Super Admin' }
            ]
          }
        },
        filter: false
      },
    }
  };


  constructor(private service: RealtimeDatabaseService) { 
    this.source = new LocalDataSource();
  }

  ngOnInit(): void {
    this.reload();
    this.dataState();
  }
  
  reload()
  {
    this.service.getAdmin().snapshotChanges().subscribe(res => {
      this.listAdmins.length = 0;
      this.source = new LocalDataSource();
      res.forEach(t => {

        let ad: Admin = new Admin()
        
        ad = t.payload.toJSON() as Admin;
        ad.name = t.key as string;
        this.listAdmins.push(ad as Admin);
      });
      this.source = this.listAdmins;
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
  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'name',
        search: query
      },
    ], false);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.service.deleteAdmin(event.data.name);
      this.reload();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event):void {

      let ad: Admin = new Admin()
      ad.name = event.newData.name as string
      ad.gmail = event.newData.gmail as string
      ad.permission = event.newData.permission as string

      this.service.updateAdmin(ad);
      this.reload();
      event.confirm.resolve(event.newData);
      this.refresh();

  }


  onCreateConfirm(event):void {
      let ad: Admin = new Admin()
      ad.name = event.newData.name as string
      ad.gmail = event.newData.gmail as string
      ad.permission = event.newData.permission as string

      this.service.createAdmin(ad);
      this.reload();
      event.confirm.resolve(event.newData);

  } 
  refresh(): void {
    window.location.reload();
  }

}
