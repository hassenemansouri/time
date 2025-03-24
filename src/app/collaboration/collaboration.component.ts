import { Component, OnInit } from '@angular/core';
import { CollaborationService } from './collaboration.service';
import { Collaboration } from './collaboration.model';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf
]
})
export class CollaborationComponent implements OnInit {
  collaborations: Collaboration[] = [];
  newCollaboration: Collaboration = {
    collaborationId: '',
    chatTitle: '',
    description: '',
    createdAt: new Date(),
    lastUpdated: new Date(),
    participants: [],
    messages: [],
  };

  constructor(private collaborationService: CollaborationService) {}

  ngOnInit(): void {
    this.loadCollaborations();
  }

  // Load all collaborations
  loadCollaborations(): void {
    this.collaborationService.findAllCollaborations().subscribe(
      (data) => {
        this.collaborations = data;
      },
      (error) => {
        console.error('Error fetching collaborations:', error);
      }
    );
  }

  // Add a new collaboration
  addCollaboration(): void {
    this.collaborationService.addCollaboration(this.collaborations).subscribe(
      () => {
        console.log('Collaboration added successfully');
        this.loadCollaborations(); // Refresh the list
        this.resetForm(); // Clear the form
      },
      (error) => {
        console.error('Error adding collaboration:', error);
      }
    );
  }

  // Delete a collaboration
  deleteCollaboration(collaborationId: string | undefined): void {
    this.collaborationService.deleteCollaboration(collaborationId).subscribe(
      () => {
        console.log('Collaboration deleted successfully');
        this.loadCollaborations(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting collaboration:', error);
      }
    );
  }

  // Reset the form
  resetForm(): void {
    this.newCollaboration = {
      collaborationId: '',
      chatTitle: '',
      description: '',
      createdAt: new Date(),
      lastUpdated: new Date(),
      participants: [],
      messages: [],
    };
  }
}
