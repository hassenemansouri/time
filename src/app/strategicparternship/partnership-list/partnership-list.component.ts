// src/app/components/list-partnership/list-partnership.component.ts
import { Component, OnInit } from '@angular/core';
import { PartnershipService, StrategicPartnership } from '../strategicparternship.service';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-partnership',
  templateUrl: 'partnership-list.component.html',
  styleUrls: ['./list-partnership.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ListPartnershipComponent implements OnInit {
  // Component properties with proper initialization
  partnerships: StrategicPartnership[] = [];
  filteredPartnerships: StrategicPartnership[] = [];
  searchText: string = ''; // Fixes "Unresolved variable or type searchText"
  isLoading: boolean = false; // Fixes "Unresolved variable or type isLoading"
  errorMessage: string | null = null;
  currentPage: number = 1; // Fixes "Unresolved variable or type currentPage"
  itemsPerPage: number = 10; // Fixes "Unresolved variable or type itemsPerPage"
  totalItems: number = 0;

  constructor(
    private partnershipService: PartnershipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPartnerships();
  }

  loadPartnerships(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.partnershipService.getAllPartnerships().subscribe({
      next: (partnerships) => {
        console.log("Partnerships loaded:", partnerships);
        this.partnerships = partnerships;
        this.filteredPartnerships = [...partnerships];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;

        // Redirect to login if unauthorized
       // if (err.message.includes('login')) {
        //  this.router.navigate(['/login']);
       // }
      }
    });
  }

  applyFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredPartnerships = [...this.partnerships];
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();
      this.filteredPartnerships = this.partnerships.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.description && p.description.toLowerCase().includes(searchTerm)) ||
        p.participants.some(participant => participant.toLowerCase().includes(searchTerm))
      );
    }
    this.totalItems = this.filteredPartnerships.length;
    this.currentPage = 1;
  }

  viewDetails(id: string): void {
    this.router.navigate(['/partnerships', id]);
  }

  editPartnership(id: string): void {
    this.router.navigate(['/partnerships/edit', id]);
  }

  deletePartnership(id: string): void {
    if (confirm('Are you sure you want to delete this partnership?')) {
      this.isLoading = true;
      this.partnershipService.deletePartnership(id).subscribe({
        next: () => this.loadPartnerships(),
        error: (err) => {
          console.error('Delete failed', err);
          this.errorMessage = 'Failed to delete partnership';
          this.isLoading = false;
        }
      });
    }
  }

  // Pagination methods
  get paginatedPartnerships(): StrategicPartnership[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPartnerships.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  trackById(index: number, partnership: StrategicPartnership): string {
    return partnership.id || index.toString();
  }
}
