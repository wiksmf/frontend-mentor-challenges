import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  constructor() { }

  onSubmit(subscribeForm: NgForm) {
    console.log(subscribeForm.value.email)
  }
}
