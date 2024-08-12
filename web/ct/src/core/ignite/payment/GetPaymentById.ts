import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { GET_PAYMENT_BY_ID_QUERY } from '../query/constants';

export class GetPaymentById {
  public async execute(paymentId: string) {
    // Initialize api client
    const apiClient = new ApiClient();

    const variables = {
      paymentId,
    };

    apiClient.setBody({
      query: GET_PAYMENT_BY_ID_QUERY,
      variables,
    });

    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.PaymentById;

    return CT.Mappers.default.getPaymentByIdResponseMapper(result);
  }
}
