import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoalService } from './goal.service';
import { Goal } from './goal.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css'],
  standalone: true,
  imports: [NgForOf, RouterLink]
})
export class ListGoalsComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private goalService: GoalService, private router: Router) {}

  ngOnInit(): void {
    this.loadGoals();
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
