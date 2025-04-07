import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { Categorie } from './categorie.model';
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
  isEdit: boolean = false;
  serverError: string = '';
  categories: Categorie[] = [];
  selectedCategoryId: string = '';

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.goalService.getAllCategories().subscribe(cats => {
      this.categories = cats;

      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isEdit = true;
        this.goalService.getGoalById(id).subscribe(data => {
          this.goal = data;
          if (data.categories && data.categories.length > 0) {
            this.selectedCategoryId = data.categories[0].categorie_id!;
          }
          this.calculateEndDate();
        });
      }
    });
  }

  calculateEndDate(): void {
    if (!this.goal.startDate || !this.selectedCategoryId) return;

    const startDate = new Date(this.goal.startDate);
    let endDate = new Date(startDate);
    const selectedCat = this.categories.find(c => c.categorie_id === this.selectedCategoryId);

    if (selectedCat) {
      const lib = selectedCat.libelle.toLowerCase();
      switch (lib) {
        case 'urgence': endDate.setHours(endDate.getHours() + 12); break;
        case 'pomodoro': endDate.setMinutes(endDate.getMinutes() + 25); break;
        case 'projet court': endDate.setDate(endDate.getDate() + 7); break;
        case 'projet moyen': endDate.setMonth(endDate.getMonth() + 1); break;
        case 'projet long': endDate.setMonth(endDate.getMonth() + 6); break;
        case 'objectif perseonnl': endDate.setMonth(endDate.getMonth() + 3); break;
        case 'objectif professionnel': endDate.setFullYear(endDate.getFullYear() + 1); break;
        case 'santé': endDate.setDate(endDate.getDate() + 1); break;
        case 'collaboration': endDate.setDate(endDate.getDate() + 14); break;
        case 'apprentissage': endDate.setDate(endDate.getDate() + 28); break;
        case 'milestone': endDate.setMonth(endDate.getMonth() + 2); break;
        case 'analyse productivité': endDate.setDate(endDate.getDate() + 30); break;
        default: endDate.setDate(endDate.getDate() + 3); break;
      }
      this.goal.endDate = endDate;
    }
  }

  saveGoal(): void {
    if (this.goal.title.trim().length < 3 || this.goal.description.trim().length < 5) {
      this.serverError = "Veuillez vérifier les champs : titre (3+) et description (5+ caractères)";
      return;
    }

    const selectedCat = this.categories.find(c => c.categorie_id === this.selectedCategoryId);
    if (selectedCat) {
      this.goal.categories = [selectedCat];
    }

    this.serverError = '';

    if (this.isEdit) {
      if (!this.goal.goal_id) {
        console.error('ID invalide');
        return;
      }
      this.goalService.updateGoal(this.goal.goal_id, this.goal).subscribe({
        next: () => this.router.navigate(['/goals']),
        error: (err) => this.serverError = err.error
      });
    } else {
      this.goalService.createGoal(this.goal).subscribe({
        next: () => this.router.navigate(['/goals']),
        error: (err) => this.serverError = err.error
      });
    }
  }
}
