import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  profileCollectionRef: AngularFirestoreCollection<Profile>;
  profiles$: Observable<Profile[]>;

  constructor(private firestore: AngularFirestore) {
    this.profileCollectionRef = this.firestore.collection<Profile>('users');
    this.profiles$ = this.profileCollectionRef.valueChanges();
    this.profiles$.forEach(profile => console.log(profile));
  }
}
