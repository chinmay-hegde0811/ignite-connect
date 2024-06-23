import { Order, CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';
import { orderPaymentCaptureHandler } from '../common';
import { CommonMethods } from './CommonMethod';

export class CapturePayment extends CommonMethods {
  public async calculateTotalCaptureAmount(
    orderPayload: Order,
  ): Promise<number> {
    // Check if paymentInfo is present and it has an array of payments
    const payments = orderPayload.paymentInfo?.payments || [];

    const totalCaptureAmount = await Promise.all(
      payments.map(async (payment) => {
        // Fetch payment details from CT
        const ctPayment = await CT.Core.getPaymentById(payment.id);

        // Check if there are transactions and if they are of type 'Charge'
        if (
          ctPayment.transactions &&
          ctPayment.transactions.some(
            (transaction) => transaction.type === 'Charge',
          )
        ) {
          // Calculate total capture amount by summing up 'Charge' transactions
          return ctPayment.transactions
            .filter((transaction) => transaction.type === 'Charge')
            .reduce(
              (acc, transaction) => acc + transaction.amount.centAmount,
              0,
            );
        }

        return 0; // Return 0 if there are no 'Charge' transactions
      }),
    );

    return totalCaptureAmount.reduce((acc, amount) => acc + amount, 0);
  }

  public async execute(payload: App.Types.Ignite.ICapturePaymentPayload) {
    // Fetch CT order and custom objects concurrently
    const [ctOrder, customConfig] = await Promise.all([
      CT.Core.getOrderById(payload.orderId),
      CT.Core.getCustomObjects(payload.storeId),
    ]);

    if (!customConfig) {
      Util.Core.logger().error(
        'Failed to fetch configuration from CT custom object',
      );
      throw {
        message: 'Failed to fetch configuration',
        statusCode: 500,
      };
    }
    // Calculating all capture amount in order
    const totalCaptureAmount = await this.calculateTotalCaptureAmount(ctOrder);
    let payment;

    // Performing amount calculations concurrently
    const [diffAmount, hasValidCapture] = await Promise.all([
      super._calculateRemainingOrderAmount(ctOrder, totalCaptureAmount),
      super._hasValidAmount(ctOrder, totalCaptureAmount),
    ]);
    if (
      hasValidCapture.isEqual ||
      (payload.amount > diffAmount && diffAmount !== 0)
    ) {
      Util.Core.logger().error(
        'Capture amount cannot be greater than the order amount!',
      );
      throw {
        message: 'Capture amount is not valid!',
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

    if (diffAmount > 0) {
      payment = await PSP.Core.capturePayment(
        App.Mappers.default.getConnectionServiceProps(customConfig),
        App.Mappers.default.getCaptureServicePayload(payload, dbPayment),
      );

      const serviceResponse = await super._getPayment(
        customConfig,
        dbPayment.transactionId,
      );

      const captureResponse = await orderPaymentCaptureHandler(serviceResponse);
      return {
        payment,
        captureResponse,
      };
    }
    return {};
  }
}
