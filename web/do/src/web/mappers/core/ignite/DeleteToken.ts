import { Ignite } from '../../../datatypes';

export class DeleteToken {
  public static getDeleteTokenRequiredProps(request: Ignite.Request) {
    const { storeId = '', customerPaymentTokenId = '' } = (request?.body ||
      {}) as Ignite.DeleteTokenAppPayload;
    return {
      storeId,
      customerPaymentTokenId,
    };
  }

  public static getDeleteTokenAppPayload(
    request: Ignite.Request,
  ): Ignite.DeleteTokenAppPayload {
    const { storeId = '', customerPaymentTokenId = '' } = (request.body ||
      {}) as Ignite.DeleteTokenAppPayload;
    const { authorization: authToken = '' } = request.headers;
    return {
      authToken,
      storeId,
      customerPaymentTokenId,
    };
  }
}
