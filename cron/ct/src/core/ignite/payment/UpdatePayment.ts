import { Order, Payment } from '@commercetools/platform-sdk';
import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { UPDATE_PAYMENT_MUTATION } from '../query/constants';
import { CreatePayment } from './CreatePayment';
import { UpdateOrderPayment } from '../order/UpdateOrderPayment';

export class UpdatePayment {
  public async execute(payload: CT.Types.Ignite.Transaction, order: Order) {
    const { id, cardDetails } = payload;
    // get payments from order
    const payments = (order?.paymentInfo?.payments ||
      []) as unknown as Payment[];

    // get payment based on the dbpaymentId
    const payment = payments.find((py) =>
      (
        py?.custom as unknown as {
          customFieldsRaw: { value: string }[];
        }
      )?.customFieldsRaw?.find((field) => field?.value === id),
    );
    const locale = order?.locale || 'en';
    if (payment === undefined) {
      const result = new CreatePayment().execute(payload, locale);
      new UpdateOrderPayment().execute(
        order.id,
        order.version,
        (await result).id,
      );
      return { updatedPayment: await result };
    }
    if (!payment) {
      throw {
        message: `Failed to fetch the payment with payment id '${id}'`,
        statusCode: 500,
      };
    }

    const { id: paymentId, version: paymentVersion } = payment;

    const apiClient = new ApiClient();
    const variables = {
      paymentId,
      paymentVersion,
      methodInfoName: cardDetails?.cardType || 'Visa',
      methodInfoLocale: locale,
    };

    apiClient.setBody({
      query: UPDATE_PAYMENT_MUTATION,
      variables,
    });

    const response =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.UpdatePaymentResponse;

    const mappedResult =
      CT.Mappers.default.updatePaymentResponseMapper(response);

    return mappedResult;
  }
}
