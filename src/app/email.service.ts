import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://5cc4-102-31-147-197.ngrok-free.app/timeforge/api/email/send ';  // URL to the email microservice

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Attach the token
    });

    return this.http.post<any>(this.apiUrl, emailData, { headers });
  }
}
