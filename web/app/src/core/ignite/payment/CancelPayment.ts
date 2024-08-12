import { CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';
import { orderPaymentCancelHandler } from '../common';
import { CommonMethods } from './CommonMethod';

export class CancelPayment extends CommonMethods {
  public async execute(payload: App.Types.Ignite.ICancelPaymentPayload) {
    // Fetch CT order and custom objects concurrently
    const [order, customConfig] = await Promise.all([
      CT.Core.getOrderById(payload.orderId),
      CT.Core.getCustomObjects(payload.storeId),
    ]);

    if (!order) {
      Util.Core.logger().error(
        'Failed to fetch the order or order is missing!',
      );
      throw {
        message: 'Failed to fetch the order or order is missing!',
        statusCode: 500,
      };
    }

    if (!customConfig) {
      Util.Core.logger().error(
        'Failed to fetch configuration from CT custom object',
      );
      throw {
        message: 'Failed to fetch configuration',
        statusCode: 500,
      };
    }
    //  Check cancel amount is vaild or not
    const amount = super._hasValidAmount(order, payload.amount);
    if (amount.isGreater) {
      Util.Core.logger().error('Cancel amount is not valid!');
      throw {
        message: 'Cancel amount is not valid!',
        statusCode: 500,
      };
    }

    const dbPayment = await DB.Core.getPayment(
      App.Mappers.default.getOrderDBPayload(payload),
    );

    if (!dbPayment) {
      Util.Core.logger().error('Failed to fetch payment from DB');
      throw {
        message: 'Failed to fetch payment',
        statusCode: 500,
      };
    }
    const payment = await PSP.Core.cancelPayment(
      App.Mappers.default.getConnectionServiceProps(customConfig),
      App.Mappers.default.getPaymentCancelServicePayload(payload, dbPayment),
    );

    const serviceResponse = await super._getPayment(
      customConfig,
      dbPayment.transactionId,
    );

    const voidPaymentResponse =
      await orderPaymentCancelHandler(serviceResponse);

    return {
      payment,
      voidPaymentResponse,
    };
  }
}
