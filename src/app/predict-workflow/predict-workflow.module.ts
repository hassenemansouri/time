import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictWorkflowComponent } from './predict-workflow.component';
import { FormsModule } from '@angular/forms';  // Pour ngModel, si nécessaire

@NgModule({
  declarations: [],
  imports: [
    CommonModule,  // Ajoutez CommonModule ici
    FormsModule,
    PredictWorkflowComponent,
    // Si vous utilisez ngModel pour les formulaires
  ],
  exports: [PredictWorkflowComponent]
})
export class PredictWorkflowModule { }
