import { Component, OnInit } from '@angular/core';

import { User } from './core/models/user.interface';
import { UserServiceService } from './core/services/user-service.service';
import { ColorSchemeService } from './core/services/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserServiceService,
    private colorSchemeService: ColorSchemeService
  ) {
    this.colorSchemeService.loadTheme();
  }

  ngOnInit() {
    this.userService
      .getUser('wiksmf')
      .subscribe((user: User) => { this.user = user })
  }

  githubUser(user: User): void {
    this.user = user;
  }
}
