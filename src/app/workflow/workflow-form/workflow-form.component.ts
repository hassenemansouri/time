import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workflow } from '../workflow.model';
import { WorkflowService } from '../workflow.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  styleUrls: ['./workflow-form.component.css']
})
export class WorkflowFormComponent implements OnInit {
  workflow: Workflow = { id: '', workflowName: '', steps: [] };
  isEdit: boolean = false;

  constructor(
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'string') {
      this.isEdit = true;
      this.workflowService.getWorkflowById(id).subscribe(data => {
        this.workflow = data;
      });
    }
  }

  addStep(): void {
    this.workflow.steps.push(''); // Add an empty step
  }

  removeStep(index: number): void {
    this.workflow.steps.splice(index, 1);
  }

  saveWorkflow(): void {
    console.log('✅ Saving workflow:', JSON.stringify(this.workflow, null, 2));

    if (this.isEdit) {
      if (!this.workflow.id || this.workflow.id === 'string') {
        console.error('❌ Error: Invalid ID');
        return;
      }
      this.workflowService.updateWorkflow(this.workflow.id, this.workflow).subscribe({
        next: () => {
          console.log('✅ Workflow updated successfully');
          this.router.navigate(['/workflows']);
        },
        error: (err) => console.error('❌ Error updating workflow:', err)
      });
    } else {
      this.workflowService.createWorkflow(this.workflow).subscribe({
        next: () => {
          console.log('✅ Workflow created successfully');
          this.router.navigate(['/workflows']);
        },
        error: (err) => console.error('❌ Error creating workflow:', err)
      });
    }
  }
}
