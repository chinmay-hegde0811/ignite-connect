import { Ignite } from '../../../datatypes';

import { Common } from './Common';

export class ListOrders {
  public static getListOrdersRequiredProps(queryString: Ignite.QueryParams) {
    return Common.pick(queryString, ['storeId']);
  }

  public static getListOrdersAppPayload(queryString: Ignite.QueryParams) {
    const storeId = queryString.storeId?.toString();
    const orderId = queryString.orderId?.toString();
    const page = Number(queryString.page);
    const limit = Number(queryString.limit);
    const filterOption = queryString.filterOption?.toString();

    return {
      orderId,
      storeId,
      page,
      limit,
      filterOption,
    };
  }
}
