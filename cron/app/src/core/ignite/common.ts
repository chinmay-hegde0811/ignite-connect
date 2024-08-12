import { Cart, CT } from '@ignite/ctintegration-ct';
import { DB } from '@ignite/ctintegration-db';
import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';

export async function replicateCartFromOrder(orderId: string) {
  const order = await CT.Core.getOrderById(orderId);
  if (!order || !order.cart || !order.cart.id) {
    throw {
      message: `[replicateCartFromOrder]:Failed to fetch the cartId from order id : '${orderId}'`,
      statusCode: 500,
    };
  }
  const cartId = order.cart.id;
  const response = await CT.Core.replicateCart({ cartId });
  return response;
}

const createOrderWithPayment = async (
  payload: App.Types.Ignite.Transaction,
  cart: Cart,
  customObjects: App.Types.Ignite.CustomObjects,
) => {
  // Create order and payment
  const ctPayment = await CT.Core.createPayment(payload, cart.locale);

  // Mutate cart for add payment
  const { updatedCart } = await CT.Core.updateCart(
    App.Mappers.default.getUpdateCartPayload(cart, ctPayment),
  );

  // Get access token
  const token = await CT.Core.getAccessToken();

  const ctOrder = await CT.Core.createOrder(
    App.Mappers.default.getCreateOrderCTPayload(
      updatedCart,
      token,
      customObjects,
    ),
  );

  return { order: ctOrder };
};

const updateOrderWithPayment = async (
  payload: App.Types.Ignite.Transaction,
  dbPayment: { orderId: string },
) => {
  const order = await CT.Core.getOrderById(dbPayment.orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${dbPayment.orderId}'`,
      statusCode: 500,
    };
  }

  // Mutate cart for update payment
  const { updatedPayment } = await CT.Core.updatePayment(payload, order);

  return App.Mappers.default.getupdateOrderWithPaymentMapper(
    updatedPayment,
    order,
  );
};

export async function orderPaymentHandler(
  payload: App.Types.Ignite.Transaction,
) {
  // log the payload
  Util.Core.logger().debug(
    `[orderPaymentHandler] payload: ${JSON.stringify(payload)}`,
  );

  const { PAYMENT, STATUS } = App.CONSTANTS.Constants;

  return Util.Core.retry(async () => {
    // Fetch DB payment
    const dbPayment = await DB.Core.getPayment(
      App.Mappers.default.getPaymentDBPayload(payload),
    );

    if (!dbPayment) {
      Util.Core.logger().error(
        '[orderPaymentHandler] Failed to fetch the payment',
      );
      return { isRetry: true };
    }

    // Fetch CT cart
    const cart = await CT.Core.getCartById(dbPayment.cartId);
    if (!cart) {
      await DB.Core.setPayment({ id: dbPayment.id }, { status: 'IN_REVIEW' });
      // TODO: store the error message in database.

      Util.Core.logger().error(`Cart '${dbPayment.cartId}' is missing!`);
      return { isRetry: true };
    }

    if (App.Mappers.default.hasEqualAmounts(payload, cart)) {
      // TODO: send a notification to admin and add a column to save the reason
      Util.Core.logger().error(
        '[orderPaymentHandler] Cart amount doesnt match with the paid amount',
      );
      return { isRetry: true };
    }

    if (App.Mappers.default.isPaymentProcessing(dbPayment.state)) {
      Util.Core.logger().error(
        `[orderPaymentHandler] Failed to process the payment as it is already in '${dbPayment.state}' state!`,
      );
      return { isRetry: true };
    }

    const mappedStatus = App.Mappers.default.getMappedStatus(payload);

    await DB.Core.setPayment(
      { id: dbPayment.id },
      { state: PAYMENT.DATABASE.STATE.PROCESSING },
    );

    const customObjects = await CT.Core.getCustomObjects(dbPayment.storeId);

    let result;
    if (payload.status === STATUS.AUTHORIZED || STATUS.CAPTURED) {
      result = !dbPayment?.orderId
        ? await createOrderWithPayment(payload, cart, customObjects)
        : await updateOrderWithPayment(payload, dbPayment);
    }

    // update order id and reset the state as DEFAULT
    const updateQuery = {
      ...(!dbPayment.orderId && result?.order?.id
        ? App.Mappers.default.getOrderResultMapper(result.order)
        : {}),
      pspId: payload.pspAccountId,
      pspStatus: payload.status,
      pspStatusCode: 0,
      currency: cart.taxedPrice?.totalGross?.currencyCode || 'EUR',
      total: payload?.cartTotalAmount,
      state: PAYMENT.DATABASE.STATE.DEFAULT,
      status: mappedStatus,
      errors: '',
    };

    await DB.Core.setPayment(
      App.Mappers.default.getPaymentFilterQuery(dbPayment),
      updateQuery,
    );

    const saveCardOption = payload?.cardDetails?.isPermanent || false;
    //  Should save the token only:
    //  if "isPermanent" field is received as true
    //  and cart has a logged in customer
    if (saveCardOption) {
      await DB.Core.saveCustomerPaymentToken(
        App.Mappers.default.getCustomerTokenPayload(cart, dbPayment, payload),
      );
    }

    return { isRetry: false, data: { ...result, dbPayment } };
  });
}

