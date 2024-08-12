export interface CancelPaymentPayload {
  orderId: string;
  storeId: string;
  amount: number;
  paymentId: string;
}
