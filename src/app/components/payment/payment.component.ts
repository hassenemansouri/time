import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import {PaymentService} from '../../services/payment.service';
import {ResponsePayment} from '../../models/payment-response';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class PaymentComponent {
  paymentForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const amount = this.paymentForm.value.amount;

    this.paymentService.createPayment(amount).subscribe({
      next: (response: ResponsePayment) => {
        this.loading = false;
        if (response.link) {
          window.location.href = response.link; // Redirect to Flouci payment page
        } else {
          this.errorMessage = 'Payment link not received.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'An error occurred while initiating the payment.';
        console.error('Payment error:', err);
      },
    });
  }
}
