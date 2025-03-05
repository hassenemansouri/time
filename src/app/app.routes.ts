import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListWorkspacesComponent} from './workspace/list-workspaces/list-workspaces.component';
import {WorkspaceFormComponent} from './workspace/workspace-form/workspace-form.component';
import {WorkflowFormComponent} from './workflow/workflow-form/workflow-form.component';
import {WorkflowComponent} from './workflow/workflow/workflow.component';
import {LandingComponent} from './landing/landing.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ListGoalsComponent} from './goal/list-goals.component';
import {GoalFormComponent} from './goal/goal-form.component';
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
  { path: 'goals', component: ListGoalsComponent },
  { path: 'add-goal', component: GoalFormComponent },
  { path: 'rewards', component: ListRewardsComponent },
  { path: 'add-reward', component: RewardFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
