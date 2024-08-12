import { Ignite } from '../../../datatypes';

export class RetryPayments {
  public static getRetryPaymentRequiredProps(request: Ignite.Request) {
    const { id = '', storeId = '' } = (request?.body ||
      {}) as Ignite.RetryPaymentAppPayload;
    return {
      id,
      storeId,
    };
  }

  public static getRetryPaymentAppPayload(
    request: Ignite.Request,
  ): Ignite.RetryPaymentAppPayload {
    const { id = '', storeId = '' } = (request?.body ||
      {}) as Ignite.RetryPaymentAppPayload;
    const { authorization: authToken = '' } = request.headers;
    return {
      id,
      storeId,
      authToken,
    };
  }
}
