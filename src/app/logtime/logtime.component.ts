import { Component, OnInit } from '@angular/core';
import { Logtime } from '../shared/model/Logtime';
import { RealtimeDatabaseService } from '../shared/service/realtime-database/realtime-database.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-logtime',
  templateUrl: './logtime.component.html',
  styleUrls: ['./logtime.component.scss']
})
export class LogtimeComponent implements OnInit {
  listLogtime: Logtime[] = [];
  listPending: Logtime[] = [];

  hideWhenNoUser: boolean = false;
  noData: boolean = false; 
  source : any = LocalDataSource;
  pendingSource : any = LocalDataSource;

  settings = {
    actions:false,
    columns: {
      $key: {
        title: 'Log time',
        filter: false
      },
      imageURL: {
        title: 'Image',
        filter: false,
        class: 'justify-content-center',
        type: 'html',
        valuePrepareFunction: (imageURL) => {
          return `<img class='table-thumbnail-img' height="150" width="100" [lazyLoad]="imageURL" src="${imageURL}"/>`
    }
      },
      name: {
        title: 'Name',
        filter: false
      },
      time: {
        title: 'Time',
        filter: false
      },
      status: {
        title: 'Status',
        filter: false
      },
    }
  };

  settings2 = {
    edit: {
      confirmSave: true
    },
    delete:
    {
      confirmDelete: true
    },
    columns: {
      $key: {
        title: 'Log time',
        filter: false
      },
      imageURL: {
        title: 'Image',
        filter: false,
        class: 'justify-content-center',
        type: 'html',
        valuePrepareFunction: (imageURL) => {
          return `<img class='table-thumbnail-img' height="150" width="100" [lazyLoad]="imageURL" src="${imageURL}"/>`
    }
      },
      name: {
        title: 'Name',
        filter: false
      },
      time: {
        title: 'Time',
        filter: false
      },
      status: {
        title: 'Status',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Face_Checked', title: 'Face_Checked' }, { value: 'Pending', title: 'Pending' }
            ]
          }
        },
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
    this.service.getLogtimes().snapshotChanges().subscribe(res => {
      this.listLogtime.length = 0;
      res.forEach(t => {
        let lt: Logtime = new Logtime()
        
        lt = t.payload.toJSON() as Logtime;
        if (lt.status == null)
        {
          lt.status = "Pending";
        }
        lt.$key = t.key as string;
        this.listLogtime.push(lt as Logtime);
      });
      this.source = this.listLogtime;
      this.pendingSource = this.listLogtime.filter(lt => lt.status == "Pending")
    }, err => {
      debugger;
    });
  }

  dataState() {     
    this.service.getLogtimes().valueChanges().subscribe(data => {
      
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
      {
        field: 'id',
        search: query
      },
    ], false);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.service.deleteUser(event.data.name);
      this.reload();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to delete?'))
    {
      event.confirm.resolve();
      let lt: Logtime = new Logtime()
      lt.$key = event.newData.$key as string
      lt.status = event.newData.status as string
      this.service.updateLogtime(lt);
      this.reload();
    }
    else {
      event.confirm.reject();
    }
  }
}
