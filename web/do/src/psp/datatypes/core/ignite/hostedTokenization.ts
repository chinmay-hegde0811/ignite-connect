export interface HostedTokenizationPayload {
  cartTotalAmount: number;
  currency: string;
  paymentAction: string;
  returnUrl: string;
  tokenize: boolean;
}

export interface HostedTokenizationServiceResponse {
  token: string;
}

export interface HostedTokenizationResponse {
  token: string;
}
