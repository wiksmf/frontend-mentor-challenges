import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  styleUrls: ['./skillset.component.scss']
})
export class SkillsetComponent {
  skillset = [
    { 'HTML': '4 Years Experience' },
    { 'CSS': '4 Years Experience' },
    { 'JavaScript': '4 Years Experience' },
    { 'Accessibility': '4 Years Experience' },
    { 'React': '3 Years Experience' },
    { 'Sass': '3 Years Experience' },
  ]

  constructor() { }
}
