import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';
import {  Router } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {CommonModule,} from '@angular/common';
@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  cancel(): void {
    this.router.navigate(['/tasks']);
  }
  task: Task = {
    name: '',
    description: '',
    createdAt: new Date(),
    dueDate: new Date(),
    priority: 'LOW',
    columnId: '',
    history: [] // Initialisation de history
  };

  isEdit: boolean = false; // Assurez-vous que cette propriété existe si utilisée

  constructor(private taskService: TaskService, private router: Router) {
  
  }

  ngOnInit(): void {
    // Si vous chargez une tâche existante pour édition, assurez-vous que history est défini
    if (this.isEdit && this.task._id) {
      this.taskService.getTaskById(this.task._id).subscribe((task) => {
        this.task = {
          ...task,
          history: task.history || [] // Assurez-vous que history est toujours un tableau
        };
      });
    }
  }

  saveTask(): void {
    console.log("Données envoyées :", this.task);

    const now = new Date().toLocaleString();
    let updatedTask: Task = { ...this.task };

    if (this.isEdit) {
      if (!this.task._id) {
        console.error('❌ Error: Invalid ID');
        return;
      }
      // Créer une entrée d'historique pour la mise à jour
      const historyEntry = `Task "${this.task.name}" updated on ${now}: ${this.generateUpdateLog(this.task)}`;
      updatedTask = {
        ...this.task,
        history: [...(this.task.history || []), historyEntry]
      };

      this.taskService.updateTask(updatedTask).subscribe({
        next: () => {
          console.log('✅ Task updated successfully');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('❌ Error updating task:', err)
      });
    } else {
      // Créer une entrée d'historique pour la création
      updatedTask = {
        ...this.task,
        history: [`Task "${this.task.name}" created on ${now}`]
      };

      this.taskService.createTask(updatedTask).subscribe({
        next: () => {
          console.log('✅ Task created successfully');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('❌ Error creating task:', err)
      });
    }
  }

  private generateUpdateLog(updatedTask: Task): string {
    let log = '';
    // Comparer avec les anciennes valeurs si disponibles
    // Note : Vous devrez peut-être stocker l'ancienne tâche pour comparer
    if (this.isEdit) {
      // Exemple : supposez que vous avez accès à l'ancienne tâche via un service ou une propriété
      const oldTask = this.task; // À remplacer par la vraie ancienne tâche si nécessaire
      if (oldTask.name !== updatedTask.name) {
        log += `Name changed from "${oldTask.name}" to "${updatedTask.name}". `;
      }
      if (oldTask.description !== updatedTask.description) {
        log += `Description changed. `;
      }
      if (oldTask.dueDate !== updatedTask.dueDate) {
        log += `Due date changed from ${oldTask.dueDate} to ${updatedTask.dueDate}. `;
      }
      if (oldTask.priority !== updatedTask.priority) {
        log += `Priority changed from ${oldTask.priority} to ${updatedTask.priority}. `;
      }
      if (oldTask.columnId !== updatedTask.columnId) {
        log += `Column changed. `;
      }
    }
    return log.trim() || 'No specific changes recorded.';
  }
}