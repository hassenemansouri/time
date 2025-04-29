export interface AppPaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  note: string; // Maps to backend's "note" (previously "description")
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
