import { CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';
import { orderPaymentHandler } from '../common';
import { CommonMethods } from './CommonMethod';

export class CreatePayment extends CommonMethods {
  public async execute(payload: App.Types.Ignite.ICreatePaymentPayload) {
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

    if (!cart) {
      throw {
        message: 'Failed to fetch the cart or cart is empty!',
        statusCode: 500,
      };
    }

    // Fetch custom objects and access token concurrently
    const [customConfig, token] = await Promise.all([
      CT.Core.getCustomObjects(payload.storeId),
      CT.Core.getAccessToken(),
    ]);

    const order = await CT.Core.createOrder(
      App.Mappers.default.getCreateOrderCTPayload(cart, token, customConfig),
    );

    // Fetch incremented payment id
    const reference = await DB.Core.getIncrementedReference(payload.storeId);

    const payment = await PSP.Core.createPayment(
      App.Mappers.default.getConnectionServiceProps(customConfig),
      App.Mappers.default.getServicePayload(payload, cart, customConfig),
    );

    // Save payment information in the database
    const dbPayment = await DB.Core.createPaymentInDB(
      App.Mappers.default.getDatabasePayload({
        customConfig,
        reference,
        cart,
        payload,
        payment,
        isHostedTokenization: true,
        orderId: order.id,
      }),
    );

    const serviceResponse = await super._getPayment(
      customConfig,
      payment.transactionId,
    );

    // Form orderPaymentResponse and mappedResponse concurrently
    const [orderPaymentResponse, mappedResponse] = await Promise.all([
      orderPaymentHandler(serviceResponse),
      App.Mappers.default.getCreatedPaymentMappedResponse(
        customConfig,
        reference,
        payment,
        dbPayment,
      ),
    ]);

    return {
      mappedResponse,
      orderPaymentResponse,
    };
  }
}
