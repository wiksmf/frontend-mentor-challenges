import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planet-view-btn',
  templateUrl: './planet-view-btn.component.html',
  styleUrls: ['./planet-view-btn.component.scss']
})
export class PlanetViewBtnComponent {
  @Input() planet: string | undefined = '';
  @Output() newPlanetEvent = new EventEmitter<string>();
  selectedView: string = 'overview';

  constructor(private router: Router) {
    router.events.subscribe(_ => {
      this.selectedView = 'overview';
    })
  }

  onUpdateView(view: string) {
    this.selectedView = view;
    this.newPlanetEvent.emit(view);
  }
}
