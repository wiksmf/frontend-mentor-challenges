import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Slider } from '../slider.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],

})
export class SliderComponent implements OnInit {
  slides!: Slider[];
  maxSlideIndex!: number;
  selectedIndex = 0;
  translateX = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.slides = response;
      this.maxSlideIndex = Math.ceil(this.slides.length / 2);

    })
  }

  previousSlide() {
    this.selectedIndex--;
    this.translateSlide();
  }

  nextSlide() {
    this.selectedIndex++;
    this.translateSlide();
  }

  translateSlide() {
    if (Math.abs(this.selectedIndex) === this.maxSlideIndex) this.selectedIndex = 0;
    this.translateX = 100 * (this.selectedIndex * -1);
  }

}
