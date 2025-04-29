import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-payment-error',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './payment-error.component.html',
  styleUrl: './payment-error.component.css'
})
export class PaymentErrorComponent {
  paymentId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'] || null;
    });
  }
}
