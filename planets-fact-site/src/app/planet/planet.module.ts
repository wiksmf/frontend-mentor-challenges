import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetComponent } from './planet.component';
import { PlanetViewBtnComponent } from './planet-view-btn/planet-view-btn.component';

@NgModule({
  declarations: [
    PlanetComponent,
    PlanetViewBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlanetComponent
  ]
})
export class PlanetModule { }
