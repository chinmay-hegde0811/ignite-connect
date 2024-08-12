import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { GET_CART_BY_ID_QUERY } from '../query/constants';

export class GetCartById {
  public async execute(cartId: string) {
    // Initialize api client
    const apiClient = new ApiClient();

    const variables = {
      cartId,
    };

    apiClient.setBody({
      query: GET_CART_BY_ID_QUERY,
      variables,
    });

    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.CartById;

    return CT.Mappers.default.getCartByIdResponseMapper(result);
  }
}
