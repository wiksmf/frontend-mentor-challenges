import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributionComponent } from './components/attribution/attribution.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AttributionComponent,
    ThemeSwitcherComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttributionComponent,
    ThemeSwitcherComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
