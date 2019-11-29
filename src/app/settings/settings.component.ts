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
    age: new FormControl(''),
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
      imageUrl: '',
      interests: []
    };
  }

  ngOnInit() {
    // Get user profile by UID
    this.db.getProfile(this.auth.uid).forEach(profile => {
      const profileData = profile.data();
      for (const property in profile.data()) {
        if (profileData[property]) {
          this.currentProfile[property] = profileData[property];
        }
      }
      // Set form values
      this.settingsForm.patchValue({
        name: this.currentProfile.name,
        age: this.currentProfile.age,
        imageUrl: this.currentProfile.imageUrl,
        description: this.currentProfile.description,
        location: this.currentProfile.location,
        interests: this.currentProfile.interests.join(', '),
      });
    });
    return;
  }

  onSubmit() {
    // Split comma separated list of interests to array for submitting
    const profileToSubmit = this.settingsForm.value;
    profileToSubmit.interests = profileToSubmit.interests.split(', ');
    this.db.updateProfile(profileToSubmit, this.auth.uid);
  }

}
