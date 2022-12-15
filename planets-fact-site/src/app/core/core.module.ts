import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { AttributionComponent } from './attribution/attribution.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AttributionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    AttributionComponent
  ]
})
export class CoreModule { }
