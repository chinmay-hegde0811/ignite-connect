import { Ignite } from '../../../datatypes';

export class HostedCheckout {
  public static getHostedCheckoutRequiredProps(request: Ignite.Request) {
    const {
      storeId = '',
      returnUrl = '',
      paymentAction = '',
    } = (request?.body || {}) as Ignite.HostedCheckoutPayload;

    return { storeId, returnUrl, paymentAction };
  }

  public static getHostedCheckoutAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';
    const {
      cartId = '',
      storeId = '',
      returnUrl = '',
      paymentAction = '',
      showSavedCardOption = false,
      tokenize = false,
      me = false,
    } = (request?.body || {}) as Ignite.HostedCheckoutPayload;

    return {
      authToken,
      cartId,
      storeId,
      returnUrl,
      paymentAction,
      showSavedCardOption,
      tokenize,
      me,
    };
  }
}
