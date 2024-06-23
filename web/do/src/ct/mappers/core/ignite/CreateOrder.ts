import { Order } from '@commercetools/platform-sdk';
import Constants from '../../../constants';
import { Ignite } from '../../../datatypes';

const { ORDER, CUSTOM_OBJECT } = Constants;

export class CreateOrder {
  public static getVariables(payload: Ignite.CreateOrderPayload) {
    const { id, version, authorizationMode } = payload;
    const paymentState =
      authorizationMode === CUSTOM_OBJECT.AUTHORIZATION_MODE.SALE
        ? ORDER.PAYMENT_STATE.PAID
        : ORDER.PAYMENT_STATE.PENDING;

    return {
      id, // cart id
      version,
      paymentState,
    };
  }

  public static createOrderResponseMapper(
    response: Ignite.CreateOrderResponse,
  ): Order {
    if (response?.body?.errors || !response.body?.data?.createOrderFromCart) {
      throw {
        message: '[CT] Failed to create order',
        statusCode: 500,
        details: response?.body?.errors,
      };
    }
    return response.body?.data?.createOrderFromCart;
  }
}
