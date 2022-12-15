import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from './planet.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  planetsUrl = '../../assets/json/planets.json';

  constructor(private http: HttpClient) { }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.planetsUrl);
  }
}
