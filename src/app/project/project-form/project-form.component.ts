import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit {
  project: Project = {
    id: '',
    title: '',
    description: '',
    status: 'to-do',
    startDate: undefined,
    endDate: undefined
  };
  
  isEdit: boolean = false;
projectForm: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'string') {
      this.isEdit = true;
      this.projectService.getProjectById(id).subscribe(data => {
        this.project = data;
      });
    }
  }


  saveProject(): void {
    console.log('✅ Saving project:', JSON.stringify(this.project, null, 2));

    if (this.isEdit) {
      if (!this.project.id || this.project.id === 'number') {
        console.error('❌ Error: Invalid ID');
        return;
      }
      this.projectService.updateProject(this.project.id, this.project).subscribe({
        next: () => {
          console.log('✅ Project updated successfully');
          this.router.navigate(['/projects']);
        },
        error: (err) => console.error('❌ Error updating project:', err)
      });
    } else {
      this.projectService.createProject(this.project).subscribe({
        next: () => {
          console.log('✅ Project created successfully');
          this.router.navigate(['/projects']);
        },
        error: (err) => console.error('❌ Error creating project:', err)
      });
    }
  }
}