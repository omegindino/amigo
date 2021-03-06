import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Profile } from './profile';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  profileCollection: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;

  constructor(private afs: AngularFirestore) {
    this.profileCollection = this.afs.collection<Profile>('users');
    this.profiles = this.profileCollection.valueChanges();
  }

  getCollection(name: string, queryFn?: any) {
    return this.afs.collection(name, queryFn);
  }

  getProfile(uid: string) {
    return this.profileCollection.doc(uid).get();
  }

  addProfile(profile: Profile) {
    this.profileCollection.add(profile);
  }

  updateProfile(profile: Profile, uid: string) {
    this.profileCollection.doc(uid).update(profile);
  }
}
