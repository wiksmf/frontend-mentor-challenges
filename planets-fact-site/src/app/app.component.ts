import { Component, OnInit } from '@angular/core';

import { Planet } from './planet/planet.interface';
import { PlanetService } from './planet/planet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Planets fact site';
  planets: Planet[] = [];

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.planetService.getPlanets().subscribe(response => {
      this.planets = response;
    })
  }
}
