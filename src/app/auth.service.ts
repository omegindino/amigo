import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  uid: string;

  constructor(private afAuth: AngularFireAuth, public db: DatabaseService) {
    this.user = afAuth.authState;
  }
  async login() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.setUid();
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  // Store user UID
  setUid() {
    this.afAuth.user.forEach(user => {
      if (!user) {
        return;
      }
      this.uid = user.uid;
    });
  }
}
