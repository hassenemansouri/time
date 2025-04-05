import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';  // Import the AuthService
import {Router, RouterLink} from '@angular/router';

import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,

    RouterLink,

    NgIf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  username: string = '';
  password: string = '';
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // Hide the animation after 26 seconds and show the workflow content
    setTimeout(() => {
      this.showAnimation = false;
    }, 26000);
  }
  showAnimation = true;  // To control if the animation is visible


  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      // Call the login method from AuthService
      this.authService.login(credentials).subscribe(
        (response) => {
          // Save the JWT token to localStorage
          this.authService.saveToken(response.token);
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);  // Navigate to a protected route after login
        },
        (error) => {
          this.errorMessage = 'Invalid username or password';
          this.router.navigate(['/dashboard']);  // Navigate to a protected route after login

          // Set error message if login fails
          console.error('Error during login', error);

        }
      );
    }
  }

  // Optional: A method for handling login manually (as you seem to be using username and password directly in your HTML)
  login(): void {
    if (this.username && this.password) {
      this.authService.login({ email: this.username, password: this.password }).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.router.navigate(['/dashboard']);
          this.errorMessage = 'Invalid username or password';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
