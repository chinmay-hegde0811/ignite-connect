import { CT } from '@ignite/ctintegration-do';
import { MeApiClient } from '../clients/meApiClient';
import { GET_MY_CART_QUERY } from '../query/constants';

export class GetMyCart {
  public async execute(authToken: string) {
    const apiClient = new MeApiClient({ authToken });
    apiClient.setBody({
      query: GET_MY_CART_QUERY,
      variables: {},
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.MyCartResponse;
    return CT.Mappers.default.getMyCartResponseMapper(result);
  }
}
