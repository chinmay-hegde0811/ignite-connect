export interface HostedTokenizationPayload {
  authToken: string;
  storeId: string;
  cartId: string;
  token: string;
  askConsumerConsent: boolean;
  returnUrl: string;
  paymentAction: string;
  showSavedCardOption: boolean;
  tokenize: boolean;
  me: boolean;
}
