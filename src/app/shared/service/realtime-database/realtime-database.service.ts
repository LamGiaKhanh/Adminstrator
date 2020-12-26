import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User} from '../../model/User';
import { Logtime } from '../../model/Logtime';
import { Admin } from '../../model/Admin';


@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {
  usersRef: AngularFireList<User>;
  logsRef: AngularFireList<Logtime>;
  pendingRef : AngularFireList<Logtime>;
  adminsRef :AngularFireList<Admin>;
  public userData: any;

  public PendingCount: number = 0;
  private userPath = '/Users';
  private logPath = '/LogTimes';
  private vectorPath = '/All vectors';
  private kmvectorPath = '/K-mean Vectors';
  private adminPath = '/Admin';


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

  deleteVector(key: string): Promise<void> {
    console.log(key);
    return this.realtimeDb.object(this.vectorPath + "/" + key).remove();
  }

  deleteKmVector(key: string): Promise<void> {
    for (let i = 0; i < 2 ; i++)
    {
      return this.realtimeDb.object(this.kmvectorPath + "/" + key).remove();
    }
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

  createAdmin(ad: Admin) :any
  {
    return this.realtimeDb.object(this.adminPath + '/' + ad.name).update({gmail: ad.gmail, permission: ad.permission});
  }

  getAdmin(): AngularFireList<Admin> {
    this.adminsRef = this.realtimeDb.list(this.adminPath) as AngularFireList<Admin>;
    return this.adminsRef;
  }

  updateAdmin(ad: Admin): Promise<void> {
    return this.realtimeDb.object(this.adminPath + "/" + ad.name).update({gmail: ad.gmail, permission: ad.permission});
  }

  deleteAdmin(key): Promise<void> {
    return this.realtimeDb.object(this.adminPath + "/" + key).remove();
  }




}

