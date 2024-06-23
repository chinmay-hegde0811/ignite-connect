import { Cart } from '@commercetools/platform-sdk';
import { Ignite } from '../../../datatypes';

export class HostedCheckout {
  public static getHostedCheckoutPayload(
    cart: Cart,
    payload: Ignite.HostedCheckoutPayload,
  ) {
    const { returnUrl, showSavedCardOption, paymentAction, tokenize } = payload;
    const cartTotalAmount = cart?.taxedPrice?.totalGross.centAmount || 0;
    const currency = cart?.taxedPrice?.totalGross.currencyCode || '';
    return {
      cartTotalAmount,
      currency,
      paymentAction,
      returnUrl,
      tokenize,
      showSavedCardOption,
    };
  }
}
