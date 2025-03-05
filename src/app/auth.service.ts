import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "./environments/environment";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/timeforge/auth`;  // Base URL for your API (adjust accordingly)


  constructor(private http: HttpClient,private router: Router) {}
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('jwtToken');
    return of(!!token); // Returns true if a token exists, false otherwise
  }
  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
  // Login and get JWT token
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Save the JWT token to localStorage (or any other method you prefer)
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Get the JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }



  // Logout (remove JWT token)
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  // Send HTTP requests with JWT token (for protected routes)
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
