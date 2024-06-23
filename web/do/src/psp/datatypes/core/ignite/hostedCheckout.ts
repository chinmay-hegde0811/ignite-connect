export interface HostedCheckoutPayload {
  cartTotalAmount: number;
  currency: string;
  paymentAction: string;
  returnUrl: string;
  tokenize: boolean;
}

export interface HostedCheckoutServiceResponse {
  transactionId: string;
  action: string;
  redirectUrl: string;
}

export interface HostedCheckoutResponse {
  transactionId: string;
  action: string;
  redirectUrl: string;
}
