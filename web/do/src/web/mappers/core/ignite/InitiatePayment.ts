import { Ignite } from '../../../datatypes';

export class InitiatePayment {
  public static getInitSessionRequiredProps(request: Ignite.Request) {
    const {
      storeId = '',
      returnUrl = '',
      paymentAction = '',
    } = (request?.body || {}) as Ignite.InitiatePaymentPayload;
    return {
      storeId,
      returnUrl,
      paymentAction,
    };
  }

  public static getInitSessionAppPayload(request: Ignite.Request) {
    const { authorization: authToken = '' } = request.headers;
    const {
      storeId = '',
      cartId = '',
      token = '',
      askConsumerConsent = true,
      returnUrl = '',
      paymentAction = '',
      showSavedCardOption = false,
      tokenize = false,
      me = false,
    } = (request?.body || {}) as Ignite.InitiatePaymentPayload;

    return {
      authToken,
      cartId,
      storeId,
      token,
      askConsumerConsent,
      returnUrl,
      paymentAction,
      showSavedCardOption,
      tokenize,
      me,
    };
  }
}
