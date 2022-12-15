import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Planet } from './planet.interface';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet: Planet | undefined;
  planetView: any = {};
  selectedView: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private planetService: PlanetService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let planetName = params.get('name');
      this.getPlanet(planetName);
    })
  }

  getPlanet(planetName: any) {
    this.planetService.getPlanets().subscribe(response => {
      this.planet = response.filter(planet => planet.name === planetName)[0];
      this.onUpdate('overview');
    })
  }

  onUpdate(view: any) {
    if (view === 'overview') {
      this.planetView.content = this.planet?.overview.content;
      this.planetView.source = this.planet?.overview.source;
      this.planetView.image = this.planet?.images.planet;
    } else if (view === 'structure') {
      this.planetView.content = this.planet?.structure.content;
      this.planetView.source = this.planet?.structure.source;
      this.planetView.image = this.planet?.images.internal;
    } else {
      this.planetView.content = this.planet?.geology.content;
      this.planetView.source = this.planet?.geology.source;
      this.planetView.image = this.planet?.images.geology;
    }

    this.selectedView = view;
  }
}
