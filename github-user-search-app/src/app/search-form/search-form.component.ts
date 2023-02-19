import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../core/models/user.interface';
import { UserServiceService } from '../core/services/user-service.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() githubUser = new EventEmitter<User>();
  userSearchForm!: FormGroup;
  errorUserNotFound: boolean = false;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userSearchForm = new FormGroup({
      username: new FormControl('', Validators.required)
    })
  }

  onSubmit(): void {
    this.userService
      .getUser(this.userSearchForm.value.username)
      .subscribe({
        next: (user: User) => {
          this.errorUserNotFound = false;
          this.githubUser.emit(user);
        },
        error: (error) => this.errorUserNotFound = error
      });
  }

}
