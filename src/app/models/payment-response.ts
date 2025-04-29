export interface ResponsePayment {
  link: string;
  payment_id: string;
  developer_tracking_id?: string;
  success?: boolean;
}
