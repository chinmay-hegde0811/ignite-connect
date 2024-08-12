import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { CREATE_ORDER_MUTATION } from '../query/constants';

export class CreateOrder {
  public async execute(payload: CT.Types.Ignite.CreateOrderPayload) {
    // Initialize api client
    const apiClient = new ApiClient();
    apiClient.setBody({
      query: CREATE_ORDER_MUTATION,
      variables: await CT.Mappers.default.getVariables(payload),
    });

    apiClient.setAuthHeader(payload.accessToken);

    const response =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.CreateOrderResponse;

    const order = CT.Mappers.default.createOrderResponseMapper(response);

    return order;
  }
}
