import { Ignite } from '../../../datatypes';

import { Common } from './Common';

export class GetPaymentStatus {
  public static getPaymentStatusRequiredProps(queryString: Ignite.QueryParams) {
    return Common.pick(queryString, ['id', 'storeId']);
  }

  public static getPaymentStatusAppPayload(
    request: Ignite.Request,
    queryString: Ignite.QueryParams,
  ) {
    const id = queryString.id?.toString();
    const storeId = queryString.storeId?.toString();
    const { authorization: authToken = '' } = request.headers;

    return {
      id,
      storeId,
      authToken,
    };
  }
}
