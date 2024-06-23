import { Order } from '@commercetools/platform-sdk';
import { Ignite } from '../../../datatypes';

export class CapturePayment {
  public static getCaptureServicePayload(
    payload: Ignite.ICapturePaymentPayload,
    dbPayment: Ignite.Payment,
  ) {
    const { amount } = payload;
    const { transactionId = '' } = dbPayment;
    return {
      capturedAmount: amount,
      transactionId,
    };
  }

  public static calculateRemainingOrderAmount(
    order: Order,
    totalCaptureAmount: number,
  ) {
    const totalAmountPlanned = order.taxedPrice?.totalGross?.centAmount ?? 0;
    const remainingAmount = Math.max(
      0,
      totalAmountPlanned - totalCaptureAmount,
    );

    return remainingAmount;
  }
}
