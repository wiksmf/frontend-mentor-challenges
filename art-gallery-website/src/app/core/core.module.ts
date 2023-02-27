import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './components/footer/footer.component';
import { AttributionComponent } from './components/attribution/attribution.component';


@NgModule({
  declarations: [
    AttributionComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    AttributionComponent,
    FooterComponent
  ]
})
export class CoreModule { }
