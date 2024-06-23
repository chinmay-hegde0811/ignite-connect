import { Ignite } from '../../../datatypes';
import { Common } from './Common';

export class GetWebhookStatus {
  public static getWebhookStatusRequiredProps(queryString: Ignite.QueryParams) {
    return Common.pick(queryString, ['paymentId']);
  }

  public static getWebhookStatusAppPayload(
    request: Ignite.Request,
    queryString: Ignite.QueryParams,
  ) {
    const { authorization: authToken = '' } = request.headers;
    const paymentId = queryString.paymentId?.toString();
    const cartId = queryString.cartId?.toString();
    const me = queryString.me?.toString();
    return {
      authToken,
      paymentId,
      cartId,
      me,
    };
  }
}
