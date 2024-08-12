import { Ignite } from '../../../datatypes';

export class UpdatePayment {
  public static getUpdatePaymentRequiredProps(request: Ignite.Request) {
    const { transactionId = '' } = (request?.body ||
      {}) as Ignite.UpdatePaymentPayload;

    return {
      transactionId,
    };
  }

  public static getUpdatePaymentAppPayload(request: Ignite.Request) {
    const {
      transactionId = '',
      orderId = '',
      paymentId = '',
    } = (request.body || {}) as Ignite.UpdatePaymentPayload;

    return {
      transactionId,
      orderId,
      paymentId,
    };
  }
}
