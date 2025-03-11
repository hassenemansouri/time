import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StrategicPartnership {
  id: string;
  name: string;
  description: string;
  // Add any other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class StrategicPartnershipService {

  private apiUrl = 'http://localhost:8100/timeforge/api/partnerships'; // Change this URL based on your backend URL

  constructor(private http: HttpClient) {}

  // Get all partnerships
  getAllPartnerships(): Observable<StrategicPartnership[]> {
    return this.http.get<StrategicPartnership[]>(this.apiUrl);
  }

  // Get a partnership by ID
  getPartnershipById(id: string): Observable<StrategicPartnership> {
    return this.http.get<StrategicPartnership>(`${this.apiUrl}/${id}`);
  }

  // Add a new partnership
  addPartnership(partnership: StrategicPartnership): Observable<StrategicPartnership> {
    return this.http.post<StrategicPartnership>(`${this.apiUrl}/add`, partnership);
  }

  // Delete a partnership by ID
  deletePartnership(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
