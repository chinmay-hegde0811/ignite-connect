import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';
import {
  orderPaymentHandler,
  orderPaymentCaptureHandler,
  refundPaymentHandler,
  orderPaymentCancelHandler,
} from '../common';

export class Webhook {
  public async execute(payload: App.Types.Ignite.Transaction) {
    switch (payload.status) {
      case 'AUTHORIZED':
        return orderPaymentHandler(payload);
      case 'CAPTURED':
      case 'PARTIAL_CAPTURED':
        return orderPaymentCaptureHandler(payload);
      case 'VOID':
        return orderPaymentCancelHandler(payload);
      case 'PARTIAL_REFUNDED':
      case 'REFUNDED':
        return refundPaymentHandler(payload);
      default:
        Util.Core.logger().warn(
          `[Webhook] Received payload with status: ${payload.status}`,
        );
        return { status: 200 };
    }
  }
}
