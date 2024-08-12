import { Ignite } from '../../../datatypes';
import { Common } from './Common';

export class LoadPaymentMethods {
  public static getPaymentMethodsRequiredProps(
    queryString: Ignite.QueryParams,
  ) {
    return Common.pick(queryString, ['storeId']);
  }

  public static getPaymentMethodsAppPayload(
    request: Ignite.Request,
    queryString: Ignite.QueryParams,
  ) {
    const { authorization: authToken = '' } = request.headers;
    const storeId = queryString.storeId?.toString();
    const cartId = queryString.cartId?.toString();
    const me = queryString.me?.toString();

    return {
      authToken,
      storeId,
      cartId,
      me,
    };
  }
}
