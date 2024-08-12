export interface RefundPaymentRequest {
  refundedAmount: number;
  transactionId: string;
}
export interface RefundPaymentResponse {
  id: string;
  action: string;
}
