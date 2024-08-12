import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { CREATE_PAYMENT_MUTATION } from '../query/constants';

export class CreatePayment {
  public async execute(payload: CT.Types.Ignite.Transaction, locale?: string) {
    const { id, cartTotalAmount, transactionInfo } = payload;

    const apiClient = new ApiClient();

    let currency: string | null = null;
    let cardType: string | null = null;
    let foundBoth = false;

    transactionInfo.forEach((info) => {
      if (foundBoth) return;

      const paymentPayload = JSON.parse(info.payload);

      if (info.action === 'INITIAL') {
        currency = paymentPayload.currency || null;
      }

      if (info.action === 'AUTHORIZED') {
        cardType = paymentPayload.cardType || null;
      }
      if (currency && cardType) {
        foundBoth = true;
      }
    });

    const centAmount = cartTotalAmount;
    const interfaceId = id;
    const variables = {
      draft: {
        amountPlanned: {
          centAmount,
          currencyCode: currency,
        },
        interfaceId,
        paymentMethodInfo: {
          paymentInterface: CT.CONSTANTS.Constants.PSP_NAME,
          method: cardType,
          name: {
            locale,
            value: cardType,
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
      (await apiClient.execute()) as unknown as CT.Types.Ignite.CreatePaymentResponse;

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
