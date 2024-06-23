import { Ignite } from '../../../datatypes';

export class Payments {
  public static createPaymentResponseMapper(
    result: Ignite.Payment,
  ): Ignite.CreatePaymentResponse {
    const selectedFields = (({ id, paymentId, orderId, status, state }) => ({
      id,
      paymentId,
      orderId,
      status,
      state,
    }))(result);
    return selectedFields;
  }

  public static getIncrementedReferenceMapper(result: Ignite.PaymentReference) {
    const selectedFields = (({ storeId, version, referenceId }) => ({
      storeId,
      version,
      referenceId,
    }))(result);
    return selectedFields;
  }
}
