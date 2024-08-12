import { Ignite } from '../../../datatypes';

export class ReplicateCart {
  public static replicateCartResponseMapper(
    response: Ignite.ReplicateCartResponse,
  ) {
    return response?.body?.data?.replicateCart || null;
  }
}
