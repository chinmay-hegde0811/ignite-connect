import { Ignite } from '../../../datatypes';

export class CancelPayment {
  public static getPaymentCancelServicePayload(
    payload: Ignite.ICancelPaymentPayload,
    dbPayment: Ignite.Payment,
  ) {
    const { amount } = payload;
    const { transactionId } = dbPayment;
    return { voidAmount: amount, transactionId };
  }
}
