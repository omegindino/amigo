import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amigo';
  friendsCount: number;
  // to do: make this list so that the users here automatically get added to the page
  onlineFriendsList = [
    {name: "Victor_733", imageUrl: "https://lh3.googleusercontent.com/-wG7j5SzpXXY/VBwE7yvofEI/AAAAAAAAAAw/mf40YBhUugsqniIWBeglnDwX0PKnBQmZgCEwYBhgL/w140-h140-p/2014-09-19.jpg"},
    {name: "Birkir", imageUrl: "https://cdn.discordapp.com/attachments/575446133103394827/649891994721583115/IMG-4612.JPG"},
  ]
  offlineFriendsList = [
    {name: "Reynir Aron", imageUrl: "https://miro.medium.com/max/3150/1*VLD9nu6jQCdYRpj4EnXffw.png"}
  ]
  loading = false;

  constructor(public authService: AuthService, private router: Router) {
    this.friendsCount = this.onlineFriendsList.length + this.offlineFriendsList.length;
    // Loading progress bar
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  // Set user UID on init
  ngOnInit() {
    this.authService.setUid();
  }
}
