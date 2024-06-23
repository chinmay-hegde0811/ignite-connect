export interface CancelPaymentRequest {
  voidAmount: number;
  transactionId: string;
}

export interface CancelPaymentResponse {
  id: string;
  action: string;
}
