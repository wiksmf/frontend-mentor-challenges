import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Slider } from './slider.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projectsURL = '../assets/json/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.projectsURL);
  }
}
