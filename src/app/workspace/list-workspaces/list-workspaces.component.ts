import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../workspace.service';
import { NgForOf, CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Workspace } from '../workspace.model';

@Component({
  selector: 'app-list-workspaces',
  templateUrl: './list-workspaces.component.html',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  styleUrls: ['./list-workspaces.component.css']
})
export class ListWorkspacesComponent implements OnInit {
  workspaces: Workspace[] = [];


  constructor(private workspaceService: WorkspaceService , protected router : Router) {}

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  loadWorkspaces() {
    this.workspaceService.getAll().subscribe({
      next: (data) => {
        console.log('Workspaces chargés:', data);
        this.workspaces = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des workspaces :', err);
      }
    });
  }


  deleteWorkspace(id: number | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer cet espace de travail ?')) {
      this.workspaceService.delete(id).subscribe({
        next: () => {
          console.log(`Workspace ${id} supprimé avec succès`);
          this.loadWorkspaces();
        },
        error: (err) => console.error('Erreur lors de la suppression du workspace :', err)
      });
    }
  }
}
