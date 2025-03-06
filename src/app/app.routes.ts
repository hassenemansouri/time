import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListWorkspacesComponent} from './workspace/list-workspaces/list-workspaces.component';
import {WorkspaceFormComponent} from './workspace/workspace-form/workspace-form.component';
import {WorkflowFormComponent} from './workflow/workflow-form/workflow-form.component';
import {WorkflowComponent} from './workflow/workflow/workflow.component';
import {LandingComponent} from './landing/landing.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { ProjectComponent } from './project/project/project.component';
import { TaskComponent } from './task/task/task.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuard} from './AuthGuard';
import {CollaborationComponent} from './collaboration/collaboration.component';

export const routes: Routes = [
  // Routes des Workspaces
  { path: 'workspaces', component: ListWorkspacesComponent },
  { path: 'workspaces/add', component: WorkspaceFormComponent },
  { path: 'workspaces/edit/:id', component: WorkspaceFormComponent },

  // Routes des Workflows
  { path: 'workflows', component: WorkflowComponent },
  { path: 'workflows/add', component: WorkflowFormComponent },
  { path: 'workflows/edit/:id', component: WorkflowFormComponent },
  //user Routes
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: LandingComponent },
  { path: 'error', component: NotFoundComponent },
  { path: 'collaborations', component: CollaborationComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'projects', component: ProjectComponent },

  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' } // Gestion des erreurs de routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
