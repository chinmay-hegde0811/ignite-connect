import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';
import { CT } from '@ignite/ctintegration-ct';

export class GetOrder {
  public async execute(payload: App.Types.Ignite.GetOrderPayload) {
    const payment = await DB.Core.getPayment(
      App.Mappers.default.getOrderDBPayload(payload),
    );

    if (!payment) {
      throw {
        message: `Failed to fetch the payment for paymentId: '${payload.paymentId}'`,
        statusCode: 500,
      };
    }
    const customConfig = await CT.Core.getCustomObjects(payment.storeId);
    // Prepare service payload for get payment
    const serviceResponse = await PSP.Core.getPayment(
      customConfig,
      payment.transactionId,
    );

    return App.Mappers.default.getOrderResponseMapper(
      serviceResponse,
      payment.orderId,
    );
  }
}
