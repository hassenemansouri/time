import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { GoalService } from './goal.service';
import { Goal } from './goal.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css'],
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListGoalsComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService, private router: Router) {}

  showAnimation = true;  // To control if the animation is visible

  ngOnInit(): void {
    this.loadGoals();;
    // Hide the animation after 5 seconds and show the workflow content
    setTimeout(() => {
      this.showAnimation = false;
    }, 6000);
  }


  loadGoals(): void {
    this.goalService.getAllGoals().subscribe(data => {
      this.goals = data;
    });
  }

  deleteGoal(id: string | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer ce goal ?')) {
      this.goalService.deleteGoal(id).subscribe(() => {
        this.goals = this.goals.filter(g => g.goal_id !== id);
      });
    }
  }
}
