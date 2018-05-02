import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts = [
    { title: "Game of Life", uri: "/game-of-life" },
    { title: "Mixing paradigms on example of PLV8", uri: "/plv8" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
