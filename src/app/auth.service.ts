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
    this.uid = this.afAuth.auth.currentUser.uid;
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
