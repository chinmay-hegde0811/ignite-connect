export interface HostedCheckoutPayload {
  cartId: string;
  storeId: string;
  returnUrl: string;
  paymentAction: string;
  showSavedCardOption: boolean;
  tokenize: boolean;
  me: boolean;
}
