import { CT } from '@ignite/ctintegration-ct';
import { App } from '@ignite/ctintegration-do';
import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { orderPaymentHandler, orderPaymentCaptureHandler } from '../common';

export class UpdatePayment {
  public async execute(payload: App.Types.Ignite.IUpdatePaymentPayload) {
    const payment = await DB.Core.getPayment(
      App.Mappers.default.getReplicateCartDBPayload(payload),
    );

    if (!payment) {
      throw {
        message: `Failed to fetch the payment for paymentId: '${payload.paymentId}'`,
        statusCode: 500,
      };
    }
    const customConfig = await CT.Core.getCustomObjects(payment.storeId);
    const serviceResponse = await PSP.Core.getPayment(
      customConfig,
      payload.transactionId,
    );

    const status = serviceResponse?.status;

    const { STATUS } = App.CONSTANTS.Constants;

    switch (status) {
      case STATUS.FAIL: {
        const order = await CT.Core.getOrderById(payment?.orderId);
        if (!order || !order.cart || !order.cart.id) {
          throw new Error(
            `[ReplicateCart]:Failed to fetch the cartId from order id : '${payment.orderId}'`,
          );
        }
        const cartId = order.cart.id;
        return CT.Core.replicateCart({ cartId });
      }
      case STATUS.AUTHORIZED:
        return orderPaymentHandler(serviceResponse);
      case STATUS.CAPTURED:
        return orderPaymentCaptureHandler(serviceResponse);
      default:
        return {};
    }
  }
}
