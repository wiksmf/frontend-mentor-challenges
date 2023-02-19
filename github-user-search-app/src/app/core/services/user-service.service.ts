import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUser(userName: string): Observable<User> {
    return this.http
      .get<User>(`https://api.github.com/users/${userName}`)
      .pipe(catchError((error) => { return throwError(() => true) }));
  }
}
