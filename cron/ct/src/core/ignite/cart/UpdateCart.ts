import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { UPDATE_CART_ADD_PAYMENT_MUTATION } from '../query/constants';

export class UpdateCart {
  public async execute({
    id, // cart id
    version, // cart version
    paymentId,
  }: {
    id: string;
    paymentId: string;
    version: number;
  }) {
    const apiClient = new ApiClient();
    apiClient.setBody({
      query: UPDATE_CART_ADD_PAYMENT_MUTATION,
      variables: {
        id,
        version,
        paymentId,
      },
    });
    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.UpdateCart;

    return CT.Mappers.default.updateCartResponseMapper(result);
  }
}
