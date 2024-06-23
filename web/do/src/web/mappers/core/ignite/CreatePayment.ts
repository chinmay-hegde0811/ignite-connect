import { Ignite } from '../../../datatypes';

export class CreatePayment {
  public static getCreatePaymentRequiredProps(request: Ignite.Request) {
    const {
      storeId = '',
      token = '',
      returnUrl = '',
      webhookUrl = '',
    } = (request?.body || {}) as Ignite.CreatePaymentPayload;

    return {
      storeId,
      token,
      webhookUrl,
      returnUrl,
    };
  }

  public static getCreatePaymentAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';

    const {
      cartId = '',
      storeId = '',
      token = '',
      returnUrl = '',
      webhookUrl = '',
      me = false,
    } = (request.body || {}) as Ignite.CreatePaymentPayload;

    return {
      authToken,
      cartId,
      storeId,
      token,
      webhookUrl,
      returnUrl,
      me,
    };
  }
}
