import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from './auth.interceptor';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from './auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Add this interceptor to the chain
    },
    JwtHelperService,  // Register the JwtHelperService
    AuthService        // Register the AuthService
  ],
})
export class AppComponent implements OnInit {
  title = 'WorkspaceWorkflow';

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit() {
    // Check if the user is authenticated on app load
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
        // Optionally redirect to the login page if not authenticated
        this.router.navigate(['/login']);
      }
    });
  }
}
