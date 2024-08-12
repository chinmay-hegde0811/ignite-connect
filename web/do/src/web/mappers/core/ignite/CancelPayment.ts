import { Ignite } from '../../../datatypes';

export class CancelPayment {
  public static getCancelPaymentRequiredProps(request: Ignite.Request) {
    const {
      orderId = '',
      storeId = '',
      amount = 0,
      paymentId = '',
    } = (request?.body || {}) as Ignite.CancelPaymentPayload;

    return {
      orderId,
      storeId,
      amount,
      paymentId,
    };
  }

  public static getCancelPaymentAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';

    const {
      orderId = '',
      storeId = '',
      amount = 0,
      paymentId = '',
    } = (request?.body || {}) as Ignite.CancelPaymentPayload;

    return {
      authToken,
      orderId,
      storeId,
      amount,
      paymentId,
    };
  }
}
