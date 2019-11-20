import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Profile } from '../profile';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentProfile: Profile;

  constructor(public db: DatabaseService, public auth: AuthService) {
    // Create a default profile to use if for some reason fetching the information fails
    this.currentProfile = {
      uid: '',
      name: '',
      age: NaN,
      location: '',
      description: '',
      imageUrl: ''
    };
  }

  ngOnInit() {
    // Go through profiles and find user's own profile
    this.db.profiles.forEach(profiles => profiles.forEach(profile => {
      if (!this.auth.uid) {
        return;
      }
      if (profile.uid === this.auth.uid) {
        this.currentProfile = profile;
        return;
      }
    }));
  }

  updateSettings(event: Event) {
    console.log(event);
  }

}
