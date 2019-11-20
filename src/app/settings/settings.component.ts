import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Profile } from '../profile';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentProfile: Profile;
  settingsForm = new FormGroup({
    name: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    interests: new FormControl(''),
  });

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

    // TODO: Make run after initializing currentProfile
    this.settingsForm.setValue({
      name: this.currentProfile.name,
      imageUrl: this.currentProfile.imageUrl,
      description: this.currentProfile.description,
      location: this.currentProfile.location,
      interests: '',
    });
  }

  updateSettings(event: Event) {
    console.log(event);
  }

}
