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
    {link: '/WorkspaceDash', icon: 'fas fa-briefcase', label: 'Workspaces Dashboard'},
    {link: '/WorkflowDash', icon: 'fas fa-stream', label: 'Workflows Dashboard'},
    {link: '/StrategicDash', icon: 'fas fa-users', label: 'Partnerships'},
    {link: '/PMPDash', icon: 'fas fa-project-diagram', label: 'Project Management'},
    {link: '/PerformanceManagement', icon: 'fas fa-project-diagram', label: 'Performance Management'},
    {link: '/collaborations', icon: 'fas fa-handshake', label: 'Collaborations'}
  ];

}
