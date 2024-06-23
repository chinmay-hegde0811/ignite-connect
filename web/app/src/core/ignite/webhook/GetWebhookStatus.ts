import { DB } from '@ignite/ctintegration-db';
import { CT } from '@ignite/ctintegration-ct';
import { App } from '@ignite/ctintegration-do';

export class GetWebhookStatus {
  public async execute(payload: App.Types.Ignite.GetWebhookStatusPayload) {
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
        message: 'Failed to fetch the cart or cart is missing',
        statusCode: 500,
      };
    }
    // Invoke db to get payment status
    const payment = await DB.Core.getPayment(
      App.Mappers.default.getWebhookStatusDBQuery(payload),
    );

    if (!payment) {
      throw {
        message: `Failed to fetch the payment for id : '${payload.paymentId}'`,
        statusCode: 500,
      };
    }

    return App.Mappers.default.getWebhookStatusResponseMapper(payment);
  }
}
