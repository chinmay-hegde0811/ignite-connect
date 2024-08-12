import { Ignite } from '../../../datatypes';

export class RefundPayment {
  public static getRefundPaymentRequiredProps(request: Ignite.Request) {
    const {
      orderId = '',
      storeId = '',
      amount = 0,
      paymentId = '',
    } = (request?.body || {}) as Ignite.RefundPaymentPayload;

    return {
      orderId,
      storeId,
      amount,
      paymentId,
    };
  }

  public static getRefundPaymentAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';

    const {
      orderId = '',
      storeId = '',
      amount = 0,
      paymentId = '',
    } = (request.body || {}) as Ignite.RefundPaymentPayload;

    return {
      orderId,
      storeId,
      authToken,
      amount,
      paymentId,
    };
  }
}
