import { CT } from '@ignite/ctintegration-ct';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';

export class LoadPaymentMethods {
  public async execute(payload: App.Types.Ignite.LoadPaymentMethodsPayload) {
    let cart;
    if (payload.me === 'true') {
      if (!payload.authToken) {
        throw {
          message: "Required parameter 'authToken' is missing or empty",
          statusCode: 500,
        };
      }
      const { cart: myCart } = await CT.Core.getMyCart(payload.authToken);
      cart = myCart;
    } else {
      if (!payload.cartId) {
        throw {
          message: "Required parameter 'cartId' is missing or empty",
          statusCode: 500,
        };
      }
      const { cart: customerCart } = await CT.Core.getCart(
        payload.cartId,
        payload.authToken,
      );
      cart = customerCart;
    }

    if (!cart) {
      throw {
        message: 'Failed to fetch the cart or cart is empty!',
        statusCode: 500,
      };
    }

    let savedTokens: App.Types.Ignite.CustomerPaymentToken[] = [];
    if (cart.customerId) {
      savedTokens = await DB.Core.getPaymentTokensByCustomerID(cart.customerId);
    }

    // Fetch custom objects
    const customConfig = await CT.Core.getCustomObjects(payload.storeId);

    return App.Mappers.default.loadPaymentMethodsMappedResponse(
      customConfig,
      savedTokens,
    );
  }
}
