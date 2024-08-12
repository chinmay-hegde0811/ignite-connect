import { Ignite } from '../../../datatypes';

import { Common } from './Common';

export class GetOrder {
  public static getOrderRequiredProps(queryString: Ignite.QueryParams) {
    return Common.pick(queryString, ['paymentId']);
  }

  public static getOrderAppPayload(queryString: Ignite.QueryParams) {
    const paymentId = queryString.paymentId?.toString();
    return {
      paymentId,
    };
  }
}
