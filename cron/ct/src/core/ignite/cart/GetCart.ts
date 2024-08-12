import { CT } from '@ignite/ctintegration-do';
import { MeApiClient } from '../clients/meApiClient';
import { GET_CART_QUERY } from '../query/constants';

export class GetCart {
  public async execute(cartId: string, authToken: string) {
    const apiClient = new MeApiClient({ authToken });
    apiClient.setBody({
      query: GET_CART_QUERY,
      variables: {
        cartId,
      },
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.GetCartResponse;
    return CT.Mappers.default.getCartResponseMapper(result);
  }
}
