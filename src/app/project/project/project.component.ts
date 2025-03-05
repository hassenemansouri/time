import { ProjectService } from '../project.service';
import {CommonModule, NgForOf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project',
  imports: [RouterModule,CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
    });
  }

  deleteProject(id: string | undefined): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
      });
    }
  }

}
