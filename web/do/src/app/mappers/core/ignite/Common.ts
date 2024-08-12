import { Cart, Order, Payment } from '@commercetools/platform-sdk';
import Constants from '../../../constants';
import { Ignite } from '../../../datatypes';

export class Common {
  public static appendAdditionalParamsToUrl = (
    url: string,
    additionalParams: { [key: string]: string },
  ) => {
    const formattedUrl = new URL(url);
    Object.keys(additionalParams).forEach((key) => {
      if (additionalParams[key]) {
        formattedUrl.searchParams.append(key, additionalParams[key]);
      }
    });
    return formattedUrl?.href;
  };

  public static camelCase = (str: string) =>
    str
      ?.toLowerCase()
      ?.replace(/[^a-zA-Z0-9]+(.)/g, (_m: string, chr: string) =>
        chr?.toUpperCase(),
      );

  public static isCartActive(cart: Cart) {
    return cart.cartState === Constants.CART.ACTIVE;
  }

  public static getupdateOrderWithPaymentMapper(
    payment: Payment,
    order: Order,
  ) {
    const { id, version, createdAt } = order;
    return {
      order: {
        id,
        version,
        createdAt,
      },
      payment,
    };
  }

  public static getOrderResultMapper(order: { id: string; createdAt: string }) {
    return {
      orderId: order.id,
      orderCreatedAt: order.createdAt,
    };
  }

  public static findAmountByStatus(
    response: Ignite.Transaction,
  ): number | null {
    const { status } = response;
    const transaction = response.transactionInfo.find(
      (info) => info.action === status,
    );
    if (transaction) {
      const payload = JSON.parse(transaction.payload);
      switch (status) {
        case 'CAPTURED':
        case 'PARTIAL_CAPTURED':
          return payload.capturedAmount;
        case 'REFUNDED':
        case 'PARTIAL_REFUNDED':
          return payload.refundedAmount;
        case 'VOID':
          return payload.voidAmount;
        default:
          return null;
      }
    }
    return null;
  }
}
