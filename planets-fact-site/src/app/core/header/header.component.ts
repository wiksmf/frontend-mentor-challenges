import { Component, Input } from '@angular/core';

import { Planet } from 'src/app/planet/planet.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() planets: Planet[] = [];
  isMenuOpen: boolean = false;

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
