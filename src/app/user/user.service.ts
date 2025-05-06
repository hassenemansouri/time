// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  workspaceId: string;
  collaborationId: string;
  goalId: string;
  projectId: string;
  role: Role;
  provider?: string;
  providerId?: string;
  photoBase64?: string;       // Add this for Base64 image storage
  photoContentType?: string;
}


export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://5cc4-102-31-147-197.ngrok-free.app/timeforge/users';

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`https://5cc4-102-31-147-197.ngrok-free.app/timeforge/users/${id}`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`https://5cc4-102-31-147-197.ngrok-free.app/search?query=${query}`);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://5cc4-102-31-147-197.ngrok-free.app/allusers`);
  }

  getNamessByIds(participantIds: string[]) {
    const ids = participantIds.join(',');
    return this.http.get<User[]>(`https://5cc4-102-31-147-197.ngrok-free.app/timeforge/api/partnerships/names?ids=${ids}`);
  }
  getNamesByIds(ids: string[]): Observable<{[id: string]: string}> {
    return this.http.post<{[id: string]: string}>(
      `${this.apiUrl}/users/names`,
      { ids }
    );
  }
  uploadUserPhoto(userId: string, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<User>(`https://5cc4-102-31-147-197.ngrok-free.app/timeforge/${userId}/photo`, formData);
  }

  deleteUserPhoto(userId: string): Observable<void> {
    return this.http.delete<void>(`https://5cc4-102-31-147-197.ngrok-free.app/timeforge/${userId}/photo`);
  }
  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`https://5cc4-102-31-147-197.ngrok-free.app/timeforge/${id}`, userData);
  }

}
