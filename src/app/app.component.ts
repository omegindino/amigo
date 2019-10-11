import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amigo';
  constructor(public authService: AuthService) {}
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
