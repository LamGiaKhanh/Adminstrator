import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User} from '../../model/User';
import { Logtime } from '../../model/Logtime';


@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {
  usersRef: AngularFireList<User>;
  logsRef: AngularFireList<Logtime>;
  pendingRef : AngularFireList<Logtime>;

  public PendingCount: number = 0;
  private userPath = '/Users';
  private logPath = '/LogTimes';

  constructor( private realtimeDb: AngularFireDatabase) { }

  getUsers(): AngularFireList<User> {
    this.usersRef = this.realtimeDb.list(this.userPath) as AngularFireList<User>;
    return this.usersRef;
  }
  getUsersById(id): AngularFireList<User> {
    this.usersRef = this.realtimeDb.list(this.userPath + "/" + id) as AngularFireList<User>;
    return this.usersRef;
  }

  createUser(user: User) :any
  {
    return this.realtimeDb.object(this.userPath + '/' + user.name).set(user.id)
  }

  updateUser(user: User): Promise<void> {
      return this.realtimeDb.object(this.userPath + "/" + user.name).set(user.id);
  }

  deleteUser(key: string): Promise<void> {
    return this.realtimeDb.object(this.userPath + "/" + key).remove();
  }

  
  getLogtimes(): AngularFireList<Logtime> {
    this.logsRef = this.realtimeDb.list(this.logPath) as AngularFireList<Logtime>;
    return this.logsRef;
  }
  getPendingList(): AngularFireList<Logtime> {
    
    this.pendingRef = this.realtimeDb.list(this.logPath, ref => ref.orderByChild('status').equalTo('Pending')) as AngularFireList<Logtime>;
    return this.pendingRef;
  }

  getPendingCount()
  {
    this.realtimeDb.list(this.logPath, ref => ref.orderByChild('status').equalTo('Pending')).valueChanges().subscribe(res => { return (res.length)});
  }

  updateLogtime(lt: Logtime): Promise<void> {
    let key = lt.$key
    return this.realtimeDb.object(this.logPath + "/" + key + "/status").set(lt.status)
  }

  deleteLogtime(key): Promise<void> {
    return this.realtimeDb.object(this.logPath + "/" + key).remove();
  }


}

