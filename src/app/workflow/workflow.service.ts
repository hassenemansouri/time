import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Workflow} from './workflow.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class WorkflowService {
  private apiUrl = 'http://localhost:8500/timeforge/workflows';

  constructor(private http: HttpClient) {}


  getAllWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.apiUrl}/getAllWorkflows`);
  }

  getWorkflowById(id: string): Observable<Workflow> {
    return this.http.get<Workflow>(`${this.apiUrl}/getWorkflowById/${id}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.apiUrl}/create`, workflow, this.httpOptions);
  }

  updateWorkflow(id: string | undefined, workflow: Workflow): Observable<Workflow> {
    return this.http.put<Workflow>(`${this.apiUrl}/update/${id}`, workflow);
  }

  deleteWorkflow(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  uploadFile(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/files/upload`, formData);
  }

  downloadFile(workflowId: string | undefined, fileName: string | undefined): Observable<Blob> {
    const url = `${this.apiUrl}/${workflowId}/files/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }


}
