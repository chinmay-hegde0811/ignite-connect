import { Ignite } from '../../../datatypes';

export class CreateOrder {
  public static getCreateOrderRequiredProps(request: Ignite.Request) {
    const {
      storeId = '',
      cartId = '',
      transactionId = '',
    } = (request?.body || {}) as Ignite.CreateOrderPayload;

    return {
      storeId,
      cartId,
      transactionId,
    };
  }

  public static getCreateOrderAppPayload(request: Ignite.Request) {
    const authToken = request.headers.authorization || '';

    const {
      storeId = '',
      cartId = '',
      transactionId = '',
    } = (request.body || {}) as Ignite.CreateOrderPayload;

    return {
      authToken,
      storeId,
      cartId,
      transactionId,
    };
  }
}
