import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { CREATE_PAYMENT_MUTATION } from '../query/constants';

export class CreatePayment {
  public async execute(payload: CT.Types.Ignite.Transaction) {
    const { id, cartTotalAmount, transactionInfo } = payload;
    const paymentPayload = JSON.parse(transactionInfo[0].payload);
    const apiClient = new ApiClient();

    const centAmount = cartTotalAmount;
    const interfaceId = id;
    const variables = {
      draft: {
        amountPlanned: {
          centAmount,
          currencyCode: paymentPayload.currency,
        },
        interfaceId,
        paymentMethodInfo: {
          paymentInterface: CT.CONSTANTS.Constants.PSP_NAME,
          method: 'VISA',
          name: {
            locale: 'en',
            value: 'VISA',
          },
        },
        custom: {
          typeKey: CT.CONSTANTS.Constants.CREATE_PAYMENT.TYPE_KEY,
          fields: [
            {
              name: CT.CONSTANTS.Constants.CREATE_PAYMENT.FIELDS.PAYMENTID,
              value: `"${id}"`,
            },
          ],
        },
      },
    };

    apiClient.setBody({
      query: CREATE_PAYMENT_MUTATION,
      variables,
    });

    const response =
      (await apiClient.execute()) as CT.Types.Ignite.CreatePaymentResponse;

    const mappedResult =
      CT.Mappers.default.createPaymentResponseMapper(response);

    if (!mappedResult) {
      throw {
        message: 'Failed to create the payment using order',
        statusCode: 500,
      };
    }

    return mappedResult;
  }
}
