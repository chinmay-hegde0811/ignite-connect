import { CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { App } from '@ignite/ctintegration-do';

export class HostedTokenizationSession {
  public async execute(payload: App.Types.Ignite.HostedTokenizationPayload) {
    let cart;
    if (payload.me) {
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
    if (!cart || !App.Mappers.default.isCartActive(cart)) {
      throw {
        message: 'Failed to fetch the cart or cart is not active',
        statusCode: 500,
      };
    }

    const customConfig = await CT.Core.getCustomObjects(payload.storeId);

    const result = await PSP.Core.hostedTokenization(
      App.Mappers.default.getConnectionServiceProps(customConfig),
      App.Mappers.default.getTokenizationServicePayload(payload, cart),
    );

    return result;
  }
}
