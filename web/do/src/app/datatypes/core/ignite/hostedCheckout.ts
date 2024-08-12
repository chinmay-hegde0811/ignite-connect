export interface HostedCheckoutPayload {
  authToken: string;
  cartId: string;
  storeId: string;
  returnUrl: string;
  paymentAction: string;
  showSavedCardOption: boolean;
  tokenize: boolean;
  me: boolean;
}

export interface PaymentMethod {
  title: string;
  action: string;
  enabled: boolean;
  buttonTitle: string;
  type: string;
  imageUrl: string[];
}
