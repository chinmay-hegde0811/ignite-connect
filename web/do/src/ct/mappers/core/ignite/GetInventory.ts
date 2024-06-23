import { Ignite } from '../../../datatypes';

export class GetInventory {
  public static getInventoryResponseMapper = (
    response: Ignite.GetInventoryResponse,
  ) =>
    response?.body?.data?.inventoryEntries || {
      total: 0,
      count: 0,
      exists: false,
      results: [],
    };
}
