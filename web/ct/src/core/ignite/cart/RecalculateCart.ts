import { Cart } from '@commercetools/platform-sdk';
import { CT } from '@ignite/ctintegration-do';
import { MeApiClient } from '../clients/meApiClient';
import { RECALCULATE_CART_QUERY } from '../query/constants';

export class RecalculateCart {
  public async execute(authToken: string, cart: Cart) {
    const apiClient = new MeApiClient({ authToken });
    apiClient.setBody({
      query: RECALCULATE_CART_QUERY,
      variables: {
        id: cart.id,
        version: cart.version,
        updateProductData: true, // this should be true for recalculate
      },
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.RecalculateCartResponse;
    return CT.Mappers.default.recalculateCartResponseMapper(result);
  }
}
