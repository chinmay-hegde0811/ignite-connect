import { Ignite } from '../../../datatypes';

export class GetPaymentStatus {
  public static getPaymentStatusDBPayload(
    payload: Ignite.GetPaymentStatusPayload,
  ) {
    const { id = '' } = payload || {};
    return { paymentId: id };
  }

  public static getPaymentStatusResponseMapper(
    payload: { status: string },
    payment: { orderId: string },
  ) {
    const { status = '' } = payload || {};
    const { orderId = '' } = payment || {};
    return { orderId, status };
  }
}
