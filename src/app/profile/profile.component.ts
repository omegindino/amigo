import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uid: string;
  profile: any;
  constructor(public db: DatabaseService, public auth: AuthService, private route: ActivatedRoute) {
    this.uid = this.route.snapshot.params.id;
    // If no UID is provided, show own profile
    if (!this.uid) {
      this.uid = this.auth.uid;
    }
    this.db.getProfile(this.uid).forEach(profile => {
      this.profile = profile.data();
    });
  }

  ngOnInit() {
  }

}
