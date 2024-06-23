import { Ignite } from '../../../datatypes';

export class RefundPayment {
  public static getRefundServicePayload(
    payload: Ignite.ICreateRefundPayload,
    dbPayment: Ignite.Payment,
  ) {
    const { amount } = payload;
    const { transactionId } = dbPayment;
    return {
      refundedAmount: amount,
      transactionId,
    };
  }
}
