import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  }

  onSubmit(contactForm: FormGroup) {
    this.http.post(
      'https://maker-pre-launch-lp-default-rtdb.firebaseio.com/post.json',
      contactForm.value
    ).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    })
  }
}
