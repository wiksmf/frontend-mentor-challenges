import { Component, OnInit } from '@angular/core';

import { Project } from '../project.interface';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      })
  }

}
