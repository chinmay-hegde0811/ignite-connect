import { Payment } from '@commercetools/platform-sdk';
import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { CREATE_TRANSACTION_MUTATION } from '../query/constants';

export class CreateTransaction {
  public async execute(
    payment: Payment,
    centAmount: number,
    currencyCode: string,
    type: string,
  ) {
    const apiClient = new ApiClient();
    const { id, version } = payment;
    const currentTime = new Date();
    const variables = {
      id,
      version,
      amount: {
        currencyCode,
        centAmount,
      },
      time: currentTime.toISOString(),
      type,
    };
    apiClient.setBody({
      query: CREATE_TRANSACTION_MUTATION,
      variables,
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.UpdatePayment;

    return CT.Mappers.default.createTransactionResponseMapper(result);
  }
}
