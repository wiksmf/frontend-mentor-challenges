import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
  @ViewChild('authForm') form!: NgForm;

  onSubmit() {
    console.log(this.form);
    this.form.reset();
  }
}
