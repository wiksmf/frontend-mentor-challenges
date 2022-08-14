import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss']
})
export class AttributionComponent {
  showAttribution: boolean = false;

  constructor() { }

  onToggleDetails() {
    this.showAttribution = !this.showAttribution;
  }

  onHideDetails() {
    this.showAttribution = false;
  }
}
