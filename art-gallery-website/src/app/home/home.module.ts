import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationComponent } from './pages/location/location.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';


@NgModule({
  declarations: [
    LocationComponent,
    HomeComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomeModule { }
