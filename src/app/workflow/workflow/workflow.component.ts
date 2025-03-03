import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {WorkflowService} from '../workflow.service';
import {Workflow} from '../workflow.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  workflows: Workflow[] = [];

  constructor(private workflowService: WorkflowService, private router: Router) {}

  ngOnInit(): void {
    this.loadWorkflows();
  }

  loadWorkflows(): void {
    this.workflowService.getAllWorkflows().subscribe(data => {
      this.workflows = data;
    });
  }

  deleteWorkflow(id: string | undefined): void {
    if (confirm('Are you sure you want to delete this workflow?')) {
      this.workflowService.deleteWorkflow(id).subscribe(() => {
        this.workflows = this.workflows.filter(w => w.id !== id);
      });
    }
  }
}
