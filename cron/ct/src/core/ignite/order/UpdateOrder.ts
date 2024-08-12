import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import {
  UPDATE_ORDER_PAYMENT_STATES_MUTATION,
  UPDATE_ORDER_STATE_MUTATION,
} from '../query/constants';

export class UpdateOrder {
  public async execute(
    {
      id, // order id
      version, // order version
    }: {
      id: string;
      version: number;
    },
    orderState: string,
    paymentState?: string,
  ) {
    // Initialize api client
    const apiClient = new ApiClient();

    const variables: Record<string, any> = {
      id,
      version,
      orderState,
    };
    // Set paymentState variable only if it is provided
    if (paymentState) {
      variables.paymentState = paymentState;
    }
    // Choose the appropriate query based on the presence of paymentState
    const query = paymentState
      ? UPDATE_ORDER_PAYMENT_STATES_MUTATION
      : UPDATE_ORDER_STATE_MUTATION;
    apiClient.setBody({
      query,
      variables,
    });

    const result =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.UpdateOrder;

    return CT.Mappers.default.updateOrderPaymentResponseMapper(result);
  }
}
