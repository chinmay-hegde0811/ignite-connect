import { Ignite } from '../../../datatypes';

export class GetWebhookStatus {
  public static getWebhookStatusDBQuery(
    payload: Ignite.GetWebhookStatusPayload,
  ) {
    return {
      paymentId: payload?.paymentId,
    };
  }

  public static getWebhookStatusResponseMapper(payment: {
    status: string;
    orderId: string;
  }) {
    const { orderId = '', status = '' } = payment || {};
    return { orderId, status };
  }
}
