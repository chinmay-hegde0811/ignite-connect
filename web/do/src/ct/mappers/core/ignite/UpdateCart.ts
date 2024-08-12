import { Ignite } from '../../../datatypes';

export class UpdateCarts {
  public static updateCartResponseMapper(response: Ignite.UpdateCart) {
    if (response?.body?.errors?.length) {
      throw {
        message: '[CT] Failed to update cart',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }

    return {
      updatedCart: response?.body?.data?.updateCart,
    };
  }
}
