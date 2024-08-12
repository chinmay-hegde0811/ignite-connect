import { CT } from '@ignite/ctintegration-ct';
import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';
// import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
// import { orderPaymentHandler } from '../common';

export class RetryPayment {
  public async execute(payload: App.Types.Ignite.RetryPaymentStatusPayload) {
    const customConfig = await CT.Core.getMyCustomObjects(
      payload.authToken,
      payload.storeId,
    );

    if (!customConfig) {
      throw {
        message: 'Failed to fetch configuration',
        statusCode: 500,
      };
    }

    Util.Core.logger().debug(
      '[RetryPayment] Received custom objects using me client',
    );

    const dbPayment = await DB.Core.getPayment(
      App.Mappers.default.retryPaymentStatusPayload(payload),
    );
    if (!dbPayment) {
      throw {
        message: `Failed to fetch the payment for id : '${payload.id}'`,
        statusCode: 500,
      };
    }

    Util.Core.logger().debug('[RetryPayment] Received payment from database');

    // Get psp details
    // const payment = await PSP.Core.getPayment(dbPayment.paymentId);

    Util.Core.logger().debug('[RetryPayment] Received payment from psp');

    // return orderPaymentHandler({
    //   payment,
    // } as unknown as App.Types.Ignite.Transaction);
    return dbPayment;
  }
}
