import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListWorkspacesComponent} from './workspace/list-workspaces/list-workspaces.component';
import {WorkspaceFormComponent} from './workspace/workspace-form/workspace-form.component';
import {WorkflowFormComponent} from './workflow/workflow-form/workflow-form.component';
import {WorkflowComponent} from './workflow/workflow/workflow.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './AuthGuard';
import {GoalFormComponent} from './goal/goal-form.component';
import {ListGoalsComponent} from './goal/list-goals.component';
import {ListRewardsComponent} from './reward/list-rewards.component';
import {RewardFormComponent} from './reward/reward-form.component';


export const routes: Routes = [
  // Routes des Workspaces
  { path: 'workspaces', component: ListWorkspacesComponent },
  { path: 'workspaces/add', component: WorkspaceFormComponent },
  { path: 'workspaces/edit/:id', component: WorkspaceFormComponent },

  // Routes des Workflows
  { path: 'workflows', component: WorkflowComponent },
  { path: 'workflows/add', component: WorkflowFormComponent },
  { path: 'workflows/edit/:id', component: WorkflowFormComponent },
  //Goals Routes
  { path: 'goals', component: ListGoalsComponent },
  { path: 'goals/add', component: GoalFormComponent },
  { path: 'goals/edit/:id', component: GoalFormComponent },
  { path: 'rewards', component: ListRewardsComponent },
  { path: 'rewards/add', component: RewardFormComponent },
  //user Routes
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: LandingComponent },
  { path: 'error', component: NotFoundComponent },


  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' } // Gestion des erreurs de routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
