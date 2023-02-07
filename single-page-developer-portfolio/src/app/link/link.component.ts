import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() name: string = '';
  @Input() url: string = '';

  constructor() { }

  ngOnInit(): void { }

}
