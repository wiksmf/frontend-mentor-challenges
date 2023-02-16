import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { AttributionComponent } from './attribution/attribution.component';

@NgModule({
  declarations: [
    NavigationComponent,
    AttributionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    AttributionComponent
  ]
})
export class CoreModule { }
