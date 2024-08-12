export interface ICreatePaymentResponse {
  transactionId: string;
  action: string;
  backUrl: string;
}

export interface ICreatePaymentPayload {
  authToken: string;
  cartId: string;
  storeId: string;
  returnUrl: string;
  token: string;
  webhookUrl: string;
  me: boolean;
}
