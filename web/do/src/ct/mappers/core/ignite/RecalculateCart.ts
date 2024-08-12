import { Ignite } from '../../../datatypes';

export class RecalculateCart {
  public static recalculateCartResponseMapper(
    response: Ignite.RecalculateCartResponse,
  ) {
    return response?.body?.data?.updateCart || null;
  }
}
