import { Component, OnInit, AfterViewChecked } from '@angular/core';
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
  matchedProfiles: Profile[] = [];
  currentProfileIndex = 0;
  allProfilesViewed = false;
  myProfile: any;

  constructor(public afs: DatabaseService, public auth: AuthService) {
    this.profiles = this.afs.profiles;
  }

  async ngOnInit() {
    // Get user's profile
    await this.afs.getProfile(this.auth.uid).forEach(p => {
      this.myProfile = p.data();
    });

    this.profiles.forEach(profiles => {
      // Loop through all profiles
      profiles.forEach(profile => {
        // Use try/catch to prevent loop from stopping if interests cannot be accessed
        try {
          // If profile has any common interests with user, add profile to matchedProfiles
          if (this.myProfile.interests.some(interest => profile.interests.includes(interest))) {
            // Do not add user's own profile
            if (profile.uid !== this.myProfile.uid) {
              this.matchedProfiles.push(profile);
            }
          }
        } catch (e) {
          console.log(e);
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
    this.currentProfileIndex++;
    // Show user that they have viewed all profiles
    if (this.currentProfileIndex >= this.matchedProfiles.length) {
      this.allProfilesViewed = true;
    }
  }

}
