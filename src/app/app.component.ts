import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ListWorkspacesComponent} from './workspace/list-workspaces/list-workspaces.component';
import {WorkspaceFormComponent} from './workspace/workspace-form/workspace-form.component';
import {HttpClientModule} from '@angular/common/http';
import {WorkflowComponent} from './workflow/workflow/workflow.component';
import {WorkflowFormComponent} from './workflow/workflow-form/workflow-form.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WorkspaceWorkflow';
}
