import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {
    // Example: Fetch user data (replace with real AuthService logic)
    this.user = JSON.parse(localStorage.getItem('user') || '{}'); // Assuming user is stored in localStorage
  }
  toggleSidebar() {
    const wrapper = document.getElementById('wrapper');
    wrapper?.classList.toggle('toggled');
  }


}
