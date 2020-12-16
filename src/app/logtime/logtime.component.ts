import { Component, OnInit } from '@angular/core';
import { Logtime } from '../shared/model/Logtime';
import { RealtimeDatabaseService } from '../shared/service/realtime-database/realtime-database.service';

@Component({
  selector: 'app-logtime',
  templateUrl: './logtime.component.html',
  styleUrls: ['./logtime.component.scss']
})
export class LogtimeComponent implements OnInit {
  listLogtime: Logtime[] = [];
  hideWhenNoUser: boolean = false;
  noData: boolean = false; 

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

}
