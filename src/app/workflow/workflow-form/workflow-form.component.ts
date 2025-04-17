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
  workflow: Workflow = {files: [], id: '', workflowName: '', steps: [] };
  file: File | null = null;
  isEdit: boolean = false;

  constructor(
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  // This method handles file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.file = input.files[0];
    }
  }

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

  // This method is triggered when the form is submitted
  saveWorkflow(): void {
    if (this.workflow.workflowName && this.workflow.workflowName.length >= 3) {
      this.workflowService.createWorkflow(this.workflow).subscribe((createdWorkflow) => {
        // Now upload the file if selected
        if (this.file) {
          this.workflowService.uploadFile(createdWorkflow.id!, this.file).subscribe(
            (response) => {
              console.log('File uploaded successfully', response.message); // response is now an object with a message
              this.router.navigate(['/workflows']);
            },
            (error) => {
              console.error('File upload failed', error);
            }
          );
        } else {
          this.router.navigate(['/workflows']);
        }
      });
    }
  }


}
