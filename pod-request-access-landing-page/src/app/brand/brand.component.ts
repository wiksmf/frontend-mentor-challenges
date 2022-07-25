import { Component } from "@angular/core";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html'
})
export class BrandComponent {
  brands = ['spotify', 'apple-podcast', 'google-podcasts', 'pocket-casts'];
}
