import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
task: Task = {
    name: '',
    description: '',
    createdAt: new Date(),
    dueDate: new Date(),
    priority:'LOW',
    columnId:''
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
    console.log("Données envoyées :", this.task);

    if (this.isEdit) {
      if (!this.task._id) {
        console.error('❌ Error: Invalid ID');
        return;
      }
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          console.log('✅ Task updated successfully');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('❌ Error updating task:', err)
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
