import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectsUrl = "../../assets/json/projects.json";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }
}
