export interface CreatePaymentPayload {
  cartId: string;
  storeId: string;
  returnUrl: string;
  token: string;
  webhookUrl: string;
  me: boolean;
}
