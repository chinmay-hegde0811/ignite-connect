import { Ignite } from '../../../datatypes';

export class ValidateCart {
  public static getValidateCartAppPayload(request: Ignite.Request) {
    const { cartId = '', me = false } = (request?.body ||
      {}) as Ignite.ValidateCartPayload;

    const { authorization: authToken = '' } = request.headers;

    return {
      cartId,
      authToken,
      me,
    };
  }
}
