import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profiles: Profile[] = [];
  constructor() { }

  ngOnInit() {
    // TODO: Read profiles from database
    this.profiles.push(new Profile('Jónas', 17, 'Reykjavík', 'http://orig11.deviantart.net/8fb6/f/2014/142/a/0/best_shrek_face_by_mrlorgin-d7jaspk.jpg'));
    this.profiles.push(new Profile('Konni', 19, 'Akureyri', 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.0.673.673a/10353116_282629038575426_1728129798152658038_n.jpg?_nc_cat=102&_nc_oc=AQmjRECMQwmxXtGKdkCgMEVHsG6SGs-WhSfAn-Dk7d11AEinKjdikFk2U3E70j5z1Co&_nc_ht=scontent-arn2-1.xx&oh=01d12555e3a1e8029e302bf3a316b27b&oe=5E55657E'));
  }

}
