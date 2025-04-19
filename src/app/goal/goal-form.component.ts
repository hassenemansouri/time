import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule]
})
export class GoalFormComponent implements OnInit {
  goal: Goal = { title: '', description: '' };
  isEdit = false;
  serverError = '';
  newCategory = {
    libelle: '',
    description: ''
  };

  newRule = {
    field: 5,   // Calendar.DAY_OF_YEAR
    amount: 1
  };


  constructor(private goalService: GoalService, private route: ActivatedRoute, public router: Router) {}

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
    if (this.goal.title.trim().length < 3 || this.goal.description.trim().length < 5) {
      this.serverError = 'Veuillez remplir les champs correctement.';
      return;
    }

    // Vérifier que la catégorie est correctement remplie
    if (!this.newCategory.libelle) {
      this.serverError = 'Complétez la catégorie.';
      return;
    }

    const payload = {
      goal: {
        title: this.goal.title,
        description: this.goal.description,
        startDate: this.goal.startDate,
        endDate: null // Laisser la date de fin vide si non applicable
      },
      categorie: {
        libelle: this.newCategory.libelle,
        description: this.newCategory.description
      }
    };

    this.goalService.createGoalWithCategories(payload).subscribe({
      next: () => {
        this.router.navigate(['/goals']);
      },
      error: (err) => this.serverError = err.error
    });
  }
}
