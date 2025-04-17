// src/app/components/add-partnership/add-partnership.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For date and slice pipes
import { PartnershipService, StrategicPartnership, BlockchainRecord } from '../strategicparternship.service'
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-partnership',
  templateUrl: './add-partnership.component.html',
  styleUrls: ['./add-partnership.component.css'],
  standalone: true, // If using standalone components
  imports: [CommonModule, RouterLink, FormsModule] // Required for date and slice pipes
})
export class AddPartnershipComponent {
  partnership: StrategicPartnership = {
    name: '',
    description: '',
    participants: []
  };
  newParticipant = '';
  registrationResult: StrategicPartnership | null = null;
  verificationResult: boolean | null = null;
  blockchainRecords: BlockchainRecord[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private partnershipService: PartnershipService) {}

  // Add this method to handle verification status display
  getVerificationStatus(): string {
    if (this.verificationResult === true) return 'Verified';
    if (this.verificationResult === false) return 'Verification Failed';
    return 'Pending Verification';
  }

  // Add this method to reset the form
  resetForm(): void {
    this.partnership = {
      name: '',
      description: '',
      participants: []
    };
    this.newParticipant = '';
    this.registrationResult = null;
    this.verificationResult = null;
    this.errorMessage = null;
  }

  addParticipant(): void {
    if (this.newParticipant.trim()) {
      this.partnership.participants.push(this.newParticipant.trim());
      this.newParticipant = '';
    }
  }

  removeParticipant(index: number): void {
    this.partnership.participants.splice(index, 1);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.partnershipService.createPartnership(this.partnership).subscribe({
      next: (result) => {
        this.registrationResult = result;
        this.verifyRegistration();
        this.loadBlockchain();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.isLoading = false;

        if (err.status === 0) {
          this.errorMessage = 'Failed to connect to the server. Please check your connection and ensure the backend is running.';
        } else {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }

  verifyRegistration(): void {
    if (this.registrationResult?.id) {
      this.partnershipService.verifyPartnership(this.registrationResult.id).subscribe({
        next: (isValid) => this.verificationResult = isValid,
        error: (err) => {
          console.error('Verification failed', err);
          this.verificationResult = false;
        }
      });
    }
  }

  loadBlockchain(): void {
    this.partnershipService.getBlockchain().subscribe({
      next: (records) => this.blockchainRecords = records,
      error: (err) => console.error('Failed to load blockchain', err)
    });
  }
}
