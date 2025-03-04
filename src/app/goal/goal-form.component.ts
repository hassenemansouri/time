import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class GoalFormComponent implements OnInit {
  goal: Goal = { title: '', description: '' };
  isEdit: boolean = false;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.goalService.getGoalById(id).subscribe(data => {
        this.goal = data;
      });
    }
  }

  saveGoal(): void {
    if (this.isEdit) {
      if (!this.goal.goal_id) {
        console.error('ID invalide');
        return;
      }
      this.goalService.updateGoal(this.goal.goal_id, this.goal).subscribe({
        next: () => {
          console.log('Goal modifié avec succès');
          this.router.navigate(['/goals']);
        },
        error: (err) => console.error('Erreur lors de la modification du goal:', err)
      });
    } else {
      this.goalService.createGoal(this.goal).subscribe({
        next: () => {
          console.log('Goal créé avec succès');
          this.router.navigate(['/goals']);
        },
        error: (err) => console.error('Erreur lors de la création du goal:', err)
      });
    }
  }
}
