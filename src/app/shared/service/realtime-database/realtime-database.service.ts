import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {
  usersRef: AngularFireList<User>;
  usersRef2: AngularFireList<any>;

  users: Observable<any[]>;
  constructor( private realtimeDb: AngularFireDatabase, private http: HttpClient) { }

  getUsers(): AngularFireList<User> {
    this.usersRef = this.realtimeDb.list('/Users') as AngularFireList<User>;
    return this.usersRef;
  }

  getLogtimes(): AngularFireList<User> {
    this.usersRef = this.realtimeDb.list('/LogTimes') as AngularFireList<User>;
    return this.usersRef;
  }
}

