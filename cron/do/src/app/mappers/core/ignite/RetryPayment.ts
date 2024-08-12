import { Ignite } from '../../../datatypes';

export class RetryPayment {
  public static retryPaymentStatusPayload(
    payload: Ignite.RetryPaymentStatusPayload,
  ) {
    const { id } = payload;
    return { id };
  }
}
