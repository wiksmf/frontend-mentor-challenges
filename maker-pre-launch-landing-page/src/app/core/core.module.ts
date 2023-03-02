import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributionComponent } from './components/attribution/attribution.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AttributionComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributionComponent,
    HeaderComponent,
  ]
})
export class CoreModule { }
