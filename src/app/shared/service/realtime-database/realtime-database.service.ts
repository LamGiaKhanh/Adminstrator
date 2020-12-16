import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../../model/User';
import { Logtime } from '../../model/Logtime';


@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {
  usersRef: AngularFireList<User>;
  logsRef: AngularFireList<Logtime>;
  private userPath = '/Users';
  private logPath = '/LogTimes';

  constructor( private realtimeDb: AngularFireDatabase, private http: HttpClient) { }

  getUsers(): AngularFireList<User> {
    this.usersRef = this.realtimeDb.list(this.userPath) as AngularFireList<User>;
    return this.usersRef;
  }

  getLogtimes(): AngularFireList<Logtime> {
    this.logsRef = this.realtimeDb.list(this.logPath) as AngularFireList<Logtime>;
    return this.logsRef;
  }

  createUser(user: User) :any
  {
    return this.usersRef.push({name: user.name, id: user.id});
  }

  deleteUser(key: string): Promise<void> {
    return this.realtimeDb.object(this.userPath + "/" + key).remove();
  }

}

