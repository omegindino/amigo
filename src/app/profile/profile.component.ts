import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = {
    name: 'Tristan Sedu',
    age: 69,
    location: 'Reykjavík',
    imageUrl: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/s960x960/20645102_10154816244487322_8746586185290912281_o.jpg?_nc_cat=108&_nc_oc=AQkMOpnHKqnrdEhjb34vvzyRuVX5inXgRf8MOBlbIBSL_JsIQOVrz4zN8jiLIw_Kn7E&_nc_ht=scontent-arn2-1.xx&oh=191197c70e7b74b6f6af1c86435c9238&oe=5E5E2F19',
    description: 'Rosa Helikopter'
  }
  constructor() { }

  ngOnInit() {
  }

}
