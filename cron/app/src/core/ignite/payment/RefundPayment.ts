import { CT } from '@ignite/ctintegration-ct';
import { Util } from '@ignite/ctintegration-util';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';
import { PSP } from '@ignite/ctintegration-psp';
import { refundPaymentHandler } from '../common';
import { CommonMethods } from './CommonMethod';

export class RefundPayment extends CommonMethods {
  public async execute(payload: App.Types.Ignite.ICreateRefundPayload) {
    // Fetch CT order
    const order = await CT.Core.getOrderById(payload.orderId);
    if (!order) {
      Util.Core.logger().error(
        'Failed to fetch the order or order is missing!',
      );
      throw {
        message: 'Failed to fetch the order or order is missing!',
        statusCode: 500,
      };
    }
    //  Check refund amount is vaild or not
    const hasValidRefund = App.Mappers.default.hasValidAmount(
      order,
      payload.amount,
    );
    if (hasValidRefund.isGreater) {
      Util.Core.logger().error(
        'Refund amount cannot be greater than the order amount!',
      );
      throw {
        message: 'Refund amount cannot be greater than the order amount!',
        statusCode: 500,
      };
    }
    // Fetch custom objects from admin config
    const customConfig = await CT.Core.getCustomObjects(payload.storeId);

    if (!customConfig) {
      Util.Core.logger().error(
        'Failed to fetch configuration from CT custom object',
      );
      throw {
        message: 'Failed to fetch configuration',
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

    const response = await PSP.Core.refundPayment(
      App.Mappers.default.getConnectionServiceProps(customConfig),
      App.Mappers.default.getRefundServicePayload(payload, dbPayment),
    );

    const serviceResponse = await super._getPayment(
      customConfig,
      dbPayment.transactionId,
    );

    const refundResponse = await refundPaymentHandler(serviceResponse);

    return {
      response,
      refundResponse,
    };
  }
}
