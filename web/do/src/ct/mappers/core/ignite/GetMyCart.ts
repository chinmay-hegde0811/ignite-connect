import { Ignite } from '../../../datatypes';

export class GetMyCart {
  public static getMyCartResponseMapper(response: Ignite.MyCartResponse) {
    const { customer, activeCart: cart } = response.body.data.me || {};
    return {
      customer,
      cart,
    };
  }
}
