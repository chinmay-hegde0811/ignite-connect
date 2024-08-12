import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { REPLICATE_CART_MUTATION } from '../query/constants';

export class ReplicateCart {
  public async execute(payload: CT.Types.Ignite.ReplicateCartPayload) {
    // Initialize api client
    const apiClient = new ApiClient();
    apiClient.setBody({
      query: REPLICATE_CART_MUTATION,
      variables: payload,
    });

    const response =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.ReplicateCartResponse;

    return response.body.data.replicateCart;
  }
}
