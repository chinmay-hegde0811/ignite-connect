// import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';

export class GetPaymentStatus {
  public async execute(payload: App.Types.Ignite.GetPaymentStatusPayload) {
    const payment = await DB.Core.getPayment(
      App.Mappers.default.getPaymentStatusDBPayload(payload),
    );
    if (!payment) {
      throw {
        message: `Failed to fetch the payment for id : '${payload.id}'`,
        statusCode: 500,
      };
    }
    // Prepare service payload for get payment status
    // const serviceResponse = await PSP.Core.getPayment(payment.paymentId);

    // return App.Mappers.default.getPaymentStatusResponseMapper(
    //   serviceResponse,
    //   payment,
    // );
    return payment;
  }
}
