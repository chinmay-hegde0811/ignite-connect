import { Ignite } from '../../../datatypes';

export class GetOrder {
  public static getOrderDBPayload(payload: Ignite.GetOrderPayload) {
    const { paymentId = '' } = payload || {};
    return { paymentId };
  }

  public static getReplicateCartDBPayload(
    payload: Ignite.IUpdatePaymentPayload,
  ): { [key: string]: string } {
    const { paymentId = '', transactionId = '' } = payload || {};
    if (paymentId) {
      return { paymentId };
    }
    return { transactionId };
  }

  public static getOrderResponseMapper(
    dbpayload: Ignite.Transaction,
    orderId: string,
  ) {
    return {
      ...dbpayload,
      orderId,
    };
  }
}
