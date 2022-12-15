import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  {path: 'planet/:name', component: PlanetComponent},
  {path: '', pathMatch: 'full', redirectTo: 'planet/earth'},
  {path: '**', redirectTo: 'planet/earth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
