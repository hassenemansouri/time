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
import {ProjectFormComponent} from './project/project-form/project-form.component';
import {TaskFormComponent} from './task/task-form/task-form.component';
import {ListGoalsComponent} from './goal/list-goals.component';
import {GoalFormComponent} from './goal/goal-form.component';
import {ListRewardsComponent} from './reward/list-rewards.component';
import {RewardFormComponent} from './reward/reward-form.component';
import {WorkspaceUserComponent} from './workspace-user/workspace-user.component';

export const routes: Routes = [
  // Routes des Workspaces

  //For Manager

  { path: 'workspaces', component: ListWorkspacesComponent },
  { path: 'workspaces/add', component: WorkspaceFormComponent },
  { path: 'workspaces/edit/:id', component: WorkspaceFormComponent },

  //For Users
  {path: 'workspaceUser' , component: WorkspaceUserComponent},

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

  //Routes des goals and Rewards
  {path: 'goals' , component:ListGoalsComponent},
  {path:'goals/add' , component : GoalFormComponent},
  {path: 'rewards' , component : ListRewardsComponent},
  {path : 'rewards/add' , component : RewardFormComponent},

  //Routes des projets et tasks
  { path: 'tasks', component: TaskComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/add' , component: ProjectFormComponent},
  { path : 'tasks/add' , component : TaskFormComponent},

  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' } // Gestion des erreurs de routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
