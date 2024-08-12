import { Ignite } from '../../../datatypes';
import { Common } from './Common';

export class GetPaymentProducts {
  public static getPaymentProductsRequiredProps(
    queryString: Ignite.QueryParams,
  ) {
    return Common.pick(queryString, ['storeId', 'countryCode', 'currencyCode']);
  }

  public static getPaymentProductsPayload(queryString: Ignite.QueryParams) {
    const storeId = queryString.storeId?.toString();
    const countryCode = queryString.countryCode?.toString();
    const currencyCode = queryString.currencyCode?.toString();

    return {
      countryCode,
      storeId,
      currencyCode,
    };
  }
}
