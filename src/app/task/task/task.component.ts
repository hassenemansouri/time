import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [RouterModule, CommonModule],
  templateUrl: './task.component.html',
  standalone: true,
  styleUrl: './task.component.css'
})
export class TaskComponent {
tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(id: string | undefined): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      });
    }
  }

}