const updateOrderStatus = async (
  orderId: string,
  orderStatus: string,
  paymentStatus?: string,
) => {
  const order = await CT.Core.getOrderById(orderId);
  if (!order) {
    throw {
      message: `Failed to fetch the order with id '${orderId}'`,
      statusCode: 500,
    };
  }

  const { updatedOrder } = await CT.Core.updateOrder(
    order,
    orderStatus,
    paymentStatus,
  );

  return { order: updatedOrder };
};

const createTransactionInPayment = async (
  paymentId: string,
  payload: App.Types.Ignite.Transaction,
  type: string,
) => {
  const payment = await CT.Core.getPaymentById(paymentId);

  if (!payment) {
    throw {
      message: `Failed to fetch the payment with id '${paymentId}'`,
      statusCode: 500,
    };
  }

  const amount = App.Mappers.default.findAmountByStatus(payload) || 0;
  const currencyCode = payload.transactionInfo
    .map((transaction) => {
      const payloadAmount = JSON.parse(transaction.payload);
      return payloadAmount.currency;
    })
    .filter((currency) => currency)
    .join(',');

  const { updatedPayment } = await CT.Core.createTransaction(
    payment,
    amount,
    currencyCode,
    type,
  );

  return { payment: updatedPayment };
};

export async function orderPaymentCaptureHandler(
  payload: App.Types.Ignite.Transaction,
) {
  // log the payload
  Util.Core.logger().debug(
    `[orderPaymentCaptureHandler]: payload: ${JSON.stringify(payload)}`,
  );
  // Fetch DB payment
  let payment = await DB.Core.getPayment(
    App.Mappers.default.getPaymentDBPayload(payload),
  );
  if (payment && !payment.orderId) {
    await orderPaymentHandler(payload);
    payment = await DB.Core.getPayment(
      App.Mappers.default.getPaymentDBPayload(payload),
    );
  }
  if (!payment) {
    Util.Core.logger().error(
      '[orderPaymentCaptureHandler] Failed to fetch the payment',
    );
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }

  // Fetch CT order
  const order = await CT.Core.getOrderById(payment.orderId);
  if (!order) {
    Util.Core.logger().error(
      `[orderPaymentCaptureHandler] Order with id: '${payment.orderId}' is missing in CT!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }

  const { capturedAmount, cartTotalAmount } = payload;
  const {
    STATUS,
    TRANSACTION,
    ORDER,
    PAYMENT: { DATABASE },
  } = App.CONSTANTS.Constants;

  const mappedStatus = App.Mappers.default.getMappedStatus(payload);
  if (mappedStatus === DATABASE.STATUS.FAILED) {
    Util.Core.logger().error(
      '[orderPaymentCaptureHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
    };
  }
  // if payment exist in order
  if (order.paymentInfo?.payments[0]?.id) {
    await createTransactionInPayment(
      order.paymentInfo.payments[0].id,
      payload,
      TRANSACTION.CHARGE,
    );
  }
  const result = {
    status: 'Partial capture requested',
  };

  if (
    cartTotalAmount === capturedAmount ||
    payload.status === STATUS.CAPTURED
  ) {
    const response = await updateOrderStatus(
      payment.orderId,
      ORDER.CONFIRMED,
      TRANSACTION.PAID,
    );
    // Update payment table
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
    return { ...response, dbPayment: payment };
  }
  return { ...result, dbPayment: payment };
}

export async function refundPaymentHandler(
  payload: App.Types.Ignite.Transaction,
) {
  // log the payload
  Util.Core.logger().debug(
    `[refundPaymentHandler]:payload: ${JSON.stringify(payload)}`,
  );

  // Fetch DB payment
  const payment = await DB.Core.getPayment(
    App.Mappers.default.getPaymentDBPayload(payload),
  );

  if (!payment) {
    Util.Core.logger().error(
      '[refundPaymentHandler] Failed to fetch the payment',
    );
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }
  const {
    STATUS,
    TRANSACTION,
    ORDER,
    PAYMENT: { DATABASE },
  } = App.CONSTANTS.Constants;
  // Fetch CT order
  const order = await CT.Core.getOrderById(payment.orderId);
  if (!order) {
    Util.Core.logger().error(
      `[refundPaymentHandler] Order with id: '${payment.orderId}' is missing!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }

  const mappedStatus = App.Mappers.default.getMappedStatus(payload);

  if (mappedStatus === DATABASE.STATUS.FAILED) {
    Util.Core.logger().error(
      '[refundPaymentHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
    };
  }
  let response;
  if (order.paymentInfo?.payments[0].id) {
    response = createTransactionInPayment(
      order.paymentInfo?.payments[0].id,
      payload,
      TRANSACTION.REFUND,
    );
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
  }

  if (payload.status === STATUS.REFUNDED) {
    // update order status
    const result = await updateOrderStatus(payment.orderId, ORDER.COMPLETE);
    if (result.order.orderState === ORDER.COMPLETE) {
      Util.Core.logger().info(
        `Order status update to : ${result.order.orderState}`,
      );
    }
  }
  return response;
}

export async function orderPaymentCancelHandler(
  payload: App.Types.Ignite.Transaction,
) {
  // log the payload
  Util.Core.logger().debug(
    `[orderPaymentCancelHandler]:payload: ${JSON.stringify(payload)}`,
  );

  // Fetch DB payment
  const payment = await DB.Core.getPayment(
    App.Mappers.default.getPaymentDBPayload(payload),
  );
  if (!payment) {
    Util.Core.logger().error(
      '[orderPaymentCancelHandler] Failed to fetch the payment',
    );
    throw {
      message: 'Failed to fetch payment from the DB',
      statusCode: 500,
    };
  }
  const {
    STATUS,
    TRANSACTION,
    ORDER,
    PAYMENT: { DATABASE },
  } = App.CONSTANTS.Constants;
  // Fetch CT order
  const order = await CT.Core.getOrderById(payment.orderId);
  if (!order) {
    Util.Core.logger().error(
      `[orderPaymentCancelHandler] Order with id: '${payment.orderId}' is missing!`,
    );
    throw {
      message: 'Failed to fetch order from CT',
      statusCode: 500,
    };
  }

  const mappedStatus = App.Mappers.default.getMappedStatus(payload);
  if (mappedStatus === DATABASE.STATUS.FAILED) {
    Util.Core.logger().error(
      '[orderPaymentCancelHandler] Received mappedStatus as :',
      JSON.stringify(mappedStatus),
    );
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
    throw {
      message: 'Received mapped status as : FAILED',
      statusCode: 500,
    };
  }

  if (order.paymentInfo?.payments[0].id) {
    const response = await createTransactionInPayment(
      order.paymentInfo?.payments[0].id,
      payload,
      TRANSACTION.CANCEL_AUTHORIZATION,
    );
    if (response.payment.id) {
      Util.Core.logger().info(
        '[orderPaymentCancelHandler] Successfully created cancelled payment transaction in CT!',
      );
    }
    await DB.Core.setPayment({ id: payment.id }, { status: mappedStatus });
  }

  let result;

  if (payload.status === STATUS.VOID) {
    // update order status
    result = await updateOrderStatus(payment.orderId, ORDER.CANCELLED);
    if (result.order.orderState === ORDER.CANCELLED) {
      Util.Core.logger().info(
        `[orderPaymentCancelHandler] Successfully updated order status to : ${result.order.orderState}`,
      );
    }
  }
  return result;
}
