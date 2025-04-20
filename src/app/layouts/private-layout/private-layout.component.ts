import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit {

  user: { name: string } | null = null;


  constructor(private router: Router) {}

  ngOnInit(): void {
    // Example: Fetch user data (replace with real AuthService logic)
    this.user = JSON.parse(localStorage.getItem('user') || '{}'); // Assuming user is stored in localStorage
  }
  toggleSidebar() {
    const wrapper = document.getElementById('wrapper');
    wrapper?.classList.toggle('toggled');
  }


  logout(): void {
    // Clear the token and user data from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
