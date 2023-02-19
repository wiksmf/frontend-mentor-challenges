import { Component } from '@angular/core';

import { ColorSchemeService } from '../../services/color-scheme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  activeTheme!: string;

  constructor(private colorSchemeService: ColorSchemeService) {
    this.activeTheme = this.colorSchemeService.currentActive();
  }

  public setTheme(): void {
    this.activeTheme = this.activeTheme === 'dark' ? 'light' : 'dark';
    this.colorSchemeService.updateTheme(this.activeTheme);
  }
}
