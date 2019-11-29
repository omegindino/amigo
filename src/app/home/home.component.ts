import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../profile';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profiles: Observable<Profile[]>;
  currentProfileId = 0;
  allProfilesViewed = false;
  profileCount = 0;

  constructor(public afs: DatabaseService, public auth: AuthService) {
    this.profiles = this.afs.profiles;
  }

  ngOnInit() {
    // Get number of profiles
    this.afs.profileCollection.snapshotChanges().forEach(collection => {
      collection.forEach(profile => {
        // Don't count user's own profile as it is hidden
        if (profile.payload.doc.data().uid !== this.auth.uid) {
          this.profileCount++;
        }
      });
    });
  }

  like(profile: Profile) {
    // TODO: Implement liking
    console.log(`Liked ${profile.name}`);
    this.nextProfile();
  }

  nextProfile() {
    this.currentProfileId++;
    // Show user that they have viewed all profiles
    if (this.currentProfileId >= this.profileCount) {
      this.allProfilesViewed = true;
    }
  }

}
