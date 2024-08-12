import { Ignite } from '../../../datatypes';

export class GetCart {
  public static getCartResponseMapper(response: Ignite.GetCartResponse) {
    const { cart } = response.body.data || {};
    return {
      cart,
    };
  }
}
