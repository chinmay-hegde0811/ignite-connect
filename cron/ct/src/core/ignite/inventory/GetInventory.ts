import { CT } from '@ignite/ctintegration-do';
import { MeApiClient } from '../clients/meApiClient';
import { GET_INVENTORY_QUERY } from '../query/constants';

export class GetInventory {
  public async execute(authToken: string, skus: string) {
    const apiClient = new MeApiClient({ authToken });
    apiClient.setBody({
      query: GET_INVENTORY_QUERY,
      variables: {
        where: `sku in (${skus})`,
        limit: skus?.split(',')?.length || 0,
      },
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.GetInventoryResponse;
    return CT.Mappers.default.getInventoryResponseMapper(result);
  }
}
