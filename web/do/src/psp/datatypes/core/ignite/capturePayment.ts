export interface CapturePaymentRequest {
  capturedAmount: number;
  transactionId: string;
}

export interface CapturePaymentResponse {
  id: string;
  action: string;
}
