import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {User, UserService} from '../user/user.service';
import {UserStateService} from '../user/user-state-service.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  navItems = [
    {link: '/AllStats', icon: 'fas fa-tachometer-alt', label: 'Dashboard'},
    {link: '/calender', icon: 'fas fa-calendar-check', label: 'Calendar Overview'},
    {link: '/prediction', icon: 'fas fa-robot', label: 'AI TimeForge'},
    {link: '/workspaces', icon: 'fas fa-briefcase', label: 'Workspaces'},
    {link: '/workflows', icon: 'fas fa-stream', label: 'Workflows'},
    {link: '/partnerships', icon: 'fas fa-users', label: 'Partnerships'},
    {link: '/projects', icon: 'fas fa-project-diagram', label: 'Projects'},
    {link: '/tasks', icon: 'fas fa-tasks', label: 'Tasks'},
    {link: '/columns', icon: 'fas fa-columns', label: 'Columns'},
    {link: '/boards', icon: 'fas fa-th-large', label: 'Kanban'},
    {link: '/goals', icon: 'fas fa-bullseye', label: 'Goals'},
    {link: '/rewards', icon: 'fas fa-gift', label: 'Rewards'},
    {link: '/collaborations', icon: 'fas fa-handshake', label: 'Collaborations'}
  ];

}
