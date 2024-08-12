import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { GET_ORDER_BY_ID_QUERY } from '../query/constants';

export class GetOrderById {
  public async execute(orderId: string) {
    // Initialize api client
    const apiClient = new ApiClient();

    const variables = {
      orderId,
    };

    apiClient.setBody({
      query: GET_ORDER_BY_ID_QUERY,
      variables,
    });

    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.OrderById;

    return CT.Mappers.default.getOrderByIdResponseMapper(result);
  }
}
