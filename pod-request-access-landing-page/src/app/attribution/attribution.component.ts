import { Component } from "@angular/core";

@Component({
  selector: 'app-attribution',
  templateUrl: './attribution.component.html'
})
export class AttributionComponent {
  showAttribution: boolean = false;

  onToggleDetails() {
    this.showAttribution = !this.showAttribution;
  }

  onHideDetails() {
    this.showAttribution = false;
  }
}
