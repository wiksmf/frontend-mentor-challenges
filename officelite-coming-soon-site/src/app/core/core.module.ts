import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AttributionComponent } from './components/attribution/attribution.component';


@NgModule({
  declarations: [
    AttributionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    AttributionComponent,
  ]
})
export class CoreModule { }
