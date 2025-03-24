import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private apiUrl = 'http://localhost:8400/timeforge/projects';
 
   constructor(private http: HttpClient) {}
 
 
   getAllTasks(): Observable<Task[]> {
     return this.http.get<Task[]>(`${this.apiUrl}/getAllTasks`);
   }
 
   getTaskById(id: string): Observable<Task> {
     return this.http.get<Task>(`${this.apiUrl}/getTaskById/${id}`);
   }
 
   private httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
 
   createTask(task: Task): Observable<Task> {
     return this.http.post<Task>(`${this.apiUrl}/create`, task, this.httpOptions);
   }
 
   updateTask(id: string | undefined, task: Task): Observable<Task> {
     return this.http.put<Task>(`${this.apiUrl}/update/${id}`, task);
   }
 
   deleteTask(id: string | undefined): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
   }
}
