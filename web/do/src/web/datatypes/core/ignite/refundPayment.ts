export interface RefundPaymentPayload {
  orderId: string;
  storeId: string;
  amount: number;
  paymentId: string;
}
