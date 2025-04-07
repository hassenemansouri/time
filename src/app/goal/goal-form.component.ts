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
  goal: Goal = { title: '', description: ''};
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

  serverError: string = '';

  saveGoal(): void {
    if (this.goal.title.trim().length < 3 || this.goal.description.trim().length < 5) {
      this.serverError = "Veuillez vérifier les champs : titre (3+) et description (5+ caractères)";
      return;
    }

    this.serverError = ''; // reset error if validation passes

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
        error: (err) => this.serverError = err.error // Récupère l'erreur du Backend
      });
    } else {
      this.goalService.createGoal(this.goal).subscribe({
        next: () => {
          console.log('Goal créé avec succès');
          this.router.navigate(['/goals']);
        },
        error: (err) => this.serverError = err.error // Récupère l'erreur du Backend
      });
    }
  }
}
