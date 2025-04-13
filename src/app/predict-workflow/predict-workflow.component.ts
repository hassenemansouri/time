import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-predict-workflow',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './predict-workflow.component.html',
  styleUrl: './predict-workflow.component.css'
})
export class PredictWorkflowComponent {
  steps = '';
  actions = '';
  prediction: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  predict() {
    this.prediction = null;
    this.errorMessage = null;

    const body = { steps: this.steps, actions: this.actions };

    this.http.post<any>('http://localhost:5000/predict', body).subscribe({
      next: (response) => {
        this.prediction = response.prediction;
      },
      error: (error) => {
        console.error('Erreur :', error);
        this.errorMessage = 'Erreur lors de la prédiction. Veuillez réessayer.';
      }
    });
  }
}
