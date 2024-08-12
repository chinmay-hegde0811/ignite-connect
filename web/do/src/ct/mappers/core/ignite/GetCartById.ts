import { Ignite } from '../../../datatypes';

export class GetCartById {
  public static getCartByIdResponseMapper(response: Ignite.CartById) {
    if (response?.body?.errors) {
      throw {
        message: '[CT] Failed to retrieve cart information',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }

    return response?.body?.data?.cart;
  }
}
