import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponsePayment} from '../models/payment-response';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8100/timeforge'; // Backend base URL

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<ResponsePayment> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post<ResponsePayment>(`${this.apiUrl}/payment/create`, null, { params });
  }

  verifyPayment(paymentId: string): Observable<boolean> {
    const params = new HttpParams().set('payment_id', paymentId);
    return this.http.get<boolean>(`${this.apiUrl}/payment/success`, { params });
  }
}
