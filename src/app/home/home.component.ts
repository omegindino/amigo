import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../profile';
import { DatabaseService } from '../database.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  profiles: Observable<Profile[]>;
  currentProfileId = 0;
  allProfilesViewed = false;

  constructor(public afs: DatabaseService) {
    this.profiles = this.afs.profiles;
  }

  like(profile: Profile) {
    // TODO: Implement liking
    console.log(`Liked ${profile.name}`);
    this.nextProfile();
  }

  nextProfile() {
    this.currentProfileId++;
    // Show user that they have viewed all profiles
    // TODO: Find way to count profiles, this doesn't work
    if (this.currentProfileId >= this.profiles.length) {
      this.allProfilesViewed = true;
    }
  }

}
