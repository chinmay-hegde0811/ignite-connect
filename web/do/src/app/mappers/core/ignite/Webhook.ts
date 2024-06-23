import { Cart, Order, Payment } from '@commercetools/platform-sdk';
import { Ignite } from '../../../datatypes';

export class Webhook {
  public static getPaymentDBPayload(payload: Ignite.Transaction) {
    const { id } = payload;
    return {
      transactionId: id,
    };
  }

  public static getPaymentFilterQuery(payment: { id: string }) {
    return { id: payment.id };
  }

  public static getCreateOrderCTPayload(
    cart: Cart,
    token: { access_token: string },
    customObjects: Ignite.CustomObjects,
  ) {
    const { id, version } = cart;
    const { access_token: accessToken } = token;
    const { authorizationMode } = customObjects;

    return {
      id,
      version,
      accessToken,
      authorizationMode,
    };
  }

  public static getUpdateCartPayload(cart: Cart, payment: Payment) {
    const { id, version } = cart;
    const { id: paymentId } = payment;
    return {
      id,
      version,
      paymentId,
    };
  }

  public static hasEqualAmounts(
    payload: Ignite.Transaction,
    cart: Cart,
  ): boolean {
    return payload.cartTotalAmount !== cart.taxedPrice?.totalGross?.centAmount;
  }

  public static hasEqualAmountOrder(
    payload: Ignite.PaymentPayload,
    order: Order,
  ): boolean {
    return (
      payload.payment.paymentOutput.amountOfMoney.amount ===
      order.taxedPrice?.totalGross?.centAmount
    );
  }

  public static hasValidAmount(
    order: Order,
    amount: number,
  ): Ignite.RefundResult {
    const totalAmountPlanned = order.taxedPrice?.totalGross?.centAmount ?? 0;
    return {
      isEqual: totalAmountPlanned === amount,
      isGreater: totalAmountPlanned < amount,
    };
  }

  public static isPaymentProcessing(state: string): boolean {
    return state === 'PROCESSING';
  }

  public static getMappedStatus(payload: Ignite.Transaction) {
    const statusMapper: { [key: string]: string } = {
      CREATED: 'INITIAL',
      REDIRECTED: 'REDIRECTED',
      AUTHORIZED: 'AUTHORIZED',
      CAPTURED: 'CAPTURED',
      PARTIAL_CAPTURED: 'PARTIAL_CAPTURED',
      VOID: 'VOID',
      REFUNDED: 'REFUNDED',
      PARTIAL_REFUNDED: 'PARTIAL_REFUNDED',
      PENDING_CAPTURE: 'AUTHORIZED',
      CAPTURE_REQUESTED: 'CAPTURE_REQUESTED',
      REFUND_REQUESTED: 'REFUND_REQUESTED',
      CANCELLED: 'CANCELLED',
      REJECTED: 'FAILED',
      REJECTED_CAPTURE: 'FAILED',
    };

    return statusMapper[payload.status];
  }

  public static shouldSaveToken(
    cart: Cart,
    payment: { storePermanently: boolean },
  ) {
    return cart?.customerId && payment.storePermanently;
  }

  public static getCustomerTokenPayload(
    cart: Cart,
    payment: { id: string },
    payload: Ignite.Transaction,
  ) {
    const { customerId = '' } = cart || {};
    const { id: paymentId } = payment;
    const { token = '' } = payload;

    const transactionWithCardNumber = payload.transactionInfo.find(
      (transaction) => {
        const paymentload = JSON.parse(transaction.payload);
        return paymentload.cardNumber;
      },
    );

    // Extract the cardNumber value from the found transaction
    const cardNumber = transactionWithCardNumber
      ? JSON.parse(transactionWithCardNumber.payload).cardNumber
      : null;

    return {
      customerId,
      paymentId,
      token,
      title: cardNumber,
    };
  }
}
