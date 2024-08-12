import { Cart } from '@commercetools/platform-sdk';
import { Ignite } from '../../../datatypes';

export class HostedTokenization {
  public static getTokenizationServicePayload(
    payload: Ignite.HostedTokenizationPayload,
    cart: Cart,
  ) {
    const cartTotalAmount = cart?.taxedPrice?.totalGross.centAmount || 0;
    const currency = cart?.taxedPrice?.totalGross.currencyCode || '';
    const { paymentAction, returnUrl, showSavedCardOption, tokenize, token } =
      payload;
    return {
      cartTotalAmount,
      currency,
      paymentAction,
      returnUrl,
      tokenize,
      showSavedCardOption,
      token,
    };
  }
}
