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
  hideWhenNoUser: boolean = false;
  noData: boolean = false; 
  source : any = LocalDataSource;
  settings = {
    columns: {
      key: {
        title: 'Log time',
        filter: false
      },
      imageURL: {
        title: 'Image',
        filter: false,
        type: 'html',
        valuePrepareFunction: (imageURL) => {
          return `<img class='table-thumbnail-img' height="70" width="70" [lazyLoad]="imageURL" src="${imageURL}"/>`
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
        lt.$key = t.key as string;
        this.listLogtime.push(lt as Logtime);
        console.log(lt)
      });
      this.source = this.listLogtime;
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
    } else {
      event.confirm.reject();
    }
  }
}
