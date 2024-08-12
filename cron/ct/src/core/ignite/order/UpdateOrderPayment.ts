import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { UPDATE_ORDER_ADD_PAYMENT_MUTATION } from '../query/constants';

export class UpdateOrderPayment {
  public async execute(
    id: string, // order id
    version: number, // order version
    paymentId: string,
  ) {
    const apiClient = new ApiClient();
    apiClient.setBody({
      query: UPDATE_ORDER_ADD_PAYMENT_MUTATION,
      variables: {
        id,
        version,
        paymentId,
      },
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.UpdateOrder;

    return CT.Mappers.default.updateOrderAddPaymentResponseMapper(result);
  }
}
