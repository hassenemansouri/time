import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
task: Task = {
    id: '',
    title: '',
    description: '',
    createdDate: undefined,
    dueDate: undefined,
    status: 'pending',
    priority:'low'
  };
  
  isEdit: boolean = false;
taskForm: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'string') {
      this.isEdit = true;
      this.taskService.getTaskById(id).subscribe(data => {
        this.task = data;
      });
    }
  }


  saveTask(): void {
    console.log('✅ Saving task:', JSON.stringify(this.task, null, 2));

    if (this.isEdit) {
      if (!this.task.id || this.task.id === 'string') {
        console.error('❌ Error: Invalid ID');
        return;
      }
      this.taskService.updateTask(this.task.id, this.task).subscribe({
        next: () => {
          console.log('✅ Project updated successfully');
          this.router.navigate(['/projects']);
        },
        error: (err) => console.error('❌ Error updating project:', err)
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          console.log('✅ Task created successfully');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('❌ Error creating task:', err)
      });
    }
  }
}
