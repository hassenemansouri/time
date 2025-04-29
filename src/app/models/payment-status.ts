export interface PaymentStatus {
  orderId: string;
  status: string; // PENDING, PAID, FAILED, CANCELLED, EXPIRED
  amount: number;
  currency: string;
  transactionId: string | null;
  paymentDate: string | null; // ISO date string
  paymentMethod: string | null;
}
