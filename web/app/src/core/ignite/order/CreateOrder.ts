import { CT } from '@ignite/ctintegration-ct';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';

export class CreateOrder {
  public async execute(payload: App.Types.Ignite.ICreateOrderPayload) {
    // Fetch cart from Commercetools
    const { cart } = await CT.Core.getCart(payload.cartId, payload.authToken);
    if (!cart) {
      throw {
        message: 'Failed to fetch the cart or cart is empty!',
        statusCode: 500,
      };
    }
    // Fetch custom objects from admin config
    const customConfig = await CT.Core.getCustomObjects(payload.storeId);

    // Fetch incremented payment id
    const reference = await DB.Core.getIncrementedReference(payload.storeId);

    const token = await CT.Core.getAccessToken();

    const order = await CT.Core.createOrder(
      App.Mappers.default.getCreateOrderCTPayload(cart, token, customConfig),
    );

    // save order information in the database
    const dbResponse = await DB.Core.createPaymentInDB(
      App.Mappers.default.getDatabasePayload({
        customConfig,
        reference,
        cart,
        payload,
        payment: {
          transactionId: payload.transactionId,
        },
        isHostedTokenization: true,
        orderId: order.id,
      }),
    );

    return {
      order,
      dbResponse,
    };
  }
}
