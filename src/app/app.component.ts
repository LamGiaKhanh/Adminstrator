import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Note {
  content: string;
  hearts: number;
  id?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  constructor (private afs: AngularFirestore)
  {
    
  }

  ngOnInit() {
    this.notesCollection = this.afs.collection('notes')
    this.notes = this.notesCollection.valueChanges()
  }

  title = 'LogtimeManagement';
}
