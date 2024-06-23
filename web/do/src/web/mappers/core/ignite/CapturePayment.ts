import { Ignite } from '../../../datatypes';

export class CapturePayment {
  public static getCapturePaymentRequiredProps(request: Ignite.Request) {
    const {
      storeId = '',
      amount = 0,
      paymentId = '',
      orderId = '',
    } = (request?.body || {}) as Ignite.CapturePaymentPayload;

    return {
      storeId,
      amount,
      paymentId,
      orderId,
    };
  }

  public static getCapturePaymentAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';

    const {
      storeId = '',
      amount = 0,
      paymentId = '',
      orderId = '',
    } = (request?.body || {}) as Ignite.CapturePaymentPayload;

    return {
      authToken,
      storeId,
      amount,
      paymentId,
      orderId,
    };
  }
}
